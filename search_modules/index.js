const express = require("express");
const router = express.Router();

const searchAll = require("./search.all");
const searchMedia = require("./search.media");
const searchArtist = require("./search.artist");

router.get("/all", (req,res)=>{
  searchAll(req,res);
});

router.get("/media", (req,res)=>{
  searchMedia(req,res);
});

router.get("/artist", (req,res)=>{
  searchArtist(req,res);
});


module.exports = router;