import axios from "axios";

const addArtist = (data) => new Promise((resolve,reject) => {
  axios.post('http://localhost:5000/admin/artist/add',data).then(response => {
    let { msg, err } = response.data; 
    if(!err && msg == 'Success') resolve(true);
    resolve(false);
  }).catch(err => reject(false));  
});

export default addArtist;