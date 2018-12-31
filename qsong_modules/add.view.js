const { Song }= require("../database");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const addViewSong = async (data) => {
  let newData = await Song.updateOne({data_id: data.data_id},{
    viewCount: data.viewCount + 1
  })
  return newData;
}

module.exports = (req,res) => {
  let { 
    song_id // check login or not
  }  = req.query;

  console.log("add view song query",req.query);

  Song
    .findOne({data_id: song_id})
    .then(data => addViewSong(data))
    .then(data => res.status(200).json({ err: null,msg: "Success"}))
    .catch(err => res.status(200).json({ err: 1,msg: "Fail" }))
}