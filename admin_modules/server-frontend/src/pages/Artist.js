import React, {Component} from "react";
import AsyncSelect from 'react-select/lib/Async';
import getCountry from "../connect-server/get.country";
import "./index.css";
import addArtist from "../connect-server/add.artist";
import isEmpty from "../untils/is-empty.validate";
const getCountryData = (inputValue, callback) => {
  getCountry().then(_countries => callback(_countries));
}

class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      nickName:null,
      avatar:"",
      thumbnail:"",
      gender: '0',
      dob: '1990-01-01',
      country:[],
      history:null            
    };
    this.addArtist = this.addArtist.bind(this);
    this.handleInputchange = this.handleInputchange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(selectedOption) {
    console.log(selectedOption);
    this.setState({
      country: selectedOption
    });    
  }

  handleInputchange(event) {
    //console.log(event.target.value);
    const target = event.target;
    const name = target.name;
    // if(name == 'gender')
    this.setState({
      [name]: event.target.value
    });
  }

  addArtist(event) {
    event.preventDefault();

    let {  
      fullName,
      nickName,
      avatar,
      thumbnail,
      gender,
      dob,
      country,
      history          
    } = this.state;

    if(isEmpty(fullName)) {
      alert("full name is require");
      return;
    }
    if(isEmpty(nickName)) {
      alert("nick name is require");
      return;
    }
    
    if(isEmpty(country)) {
      alert("country is require");
      return;
    }

    if(isEmpty(history)) {
      alert("history is require");
      return;
    }

    addArtist({
      fullName,
      nickName,
      avatar,
      thumbnail,
      gender,
      dob,
      country,
      history
    });
      


    console.log(this.state);
  }

  render() {
    return (
      <div className={"container pt-4"}>
        <div className={"card"}>
          <h5 className={"card-header"}>
            Add Artist
          </h5>
          <div className={"card-body"}>
            <form onSubmit = {this.addArtist}>
              <div class="row">
                <div class="col-sm">
                  {/* Full name */}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Full name</span>
                    </div>
                    <input type="text"  value={this.state.fullName} name="fullName" onChange={this.handleInputchange} className="form-control" aria-describedby="basic-addon3" />
                  </div> 
                </div>
                <div class="col-sm">
                  {/* Nickname */}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Nickname</span>
                    </div>
                    <input type="text" name="nickName" value={this.state.nickName} onChange={this.handleInputchange} className="form-control" aria-describedby="basic-addon3" />
                  </div> 
                </div>                
              </div>

              <div class="row">
                <div class="col-sm">
                  {/* Avatar */}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Avatar</span>
                    </div>
                    <input type="text" name="avatar" value={this.state.avatar} onChange={this.handleInputchange} className="form-control" aria-describedby="basic-addon3" />
                  </div>
                </div>
                <div class="col-sm">
                  {/* Thumbnail */}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Thumbnail</span>
                    </div>
                    <input type="text" name="thumbnail" value={this.state.thumbnail} onChange={this.handleInputchange} className="form-control" aria-describedby="basic-addon3" />
                  </div>         
                </div>
              </div>

              <div class="row">
                <div class="col-sm">
                  {/* Gender */}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label className="input-group-text" for="inputGroupSelect01">Gender</label>
                    </div>
                    <select value={this.state.gender} onChange = {this.handleInputchange} name="gender" className="custom-select">
                      <option selected value="0">Female</option>
                      <option value="1">Male</option>
                    </select>
                  </div>
                </div>
                <div class="col-sm">
                  {/* Date of birth */}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" >Date of birth</span>
                    </div>
                    <input type="date" name="dob" onChange={this.handleInputchange} value={this.state.dob}  className="form-control" aria-describedby="basic-addon3" />
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Country</span>
                </div>
                <AsyncSelect
                  onChange= {this.handleSelectChange}                  
                  isMulti
                  loadOptions={getCountryData}
                  defaultOptions
                  cacheOptions
                  isSearchable
                  name="country"
                  // defaultOptions
                  className="basic-multi-select form-control"
                  classNamePrefix="select"/>
              </div>
                
              {/* History  */}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">History</span>
                </div>
                <textarea name="history" value={this.state.history} onChange={this.handleInputchange} className="form-control" rows="5" aria-label="With textarea"></textarea>
              </div>
              <div className={"row justify-content-md-center"}>
                <div className={"col-sm-12"}>
                  <button type={"submit"} className={"btn btn-primary mb-2"} >
                    Add Artist
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Artist;
