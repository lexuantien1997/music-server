const express = require("express");
const router = express.Router();
const getTop100 = require("./get.top100");
const toggleLike = require("./toggle.like");
const addView = require("./add.view");


router.get("/top-100", (req,res)=>{
  getTop100(req,res);
});

router.get("/toggle-like", (req,res)=>{
  toggleLike(req,res);
});

router.get("/add-view", (req,res)=>{
  addView(req,res);
});


module.exports = router;