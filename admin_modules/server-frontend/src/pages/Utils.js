import React, {Component} from "react";
import "./index.css";
import Select from 'react-select';
import countries from "../untils/country";


class Utils extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"container pt-4"}>
        <div className={"card"}>
          <h5 className={"card-header"}>
            Add Artist
          </h5>
          <div className={"card-body"}>
            <form>
              <div class="row">
                <div class="col-sm">
                  {/* Full name */}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Full name</span>
                    </div>
                    <input type="text" className="form-control" aria-describedby="basic-addon3" />
                  </div> 
                </div>
                <div class="col-sm">
                  {/* Nickname */}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Nickname</span>
                    </div>
                    <input type="text" className="form-control" aria-describedby="basic-addon3" />
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
                    <input type="text" className="form-control" aria-describedby="basic-addon3" />
                  </div>
                </div>
                <div class="col-sm">
                  {/* Thumbnail */}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Thumbnail</span>
                    </div>
                    <input type="text" className="form-control" aria-describedby="basic-addon3" />
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
                    <select className="custom-select">
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
                    <input type="date" value="1990-01-01" className="form-control" aria-describedby="basic-addon3" />
                  </div>
                </div>
              </div>

              {/* History */}
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">Country</span>
                </div>
                <Select
                  isMulti
                  name="colors"
                  options={countries}
                  className="basic-multi-select form-control"
                  classNamePrefix="select"/>
              </div>
                
              {/* History  */}
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">History</span>
                </div>
                <textarea className="form-control" rows="5" aria-label="With textarea"></textarea>
              </div>
              <div className={"row justify-content-md-center"}>
                <div className={"col-sm-12"}>
                  <button
                    type={"submit"}
                    className={"btn btn-primary mb-2"}
                    >
                    Test submit!
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
      </div>
    );
  }
}
export default Utils;
