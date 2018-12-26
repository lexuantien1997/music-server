const { Country, SongType, Artist, Song, ObjId } = require("../../../database");
const isEmpty = require("../is-empty.validate");
const generateObjId = require("../generate-Id");
module.exports = (request, response) => {
  let {
    name,
    thumbnail,
    audio,
    video,
    creationDate,
    typeSong,
    artist
  } =  request.body;

  creationDate = (new Date(creationDate)).getTime();

  let typeSongId = [], artistId = [];

  typeSong.forEach(element => typeSongId.push(element.value));  
  artist.forEach(element => artistId.push(element.value));  

  ObjId.find({},(err,data) => {
    console.log(data);
    let data_id = data[0].songId;
    data_id  = generateObjId(data_id);
  
    let newSong;
    if(isEmpty(thumbnail)) 
      newSong = new Song({
        data_id,
        name,
        video: {
          _360: video[1] ,
          _480: video[2] ,    
          _720: video[3] ,
          _1080: video[4] ,
          lyric: video[0]
        },
        audio: {
          _128: audio[1],
          _320: audio[2],    
          lossless: audio[3],
          lyric: audio[0]  
        },
        creationDate,
        artists: artistId,
        typeSong: typeSongId,
        userLike: []
      });
    else 
      newSong = new Song({
        data_id,
        name,
        thumbnail,
        video: {
          _360: video[1] ,
          _480: video[2] ,    
          _720: video[3] ,
          _1080: video[4] ,
          lyric: video[0]
        },
        audio: {
          _128: audio[1],
          _320: audio[2],    
          lossless: audio[3],
          lyric: audio[0]  
        },
        creationDate,
        artists: artistId,
        typeSong: typeSongId,
        userLike: []
      });

    newSong.save( err => {
      if(err != null) {
        console.log("ADD SONG FAIL",{err:`save ${newSong} fail - ${err}`, msg: "Fail"});
        response.status(200).json({err:`save ${newSong} fail - ${err}`, msg: "Fail",  data: {noti: ["Add song fail"]}});
      } else {
  
        data[0].set({ songId:data_id });
        data[0].save((err, updateddata) => console.log(updateddata));
  
        console.log("ADD SONG SUCCESS",{err:null, msg: "Success"});
        response.status(200).json({err:null, msg: "Success", data: {noti: ["Add song successfully"]}});
      }
    });
  
  });

};