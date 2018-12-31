const { Artist }= require("../database");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const toggleFollowArtist = async (data, userId) => {
  if(userId == null) return -1;
  if(data.follower.indexOf(userId) == -1) { // like
    data.follower.push(userId);
    data.followCount ++;    
  } else { // unlike
    data.follower.splice(data.follower.indexOf(userId), 1);
    data.followCount --;
  }
  let newData = await Artist.updateOne({data_id: data.data_id},{
    follower: data.userLike,
    followCount: data.followCount
  })
  return newData;
}

module.exports = (req,res) => {
  let { 
    t2m_id,
    artist_id // check login or not
  }  = req.query;

  console.log("toggle follow artist query",req.query);

    // this is jwt token
  // so we need decrypt to get payload (data)
  if(t2m_id == null) { // not login

  } else { // login -> jwt to decrypt response something like follow, search
    // t2m_id = jwt.verify(t2m_id,process.env.JWT_LOGIN_TOKEN).userId;
  }

  Artist
    .findOne({data_id: artist_id})
    .then(data => toggleFollowArtist(data,t2m_id))
    .then(data => res.status(200).json({ err: null,msg: "Success"}))
    .catch(err => res.status(200).json({ err: 1,msg: "Fail" }))
}