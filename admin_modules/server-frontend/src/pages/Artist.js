import React, {Component} from "react";
import "./index.css";
import Select from 'react-select';

const colourOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' }
];

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isValidated: false
    };    
    this.validate = this.validate.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }


  /**
   * Them main function that validates the form and fills in the error messages.
   * @returns bool Returns a boolean showing if the form is valid for submission or not.
   **/
  validate() {
    //this.formEl is a reference in the component to the form DOM element.
    const formEl = this.formEl;
    const formLength = formEl.length;

    /*
    * The checkValidity() method on a form runs the 
    * html5 form validation of its elements and returns the result as a boolean.
    * It returns 'false' if at least one of the form elements does not qualify,
    * and 'true', if all form elements are filled with valid values.
    */
    if (formEl.checkValidity() === false) {
      for (let i = 0; i < formLength; i++) {
        //the i-th child of the form corresponds to the forms i-th input element
        const elem = formEl[i];
        /*
        * errorLabel placed next to an element is the container we want to use 
        * for validation error message for that element
        */
        const errorLabel = elem.parentNode.querySelector(".invalid-feedback");

        /*
        * A form element contains also any buttuns contained in the form.
        * There is no need to validate a button, so, we'll skip that nodes.
        */
        if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
          /*
          * Each note in html5 form has a validity property. 
          * It contains the validation state of that element.
          * The elem.validity.valid property indicates whether the element qualifies its validation rules or no.
          * If it does not qualify, the elem.validationMessage property will contain the localized validation error message.
          * We will show that message in our error container if the element is invalid, and clear the previous message, if it is valid.
          */
          if (!elem.validity.valid) {
            errorLabel.textContent = elem.validationMessage;
          } else {
            errorLabel.textContent = "";
          }
        }
      }

      //Return 'false', as the formEl.checkValidity() method said there are some invalid form inputs.
      return false;
    } else {
      //The form is valid, so we clear all the error messages
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i];
        const errorLabel = elem.parentNode.querySelector(".invalid-feedback");
        if (errorLabel && elem.nodeName.toLowerCase() !== "button") {
          errorLabel.textContent = "";
        }
      }

      //Return 'true', as the form is valid for submission
      return true;
    }
  };

  /**
  * This is the method that is called on form submit.
  * It stops the default form submission process and proceeds with custom validation.
  **/
  submitHandler(event){
    event.preventDefault();

    //If the call of the validate method was successful, we can proceed with form submission. Otherwise we do nothing.
    if (this.validate()) {
      this.props.submit();
    }

    this.setState({ isValidated: true });
  };

  /**
  * Render the component as a regular form element with appended children from props.
  **/
  render() {
    const props = [...this.props];

    //Add bootstrap's 'was-validated' class to the forms classes to support its styling
    let classNames = [];
    if (props.className) {
      classNames = [...props.className];
      delete props.className;
    }

    if (this.state.isValidated) {
      classNames.push("was-validated");
    }

    //The form will have a refference in the component and a submit handler set to the component's submitHandler
    return (
      <form
        {...props}
        className={classNames}
        noValidate
        ref={form => (this.formEl = form)}
        onSubmit={this.submitHandler}
      >
        {this.props.children}
      </form>
    );
  }
}



class Artist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFormSuccess: false
    };
    this.submit = this.submit.bind(this);
    this._renderSuccessMessage = this._renderSuccessMessage.bind(this);
  }


  submit() {
    //Replace this code with a working request to your backend.
    //Now it just displays a success message.
    this.setState({showFormSuccess: true});
    setTimeout(() => {this.setState({showFormSuccess: false});}, 5000);
  }
  
  _renderSuccessMessage() {
    return (
      <div className={"alert alert-success mt-4"} role="alert">
        Form was successfully validated and is ready to be submitted!
      </div>
    );
  }


  render() {
    return (
      <div className={"container pt-4"}>
        <div className={"card"}>
          <h5 className={"card-header"}>
            Add Artist
          </h5>
          <div className={"card-body"}>
            <Form submit={this.submit}>
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
                <div class="col-3">
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
                <div class="col-sm-4">
                  {/* Date of birth */}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text" >Date of birth</span>
                    </div>
                    <input type="date" value="1990-01-01" className="form-control" aria-describedby="basic-addon3" />
                  </div>
                </div>
                <div class="col-sm">
                  {/* Country */}
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">Country</span>
                    </div>
                    <Select
                      isMulti
                      name="colors"
                      options={colourOptions}
                      className="basic-multi-select form-control"
                      classNamePrefix="select"/>
                  </div>
                </div>
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
            </Form>
          </div>
        </div>
        {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
      </div>
    );
  }
}
export default Artist;
