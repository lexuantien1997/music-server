const  decryptAlias = require('./decrypt.alias');

module.exports = (req,res) => {

  let { q }  = req.query;

  q = decryptAlias(q);
  

  console.log(req.query);
  res.json(req.query);
}