import React, {Component} from "react";
import "./index.css";


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
        <div className={"container"}>
          <div className={"card"}>
            <h5 className={"card-header"}>
              Add Artist
            </h5>
            <div className={"card-body"}>
              <Form submit={this.submit}>
                {/* Full name */}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Full name</span>
                  </div>
                  <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                </div>  
                {/* Nickname */}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Nickname</span>
                  </div>
                  <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                </div>  
                {/* Avatar */}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Avatar</span>
                  </div>
                  <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                </div>  
                {/* Thumbnail */}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Thumbnail</span>
                  </div>
                  <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                </div>              
                {/* Gender */}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" for="inputGroupSelect01">Gender</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelect01">
                    <option selected value="0">Female</option>
                    <option value="1">Male</option>
                  </select>
                </div>
                {/* Date of birth */}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon3">Date of birth</span>
                  </div>
                  <input type="date" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
                </div>
                {/* Country */}
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" for="inputGroupSelect01">Country</label>
                  </div>
                  <select className="custom-select">
                    <option selected value="0">Việt Nam</option>
                    <option value="1">Mỹ</option>
                    <option value="2">Anh</option>
                    <option value="3">Đức</option>
                    <option value="4">Pháp</option>
                  </select>
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
        </div>
        {this.state.showFormSuccess ? this._renderSuccessMessage() : null}
      </div>
    );
  }
}
export default Artist;