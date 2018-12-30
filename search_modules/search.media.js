const { Song }= require("../database");
const  decryptAlias = require('./decrypt.alias');

// this is search for song:
// http://localhost:5000/search/q=c&media?cAt=12-12-2018&cType=0&vCount=38960381&vType=1
module.exports = (req,res) => {
  let { 
    q, // name
    cAt,cType, // date create and type: 0:less | 1: equal | 2: greater
    vCount, vType, // view count and type: 0:less | 1: equal | 2: greater
    lCount, lType, // like count and type: 0:less | 1: equal | 2: greater
    dCount, dType, // download count and type: 0:less | 1: equal | 2: greater
    duration, // short[0]: < 2 | medium[1]: 2-10 | long[2]: 10-30 | epic[3]: >30 | null: everything ==> later
    tag // array of type song
  }  = req.query;

  console.log("media search query",req.query);
  if(q == null) q = "";

  let cAtCond = { $nin: [] }; // match every thing mot inside this
  if(cAt != null && cType != null) {
    cAt = (new Date(cAt)).getTime();
    // console.log(cAt);
    switch (cType) {
      case '0': // less
        cAtCond = { $lt: cAt }; 
        break;
      case '1':
        cAtCond = { $eq: cAt }; break;
      case '2':
        cAtCond = { $gt: cAt }; break;
      default: break;
    }
  }
  let vCountCond = { $gte: 0 };
  if(vCount != null && vType != null) {
    switch (vType) {
      case '0': // less
        vCountCond = { $lt: vCount }; break;
      case '1': // equal
        vCountCond = {  $eq: vCount }; break;
      case '2': // greater
        vCountCond = { $gt: vCount };  break;
      default: break;
    }
  }

  let lCountCond = { $gte: 0 };
  if(lCount != null && lType != null) {
    switch (lType) {
      case '0': // less
        lCountCond = { $lt: lCount }; break;
      case '1': // equal
        lCountCond = {  $eq: lCount }; break;
      case '2': // greater
        lCountCond = { $gt: lCount };  break;
      default: break;
    }
  }

  let dCountCond = { $gte: 0 };
  if(dCount != null && dType != null) {
    switch (dType) {
      case '0': // less
        dCountCond = { $lt: dCount }; break;
      case '1': // equal
        dCountCond = {  $eq: dCount }; break;
      case '2': // greater
        dCountCond = { $gt: dCount };  break;
      default: break;
    }
  }
  
  let durationCond = { $gte: 0 };
  if(duration != null) {
    switch (duration) {
      case '0': 
        durationCond = { $lt: 120 }; break;
      case '1': 
        durationCond = {  $gte: 120, $lt: 600 }; break;
      case '2':
        durationCond = { $gte: 600, $lt: 1800 };  break;
      case '3':
        durationCond = { $gte: 1800 };  break;
      default: break;
    }
  }

  let tagCond = { $nin: [] }  ;
  if(tag != null) {
    tagCond = { $in: tag}
  }

  Song.find({
    name: {
      $regex: `(?i)\w*${q}`, // regex uppercase and lowercase maybe
      $options: 'g'
    },
    creationDate: cAtCond,
    viewCount: vCountCond,
    likeCount: lCountCond,
    downloadCount: dCountCond,
    duration: durationCond,
    typeSong: tagCond
  }).then(data => res.status(200).json({
    err: null,
    msg: "Success",
    count: data.length,
    data
  }));
}