const songModules  = require("./song_modules");
const adminModules  = require("./admin_modules/server-backend");

module.exports = function(app) {
  app.use('/media',songModules); // handle get song
  app.use('/admin',adminModules); // handle get song
};