const express = require("express");
const router = express.Router();

// 
const addArtist = require("./artist/add.artist");
const { addCountry } = require("./country/add.country");
const addSong = require("./song/add.song");
const addSongZing = require("./song/add.song.zing");
const { addSongType } = require("./songType/add.songType");
const getArtist = require("./artist/get.artist");
const addArtistZing = require("./artist/add.artist.zing");
const getCountry = require("./country/get.country");
const getSongType = require("./songType/get.songType");

// 
const { ObjId } = require("../../database");

// just run 1 time:
router.get("/utils/add-obj-id",(request,response) => {
  const newObj =  new ObjId({
    artistId: 'ATID0000',
    songId: 'SGID0000',
    countryId: 'CTID0000',
    songTypeId: 'STID0000',
    userId: 'USID0000'
  });
  newObj.save((err,data) => {
    response.status(200).json({err:null, msg: 'Success'}); 
  });
});

router.post("/utils/add-country",(request,response) => {
  addCountry(request,response);
});

router.post("/utils/add-song-type",(request,response) => {
  addSongType(request,response);
});

router.get("/utils/get-country",(request,response)=>{
  getCountry(request, response);
});

router.get("/utils/get-song-type",(request,response)=>{
  getSongType(request,response);
});

router.get("/artist/get",(request,response)=>{
  getArtist(request,response);
})


router.post("/song/add",(request,response) => {
  addSong(request,response);
});

router.post("/song/add-zing",(request,response) => {
  addSongZing(request,response);
});

router.post("/artist/add",(request,response) => {
  addArtist(request,response);
});

router.post("/artist/add-zing",(request,response) => {
  addArtistZing(request,response);
});


// get a song info
// router.use('/get-source',userClientRoute);

module.exports = router;