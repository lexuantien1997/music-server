const { Country, SongType, Artist, Song } = require("../../../database");
const isEmpty = require("../is-empty.validate");

module.exports = (request, response) => {
  SongType.find({},(err,songTypes)=>{
    if(!err) {
      let dataSongType = [];
      songTypes.forEach(element => {
        dataSongType.push({label: element.name, value: element.data_id});
      });
      console.log("GET SONG TYPE SUCCESS",{ err:  null, msg: 'Success' });
      response.status(200).json({ err: null, msg: 'Success', data: dataSongType });
    } else {
      console.log("GET SONG TYPE FAIL",{ err:  `get song type fail ${err}`, msg: 'Fail'});
      response.status(200).json({ err: `get song type fail ${err}`, msg: 'Fail' });
    }
  });
}