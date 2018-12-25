const songModules  = require("./song_modules");

module.exports = function(app) {
  app.use('/media',songModules); // handle get song
};