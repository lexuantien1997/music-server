const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Country, SongType, Artist } = require("../../database");
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
      response.status(200).json({err:`save ${newArtist} fail - ${err}`, msg: "Fail"});
    } 
  });

  console.log("ADD ARTIST SUCCESS",{err:null, msg: "Success"});
  response.status(200).json({err:null, msg: "Success"});

});

// get a song info
// router.use('/get-source',userClientRoute);

module.exports = router;