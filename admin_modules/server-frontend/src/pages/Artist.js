import React, {Component} from "react";
import Select from 'react-select';
import getCountry from "../connect-server/get.country";
import "./index.css";
import addArtist from "../connect-server/add.artist";
import addArtistZing from "../connect-server/add.artist.zing";
import isEmpty from "../untils/is-empty.validate";


class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _countries: [],
      fullName: null,
      nickName:null,
      avatar:"",
      thumbnail:"",
      gender: '0',
      dob: '1990-01-01',
      country:[],
      history:null ,      
      // 
      sig:"",
      ctime:"",
      api_key:"",
      urlCountry:"",
      countryZ:""  
    };
    this.addArtist = this.addArtist.bind(this);
    this.handleInputchange = this.handleInputchange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);

    this.handleFetchDataFromZing = this.handleFetchDataFromZing.bind(this); 
    this.handleSelectZingCountryChange = this.handleSelectZingCountryChange.bind(this);
  }

  componentDidMount() {
    getCountry().then(data => {
      this.setState({
        _countries: data
      });
    })
  }

  handleSelectZingCountryChange(selectedOption) {
    this.setState({
      countryZ: selectedOption
    });
  }
  
  handleFetchDataFromZing(event) {
    event.preventDefault();

    let {
      api_key,
      sig,
      ctime,
      urlCountry,
      countryZ
    } = this.state;

    if(isEmpty(urlCountry)){
      alert("url country is required");
      return;
    }

    if(isEmpty(sig)){
      alert("sig is required");
      return;
    }

    if(isEmpty(ctime)){
      alert("ctime is required");
      return;
    }

    if(isEmpty(api_key)){
      alert("country is required");
      return;
    }

    if(isEmpty(countryZ)){
      alert("country is required");
      return;
    }

    addArtistZing({
      api_key,
      sig,
      ctime,
      urlCountry,
      countryZ
    });
    console.log(this.state);
  }

  handleSelectChange(selectedOption) {
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
    })
      
    console.log(this.state);
  }

  render() {
    const {
      // 
      sig,
      ctime,
      api_key,
      urlCountry
    } = this.state;
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
                      <span className="input-group-text">Full name *</span>
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
                      <span className="input-group-text" >Birthday *</span>
                    </div>
                    <input type="date" name="dob" onChange={this.handleInputchange} value={this.state.dob}  className="form-control" aria-describedby="basic-addon3" />
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Country *</span>
                </div>
                <Select
                  onChange= {this.handleSelectChange}                  
                  isMulti
                  options = {this.state._countries}
                  name="country"
                  className="basic-multi-select form-control"
                  classNamePrefix="select"/>
              </div>
                
              {/* History  */}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">History *</span>
                </div>
                <textarea name="history" value={this.state.history} onChange={this.handleInputchange} className="form-control" rows="5" aria-label="With textarea"></textarea>
              </div>

              <div className="input-group mb-3" />

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

        <div className={"card"}>
          <h5 className={"card-header"}>
            Add Song by get link Zing
          </h5>
          <div className={"card-body"}>
            <form  onSubmit={this.handleFetchDataFromZing}>
              {/*  */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Url country</span>
                </div>
                <input type="text" name="name" name="urlCountry" value = {urlCountry} onChange = {this.handleInputchange} className="form-control"  />
              </div>
              {/*  */}
              <div class="row">
                <div class="col-sm">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">ctime</span>
                    </div>
                    <input type="text" name="ctime" value = {ctime} onChange = {this.handleInputchange} className="form-control"/>
                  </div>
                </div>
                <div class="col-sm">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">sig</span>
                    </div>
                    <input name="sig" value = {sig} onChange = {this.handleInputchange} type="text" className="form-control" />
                  </div> 
                </div>
                <div class="col-sm">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">api_key</span>
                    </div>
                    <input name="api_key" value = {api_key} onChange = {this.handleInputchange} type="text" className="form-control" />
                  </div> 
                </div>
              </div>


              {/* History */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Country *</span>
                </div>
                <Select
                  onChange= {this.handleSelectZingCountryChange}                  
                  options = {this.state._countries}
                  name="country"
                  className="basic-multi-select form-control"
                  classNamePrefix="select"/>
              </div>

              {/*  */}

              <div className="input-group mb-3" />

              <div className={"row justify-content-md-center"}>
                <div className={"col-sm-12"}>
                  <button type={"submit"} className={"btn btn-primary mb-2"}>
                    Fetch Song
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
