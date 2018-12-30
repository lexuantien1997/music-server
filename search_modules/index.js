const express = require("express");
const router = express.Router();

const searchAll = require("./search.all");
const searchMedia = require("./search.media");

router.get("/all", (req,res)=>{
  searchAll(req,res);
});

router.get("/media", (req,res)=>{
  searchMedia(req,res);
});


module.exports = router;