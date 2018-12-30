const { Artist }= require("../database");

// this is search for artist:
module.exports = (req,res) => {
  let { 
    q, // nickname
    fname, // full name
    gender, // gender
    country, // array country
    dob,dType, // date of birth and type: 0:less | 1: equal | 2: greater
    fCount, fType, // follow count and type: 0:less | 1: equal | 2: greater
  }  = req.query;

  console.log("artist search query",req.query);
  if(q == null) q = "";

  if(fname == null) fname = "";

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

  Artist.find({
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
  }).then(data => res.status(200).json({
    err: null,
    msg: "Success",
    count: data.length,
    data
  }));
}