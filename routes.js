const songModules  = require("./song_modules");
const searchModules  = require("./search_modules/");
const adminModules  = require("./admin_modules/server-backend");

module.exports = function(app) {
  app.use('/media',songModules); // handle get song
  app.use('/search',searchModules); // handle search song, user, artist
  app.use('/admin',adminModules); // handle get song
};