const express = require("express");
const router = express.Router();

const searchAll = require("./search.all");
const searchMedia = require("./search.media");
const searchArtist = require("./search.artist");
const searchUser = require("./search.user");

router.get("/all", (req,res)=>{
  searchAll(req,res);
});

router.get("/media", (req,res)=>{
  searchMedia(req,res);
});

router.get("/artist", (req,res)=>{
  searchArtist(req,res);
});

router.get("/user", (request, response) => {
  searchUser(request, response);
})


module.exports = router;