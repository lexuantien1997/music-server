const { Country, SongType, Artist, Song, ObjId } = require("../../../database");
const isEmpty = require("../is-empty.validate");
const generateObjId = require("../generate-Id");


module.exports = async (request, response) => {
  let {
    name,
    thumbnail,
    audio,
    creationDate,
    typeSong,
    artist
  } =  request.body;

  creationDate = (new Date(creationDate)).getTime();

  let typeSongId = [], artistId = [];

  typeSong.forEach(element => typeSongId.push(element.value));  
  artist.forEach(element => artistId.push(element.value));  

  let data_id = await ObjId.find({});
  let songId = data[0].songId;
  songId  = generateObjId(songId);

  if(isEmpty(thumbnail)) 
    newSong = new Song({
      data_id: songId,
      name,
      audio: { _128: audio[1], _320: audio[2],lossless: audio[3], lyric: audio[0]  },
      creationDate,
      artists: artistId,
      typeSong: typeSongId,
      download :[], userLike: [], typeSong: []
    });
  else 
    newSong = new Song({
      data_id: songId,
      name,
      thumbnail,
      audio: { _128: audio[1], _320: audio[2],  lossless: audio[3], lyric: audio[0] },
      creationDate,
      artists: artistId,
      typeSong: typeSongId,
      download :[], userLike: [], typeSong: []
    });
  
  let newSong =  await newSong.save();
  if(newSong == null) {
    console.log("ADD SONG FAIL",{err:1, msg: "Fail"});
    response.status(200).json({err:1, msg: "Fail",  data: {noti: ["Add song fail"]}});
  } else {
    data_id[0].set({ songId });
    data_id[0].save((err, updateddata) => console.log(updateddata));


    let tempArtists = newSong.artists;
    for( let tempArtist of tempArtists ) {
      if(tempArtist != '-1' && tempArtist != '1' ) {
        let currArtist = await Artist.findOne({data_id: tempArtist});
        if(currArtist.songs.includes(newSong.data_id) == false) {
          currArtist.songs.push(newSong.data_id);
          let newArtist = await currArtist.save();
          if(!newArtist) {
            console.log("ADD SONG FAIL",{err:1, msg: "Fail"});
            return response.status(200).json({err:1, msg: "Fail",  data: {noti: ["Add song fail"]}});
          } else console.log("ADD SONG ARTIST SUCCESS",{err:null, msg: "Success"});
        }
      }
    }

    console.log("ADD SONG SUCCESS",{err:null, msg: "Success"});
    response.status(200).json({err:null, msg: "Success", data: {noti: ["Add song successfully"]}});
  }
}