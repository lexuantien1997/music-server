import React, {Component} from "react";
import "./index.css";
import Select, { components } from 'react-select';
import getSongType from "../connect-server/get.songType";
import addSongZing from "../connect-server/add.song.zing";
import getArtist from "../connect-server/get.artist";
import addSong from "../connect-server/add.song";
import isEmpty from "../untils/is-empty.validate";


const Option = (props) => {
  return (
    <div className = "row mb-3">
      <div className="col-2">
        <img width="100" height="100" src={props.data.avatar} />
      </div>
      <div className="col-7">
        <components.Option {...props} />      
      </div>
      <div className="col-2">
        {props.data.fullName}
      </div>
    </div>
  )
}

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // manually
      _songTypes: [],
      _artists:[],
      name:"",
      thumbnail:"",
      audioLyric:"",
      audio128:"",
      audio320:"",
      audioLossless:"",
      creationDate:"2018-10-10",
      typeSong: [],
      artist:[],
      // auto fetch from zing
      sig: "",
      ctime:"",
      api_key:"",
      urlCountry:"" ,
      artistUrl:"", // beta url
      count: 1  
    };

    this.handleAddSong = this.handleAddSong.bind(this);
    this.handleInputchange = this.handleInputchange.bind(this);
    this.handleSelectArtistChange = this.handleSelectArtistChange.bind(this);
    this.handleSelectSongTypeChange = this.handleSelectSongTypeChange.bind(this);
    //
    this.handleFetchDataFromZing = this.handleFetchDataFromZing.bind(this); 
  }

  handleFetchDataFromZing(event) {
    event.preventDefault();
    let {
      artistUrl, // beta url
      count
    } = this.state;

    if(isEmpty(artistUrl)) {
      alert("artistUrl is require");
      return;
    }

    addSongZing({
      artistUrl, // beta url
      count
    })
  }

  handleSelectArtistChange(selectedOption) {
    this.setState({
      artist: selectedOption
    });    
  }

  handleSelectSongTypeChange(selectedOption) {
    this.setState({
      typeSong: selectedOption
    });    
  }

  handleInputchange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({[name]: target.value});
  }

  handleAddSong(event) {
    event.preventDefault();

    let {
      name,
      thumbnail,
      audioLyric,
      audio128,
      audio320,
      audioLossless,
      creationDate,
      typeSong,
      artist
    } = this.state;

    if(isEmpty(name)) {
      alert("name is require");
      return;
    }

    
    if(isEmpty(artist)) {
      alert("artist is require");
      return;
    }

    if(isEmpty(audio128)) {
      alert("audio 128 is require");
      return;
    }
    
    if(isEmpty(creationDate)) {
      alert("creation Date is require");
      return;
    }
    addSong({
      name,
      thumbnail,
      audio: [audioLyric, audio128, audio320, audioLossless],
      video: [videoLyric, video360, video480, video720, video1080],
      creationDate,
      typeSong,
      artist
    })

    console.log(this.state);
  }



  componentDidMount() {
    getSongType().then(data => {
      if(data) this.setState({ _songTypes: data});
      else alert("Get song type error, please press refresh");
    });

    getArtist().then(data => {
      if(data) this.setState({_artists: data});
      else alert("Get artist error, please press refresh");
    })
  }



  render() {
    const {  
      _songTypes,
      _artists,
      name,
      thumbnail,
      audioLyric,
      audio128,
      audio320,
      audioLossless,
      artists,
      creationDate,
      typeSong,
      artistUrl, // beta url
      count
    } = this.state;
    return (
      <div className={"container pt-4"}>
        <div className={"card"}>
          <h5 className={"card-header"}>
            Add Song Manually
          </h5>
          <div className={"card-body"}>
            <form  onSubmit={this.handleAddSong}>
              {/* song name */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Name *</span>
                </div>
                <input type="text" name="name" value = {name} onChange = {this.handleInputchange} className="form-control" aria-describedby="basic-addon3" />
              </div>  
              {/* Thumbnail */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Thumbnail</span>
                </div>
                <input type="text" name="thumbnail" value = {thumbnail} onChange = {this.handleInputchange} className="form-control" aria-describedby="basic-addon3" />
              </div>  

              {/* array artists */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Artists *</span>
                </div>
                <Select
                  isMulti
                  onChange={this.handleSelectArtistChange}
                  components={{ Option }}
                  options={_artists}
                  className="basic-multi-select form-control"
                  classNamePrefix="select"
                />
                  <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary" type="button">Refresh</button>
                  </div>
              </div>

                {/* array songs type */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Song types</span>
                </div>
                <Select
                  onChange={this.handleSelectSongTypeChange}
                  isMulti
                  options={_songTypes}
                  className="basic-multi-select form-control"
                  classNamePrefix="select"/>
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary" type="button">Refresh</button>
                </div>
              </div>

              {/* Creation date */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Creation Date *</span>
                </div>
                <input type="date" name="creationDate" value = {creationDate} onChange = {this.handleInputchange} className="form-control" aria-describedby="basic-addon3" />
              </div>
              

              {/* Audio */}
              <span className="container" >Audio</span>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Lyric</span>
                </div>
                <input value = {audioLyric} name="audioLyric" onChange = {this.handleInputchange} type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
                <div class="input-group-prepend">
                  <div class="input-group-text">
                    <input checked = {!isEmpty(audioLyric)} disabled type="checkbox" aria-label="Checkbox for following text input" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">128 *</span>
                    </div>
                    <input value = {audio128} name="audio128" onChange = {this.handleInputchange} type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                        <input type="checkbox" disabled checked = {!isEmpty(audio128)} aria-label="Checkbox for following text input" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">320</span>
                    </div>
                    <input value = {audio320} name="audio320" onChange = {this.handleInputchange} type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                      <input checked = {!isEmpty(audio320)} disabled type="checkbox" aria-label="Checkbox for following text input" />
                    </div>
                    </div>
                  </div> 
                </div>
                <div class="col-sm">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">lossless</span>
                    </div>
                    <input value = {audioLossless} name="audioLossless" onChange = {this.handleInputchange} type="text" className="form-control" aria-label="Amount (to the nearest dollar)"/>
                    <div class="input-group-prepend">
                      <div class="input-group-text">
                      <input type="checkbox" disabled checked = {!isEmpty(audioLossless)} aria-label="Checkbox for following text input" />
                    </div>
                    </div>
                  </div> 
                </div>
              </div>

              <div className="input-group mb-3" />

              <div className={"row justify-content-md-center"}>
                <div className={"col-sm-12"}>
                  <button
                    type={"submit"}
                    className={"btn btn-primary mb-2"}
                    >
                    Add song!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className={"card"}>
          <h5 className={"card-header"}>
            Add specify song
          </h5>
          <div className={"card-body"}>
            <form  onSubmit={this.handleFetchDataFromZing}>
              
              <div className="input-group mb-3" />
              
            </form>
          </div>
        </div>

        <div className={"card"}>
          <h5 className={"card-header"}>
            Add all song ZING by artist
          </h5>
          <div className={"card-body"}>
            <form  onSubmit={this.handleFetchDataFromZing}>
              {/*  */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Beta mp3</span>
                </div>
                <input type="text" name="artistUrl" value = {artistUrl} onChange = {this.handleInputchange} className="form-control"  />
              </div>
              {/*  */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Count</span>
                </div>
                <input type="text" name="count" value = {count} onChange = {this.handleInputchange} className="form-control"  />
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
export default Song;
