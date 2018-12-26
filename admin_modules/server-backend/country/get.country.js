const { Country, SongType, Artist, Song } = require("../../../database");
const isEmpty = require("../is-empty.validate");

module.exports = (request, response) => {
  Country.find({},(err,countries)=>{
    if(!err) {
      let dataCountry = [];
      countries.forEach(element => {
        dataCountry.push({label: element.name, value: element.data_id});
      });
      console.log("GET COUNTRY SUCCESS",{ err:  null, msg: 'Success' });
      response.status(200).json({ err: null, msg: 'Success', data: dataCountry });
    } else {
      console.log("GET COUNTRY FAIL",{ err:  `get country fail ${err}`, msg: 'Fail'});
      response.status(200).json({ err: `get country fail ${err}`, msg: 'Success' });
    }
  });
}