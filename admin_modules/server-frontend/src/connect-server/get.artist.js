import axios from "axios";

const getArtist = () => new Promise((resolve,reject) => {
 // alert(1);
  axios.get('http://localhost:5000/admin/artist/get').then(response => {
    let { msg, err, data } = response.data; 
    if(!err && msg == "Success" && data) resolve(data);
    resolve(null);
  }).catch(err => reject(err));  
});

export default getArtist;