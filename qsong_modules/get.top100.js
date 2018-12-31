const { Song }= require("../database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkUserLike = async (data, userId) => {
  if(userId == null) return data;
  for(let r of data) {
    let checkLike = await Song.findOne({data_id: r.data_id,userLike: { $in: [userId] }});
    if(checkLike != null) r.isUserLike = true;
  }
  return data;
}

module.exports = (req,res) => {
  let { 
    t2m_id, // check login or not
    page // for pargination
  }  = req.query;

  console.log("get top 100 query",req.query);

    // this is jwt token
  // so we need decrypt to get payload (data)
  if(t2m_id == null) { // not login

  } else { // login -> jwt to decrypt response something like follow, search
    // t2m_id = jwt.verify(t2m_id,process.env.JWT_LOGIN_TOKEN).userId;
  }

  if(page == null || page >10) page = 0;
  else page *= 10;

  let projection = {
    userLike: {
      $slice: 4
    }
  }

  Song
    .find({},projection)
    .sort({viewCount: -1})
    .select("-idUserUpload -audio._320 -audio.lossless -__v -download -duration")
    .skip(page)
    .limit(10)
    .lean()
    .then(data => checkUserLike(data,t2m_id))
    .then(data => res.status(200).json({ err: null,msg: "Success",count: data.length, data }));
}