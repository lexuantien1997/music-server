const express = require("express");
const router = express.Router();
const toggleFollow = require("./toggle.follow");

router.get("/toggle-follow", (req,res)=>{
  toggleFollow(req,res);
});

module.exports = router;