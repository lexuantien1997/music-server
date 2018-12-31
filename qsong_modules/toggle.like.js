const { Song }= require("../database");
const jwt = require("jsonwebtoken");
require("dotenv").config();



const toggleLikeSong = async (data, userId) => {
  if(userId == null) return -1;
  if(data.userLike.indexOf(userId) == -1) { // like
    data.userLike.push(userId);
    data.likeCount ++;    
  } else { // unlike
    data.userLike.splice(data.userLike.indexOf(userId), 1);
    data.likeCount --;
  }
  let newData = await Song.updateOne({data_id: data.data_id},{
    userLike: data.userLike,
    likeCount: data.likeCount
  })
  return newData;
}

module.exports = (req,res) => {
  let { 
    t2m_id,
    song_id // check login or not
  }  = req.query;

  console.log("toggle like song query",req.query);

    // this is jwt token
  // so we need decrypt to get payload (data)
  if(t2m_id == null) { // not login

  } else { // login -> jwt to decrypt response something like follow, search
    // t2m_id = jwt.verify(t2m_id,process.env.JWT_LOGIN_TOKEN).userId;
  }

  Song
    .findOne({data_id: song_id})
    .then(data => toggleLikeSong(data,t2m_id))
    .then(data => res.status(200).json({ err: null,msg: "Success"}))
    .catch(err => res.status(200).json({ err: 1,msg: "Fail" }))
}