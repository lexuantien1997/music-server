const { Country, SongType, Artist, Song } = require("../../../database");
const isEmpty = require("../is-empty.validate");
module.exports = (request, response) => {
  Artist.find({},(err,artists)=>{
    if(!err) {
      let dataArtists = [];
      artists.forEach(element => {
        dataArtists.push({label: element.nickName, value: element.data_id, avatar: element.avatar,fullName: element.fullName });
      });
      console.log("GET ARTISTS SUCCESS",{ err:  null, msg: 'Success' });
      response.status(200).json({ err: null, msg: 'Success', data: dataArtists});
    } else {
      console.log("GET ARTISTS FAIL",{ err:  `get artist fail ${err}`, msg: 'Fail'});
      response.status(200).json({ err: `get artist fail ${err}`, msg: 'Fail' });
    }
  });
}