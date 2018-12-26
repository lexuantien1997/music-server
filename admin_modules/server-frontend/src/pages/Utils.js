import React, {Component} from "react";
import updateCountry from "../connect-server/save.country";
import addSongType from "../connect-server/save.songType";

class Utils extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      songTypeData: null      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSongSubmit = this.handleSongSubmit.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleSongFileSelect = this.handleSongFileSelect.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let { data } = this.state;
    if(data != null) {
      alert(data);
      // save to database      
      updateCountry(JSON.parse(data)).then(success => {  
         this.setState({data: null}); 
        if(success) alert("add successfully");
        else alert("add fail");
      });
    } else {
      alert("Please import json file to upload");
    }
  }

  handleSongSubmit(event) {
    event.preventDefault();
    let { songTypeData } = this.state;
    if(songTypeData != null) {
      alert(songTypeData);
      // save to database      
      addSongType(JSON.parse(songTypeData)).then(success => {  
         this.setState({songTypeData: null}); 
        if(success) alert("add successfully");
        else alert("add fail");
      });
    } else {
      alert("Please import json file to upload");
    }
  }

  handleFileSelect(evt) {
    let files = evt.target.files;
    if (!files.length) {
      alert('No file select');
      return;
    }
    let file = files[0];
    let reader = new FileReader();
    const that = this;
    reader.onload = function(e) {
      that.setState({data: e.target.result});
    };
    reader.readAsText(file);
  }

  
  handleSongFileSelect(evt) {
    let files = evt.target.files;
    if (!files.length) {
      alert('No file select');
      return;
    }
    let file = files[0];
    let reader = new FileReader();
    const that = this;
    reader.onload = function(e) {
      that.setState({songTypeData: e.target.result});
    };
    reader.readAsText(file);
  }


  render() {
    return (
      <div className={"container pt-4"}>        
        <div className="row">
        <div className="col-sm">
          <div className={"card"}>
            <h5 className={"card-header"}>
              Add Country
            </h5>
            <div className={"card-body"}>
              <form onSubmit={this.handleSubmit}>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Upload JSON</span>
                  </div>
                  <div className="custom-file">
                    <input type="file" accept=".json" onChange={this.handleFileSelect}  className="custom-file-input" />
                    <label className="custom-file-label">Choose JSON file</label>
                  </div>
                </div>
                <div className={"row justify-content-md-center"}>
                  <div className={"col-sm-12"}>
                    <button type={"submit"} className={"btn btn-primary mb-2"} >
                      Add
                    </button>
                  </div>
                </div>
                { this.state.data && <p> {this.state.data} </p> }
                {!this.state.data && <p>Nothing</p>}
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className={"card"}>
            <h5 className={"card-header"}>
              Add Song Type
            </h5>
            <div className={"card-body"}>
              <form onSubmit={this.handleSongSubmit}>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">Upload JSON</span>
                  </div>
                  <div className="custom-file">
                    <input type="file" accept=".json" onChange={this.handleSongFileSelect}  className="custom-file-input" />
                    <label className="custom-file-label">Choose JSON file</label>
                  </div>
                </div>
                <div className={"row justify-content-md-center"}>
                  <div className={"col-sm-12"}>
                    <button type={"submit"} className={"btn btn-primary mb-2"} >
                      Add
                    </button>
                  </div>
                </div>
                { this.state.songTypeData && <p> {this.state.songTypeData} </p> }
                {!this.state.songTypeData && <p>Nothing</p>}
              </form>
            </div>
          </div>
          </div>
        </div>

      </div>
    );
  }
}
export default Utils;
