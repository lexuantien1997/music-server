import axios from "axios";

const addArtist = (data) => {
  axios.post('http://localhost:5000/admin/artist/add',data).then(response => {
    let { msg, err, data } = response.data; 
   if(!err && msg == 'Success') alert(data.noti[0]);
   else alert(data.noti[0]);
  }).catch(err => alert(err));  
};

export default addArtist;