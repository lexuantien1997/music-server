const { Artist }= require("../database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkUserFollow = async (data, userId) => {
  if(userId == null) return data;
  // let newData = [];
  for(let r of data) {
    let checkFollow = await Artist.findOne({data_id: r.data_id,"follower.user_id": { $in: [userId] }});
    if(checkFollow != null) {      
      r.isFollow = true;
      // console.log(r);
      // newData.push(r);
      // let follower = r.follower;
      // let count = 0;
      // for (let i = 0;  i< follower.length && follower[i].user_id != userId; i++) count ++;
      // if(count == follower.length) r.follower.push({ user_id: userId });
    }    
  }
  return data;
}

// this is search for artist:
module.exports = (req,res) => {
  let { 
    q, // nickname
    fname, // full name
    gender, // gender
    country, // array country
    dob,dType, // date of birth and type: 0:less | 1: equal | 2: greater
    fCount, fType, // follow count and type: 0:less | 1: equal | 2: greater
    t2m_id,
    page
  }  = req.query;

  // this is jwt token
  // so we need decrypt to get payload (data)
  if(t2m_id == null) { // not login

  } else { // login -> jwt to decrypt response something like follow, search
    // t2m_id = jwt.verify(t2m_id,process.env.JWT_LOGIN_TOKEN).userId;
  }

  console.log("artist search query",req.query);
  if(q == null) q = "";

  if(fname == null) fname = "";

  if(page == null) page = 0;
  else page *= 7;

  if(gender == null || gender != 1 || gender != 0) gender = { $nin: [] }

  let dobCond = { $nin: [] }; // match every thing mot inside this
  if(dob != null && dType != null) {
    dob = (new Date(dob)).getTime();
    // console.log(cAt);
    switch (dType) {
      case '0': // less
        dobCond = { $lt: dob }; break;
      case '1':
        dobCond = { $eq: dob }; break;
      case '2':
        dobCond = { $gt: dob }; break;
      default: break;
    }
  }

  let fCountCond = { $gte: 0 };
  if(fCount != null && fType != null) {
    switch (fType) {
      case '0': // less
        fCountCond = { $lt: fCount }; break;
      case '1': // equal
        fCountCond = {  $eq: fCount }; break;
      case '2': // greater
        fCountCond = { $gt: fCount };  break;
      default: break;
    }
  }
 

  let countryCond = { $nin: [] }  ;
  if(country != null) countryCond = { $in: country}

  let regexSearch = {
    nickName: {
      $regex: `(?i)\w*${q}`, // regex uppercase and lowercase maybe
      $options: 'g'
    },
    fullName: {
      $regex: `(?i)\w*${fname}`, // regex uppercase and lowercase maybe
      $options: 'g'
    },
    dob: dobCond,
    gender,
    country: countryCond,
    followCount: fCountCond
  }

  let projection = {
    follower: { // just get 4 user follow
      $slice: 4
    },
    songs: {
      $slice: 3 // get example 3 song (id and name)
    }    
  }

  Artist.find(regexSearch, projection)
  .select("-gender -fullName -dob -avatar -__v -_id -story") // exclude song, _id, follower => get all field
  .sort({data_id:-1}) // sort from newest 2 oldest
  .skip(page) // skip some data -> pagination
  .limit(7) // only get 7 data
  .lean()
  .then(data => checkUserFollow(data,t2m_id)) // add user follow -> last items of follow is user
  .then(data => res.status(200).json({ err: null,msg: "Success", count: data.length,data})); // response data
}