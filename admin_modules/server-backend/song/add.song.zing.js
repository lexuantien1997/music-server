const { Country, SongType, Artist, Song, ObjId } = require("../../../database");
const isEmpty = require("../is-empty.validate");
const generateObjId = require("../generate-Id");
const axios = require("axios");


const artistExist = async (name, link) => {
  if(name== "Nhiều Nghệ Sĩ") return -1;
  let data = await Artist.findOne({nickName: name.trim()});
  return data ? data.data_id :1;
};

const addSpecifySong = (request,response) => {
  
}

module.exports = async (request,response) => {
  let {
    artistUrl, // beta url
    count
  } = request.body;

  let res = await axios.get(artistUrl);
  let { items } = res.data.data.song;

  let dataid = await ObjId.find({});
  let songId = dataid[0].songId;

  // get about 5 song: 
  for(let i = 0 ; i < count ; i++ ) { 
    let { artists, title, thumbnail_medium, lyric, listen, created_at, link } = items[i];
    let artistId = [], _128;

    // get all id artist
    // if artist is not exist => add new artist
    for(let item of artists) {
      let aid = await artistExist(item.name.trim(), item.link);
      artistId.push(aid);
    }

    // get url song to get : source { _128, 320 }
    let url = `https://mp3.zing.vn${link}`;
    songId  = generateObjId(songId);
    
    let keySource = await axios.get(url);
    let html = keySource.data;
    let regex = /key=.{33}/g; // pattern kto get data zing mp3 
    let key = (html.toString().match(regex))[0]; // the key
    key = key.replace("key=","");

    let _128Source = await axios.get(`https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${key}`);
    _128  = _128Source.data.data.source['128'];

    let newSong = new Song({
      data_id:songId,
      name: title,
      thumbnail: thumbnail_medium,
      audio: {_128,_320:_128,lossless:_128,lyric},
      creationDate: created_at,
      artists: artistId,
      viewCount: listen,
      download :[],
      userLike: [],
      typeSong: []
    });

    let dNewSong = await newSong.save(); 
    if(dNewSong == null) {
      console.log("ADD SONG FAIL",{err:`save ${dNewSong} fail`, msg: "Fail"});
      return response.status(200).json({err:`save ${dNewSong}`, msg: "Fail",  data: {noti: ["Add song fail"]}});
    } else {
      // add song for each artists:
      let tempArtists = dNewSong.artists;
      for( let tempArtist of tempArtists ) {
        if(tempArtist != '-1' && tempArtist != '1' ) {
          let currArtist = await Artist.findOne({data_id: tempArtist});
          if(currArtist.songs.includes(dNewSong.data_id) == false) {
            currArtist.songs.push(dNewSong.data_id);
            let newArtist = await currArtist.save();
            if(!newArtist) {
              console.log("ADD SONG FAIL",{err:1, msg: "Fail"});
              return response.status(200).json({err:1, msg: "Fail",  data: {noti: ["Add song fail"]}});
            } else console.log("ADD SONG ARTIST SUCCESS",{err:null, msg: "Success"});
          }
        }
      }
      console.log("ADD SONG SUCCESS",{name: title, msg:'Success'});
    } 
  
  }
  dataid[0].set({ songId });
  dataid[0].save((err, updateddata) => console.log(updateddata));

  console.log("ADD SONG FROM ZING SUCCESS",{err:null, msg: "Success"});
  response.status(200).json({err:null, msg: "Success", data: {noti: ["Add song successfully"]}});

}