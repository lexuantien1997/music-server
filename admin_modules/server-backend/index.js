const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Country, SongType, Artist, Song } = require("../../database");
const isEmpty = require("../../admin_modules/server-backend/is-empty.validate");
router.post("/utils/add-country",(request,response) => {
  let { dataCountry } = request.body;
  // console.log(request.body);
  dataCountry.forEach(element => {
    let { name, code } = element;
    if(name && code) {
      let newCountry = new Country({ name, code });
      newCountry.save( err => {
        if(err) {
          console.log("ADD COUNTRY FAIL",{err:`save ${element} fail - ${err}`, msg: "Fail"});
          response.status(200).json({err:`save ${element} fail - ${err}`, msg: "Fail"});
        } else {
          
        }
      });
    } else {
      if(!name) {
        console.log("ADD COUNTRY FAIL",{err:`data not exist - ${element}`, msg: "Fail"});
        response.status(200).json({err:`data not exist - ${element}`, msg: "Fail"});
      }
      else if(!code) {
        console.log("ADD COUNTRY FAIL",{err:`code not exist - ${element}`, msg: "Fail"});
        response.status(200).json({err:`code not exist - ${element}`, msg: "Fail"});
      } 
    }
  });

  // client
  console.log("ADD COUNTRY SUCCESS",{err: null,msg: "Success"});
  response.status(200).json({err: null,msg: "Success"});
});

router.post("/utils/add-song-type",(request,response) => {
  let { dataSongType } = request.body;
  // console.log(request.body);
  dataSongType.forEach(element => {
    let { name, code } = element;
    if(name && code) {
      let newSongType = new SongType({ name, code });
      newSongType.save( err => {
        if(err) {
          console.log("ADD SONG TYPE FAIL",{err:`save ${element} fail - ${err}`, msg: "Fail"});
          response.status(200).json({err:`save ${element} fail - ${err}`, msg: "Fail"});
        } else {
          
        }
      });
    } else {
      if(!name) {
        console.log("ADD SONG TYPE FAIL",{err:`data not exist - ${element}`, msg: "Fail"});
        response.status(200).json({err:`data not exist - ${element}`, msg: "Fail"});
      }
      else if(!code) {
        console.log("ADD SONG TYPE FAIL",{err:`code not exist - ${element}`, msg: "Fail"});
        response.status(200).json({err:`code not exist - ${element}`, msg: "Fail"});
      } 
    }
  });

  // client
  console.log("ADD SONG TYPE SUCCESS",{err: null,msg: "Success"});
  response.status(200).json({err: null,msg: "Success"});
});

router.get("/utils/get-country",(request,response)=>{
  Country.find({},(err,countries)=>{
    if(!err) {
      let dataCountry = [];
      countries.forEach(element => {
        dataCountry.push({label: element.name, value: element._id});
      });
      console.log("GET COUNTRY SUCCESS",{ err:  null, msg: 'Success' });
      response.status(200).json({ err: null, msg: 'Success', data: dataCountry });
    } else {
      console.log("GET COUNTRY FAIL",{ err:  `get country fail ${err}`, msg: 'Fail'});
      response.status(200).json({ err: `get country fail ${err}`, msg: 'Success' });
    }
  });
});

router.get("/utils/get-song-type",(request,response)=>{
  SongType.find({},(err,songTypes)=>{
    if(!err) {
      let dataSongType = [];
      songTypes.forEach(element => {
        dataSongType.push({label: element.name, value: element._id});
      });
      console.log("GET SONG TYPE SUCCESS",{ err:  null, msg: 'Success' });
      response.status(200).json({ err: null, msg: 'Success', data: dataSongType });
    } else {
      console.log("GET SONG TYPE FAIL",{ err:  `get song type fail ${err}`, msg: 'Fail'});
      response.status(200).json({ err: `get song type fail ${err}`, msg: 'Fail' });
    }
  });
});

router.get("/artist/get",(request,response)=>{
  Artist.find({},(err,artists)=>{
    if(!err) {
      let dataArtists = [];
      artists.forEach(element => {
        dataArtists.push({label: element.nickName, value: element._id, avatar: element.avatar,fullName: element.fullName });
      });
      console.log("GET ARTISTS SUCCESS",{ err:  null, msg: 'Success' });
      response.status(200).json({ err: null, msg: 'Success', data: dataArtists});
    } else {
      console.log("GET ARTISTS FAIL",{ err:  `get artist fail ${err}`, msg: 'Fail'});
      response.status(200).json({ err: `get artist fail ${err}`, msg: 'Fail' });
    }
  });
})


router.post("/song/add",(request,response) => {
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

  let newSong;
  if(isEmpty(thumbnail)) 
    newSong = new Song({
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
    if(err) {
      console.log("ADD SONG FAIL",{err:`save ${newArtist} fail - ${err}`, msg: "Fail"});
      response.status(200).json({err:`save ${newArtist} fail - ${err}`, msg: "Fail",  data: {noti: ["Add song fail"]}});
    } 
  });

  console.log("ADD SONG SUCCESS",{err:null, msg: "Success"});
  response.status(200).json({err:null, msg: "Success", data: {noti: ["Add song successfully"]}});

});



router.post("/artist/add",(request,response) => {
  let {
    fullName,
    nickName,
    avatar,
    thumbnail,
    gender,
    dob,
    country,
    history 
  } = request.body;

  gender = parseInt(gender);
  dob = (new Date(dob)).getTime();

  let countryId = [];

  country.forEach(element => {
    countryId.push(element.value);
  });  

  let newArtist;

  console.log(countryId);

  
  if(isEmpty(thumbnail) && !isEmpty(avatar) ) 
    newArtist = new Artist({fullName,nickName,gender, dob,avatar, country: countryId, history, songs:[] });
  else if(isEmpty(avatar) && !isEmpty(thumbnail)) 
    newArtist = new Artist({fullName,nickName,gender, dob,thumbnail, country: countryId, history, songs:[] });
  else if(!isEmpty(avatar) && !isEmpty(thumbnail)) 
    newArtist = new Artist({fullName,nickName,gender,thumbnail,avatar, dob, country: countryId, history, songs:[] });
  else 
    newArtist = new Artist({fullName,nickName,gender, dob, country: countryId, history, songs:[] });

  newArtist.save( err => {
    if(err) {
      console.log("ADD ARTIST FAIL",{err:`save ${newArtist} fail - ${err}`, msg: "Fail"});
      response.status(200).json({err:`save ${newArtist} fail - ${err}`, msg: "Fail",  data: {noti: ["Add artist fail"]}});
    } 
  });

  console.log("ADD ARTIST SUCCESS",{err:null, msg: "Success"});
  response.status(200).json({err:null, msg: "Success",  data: { noti: ["Add artist successfully"]}});

});



// get a song info
// router.use('/get-source',userClientRoute);

module.exports = router;