import React, { Component } from "react";
import styles from "./Register.module.css";
import Input from "../../UI/Input/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

class Register extends Component {
  //toma1_andrei@yahoo.com
  //somepass

  state = {
    registerForm: {
      lastName: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Nume utilizator" },
        value: "",
        validation: { required: false, minLength: 0, maxLength: 20 },
        valid: true,
        touched: false,
      },
      firstName: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Prenume utilizator" },
        value: "",
        validation: { required: false, minLength: 0, maxLength: 15 },
        valid: true,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Email utilizator" },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          acceptsEmailFormat: true,
        },
        valid: false,
        touched: false,
      },

      password: {
        elementType: "input",
        elementConfig: { type: "password", placeholder: "Parolă" },
        value: "",
        validation: { required: true, minLength: 5 },
        valid: false,
        touched: false,
      },
      confirmPassword: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Confirmare parolă",
        },
        value: "",
        validation: { required: true, minLength: 5, matchField: "password" },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    loading: false,
    somethingWentWrong: false,
    reasonForRegisterFail: "",
    success: false,
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = !(value.trim().length < rules.minLength) && isValid;
    }

    if (rules.maxLength) {
      isValid = !(value.trim().length > rules.maxLength) && isValid;
    }

    if (rules.matchField) {
      isValid =
        value.trim() === this.state.registerForm[rules.matchField].value &&
        isValid;
    }
    //simple verification for a valid email address
    if (rules.acceptsEmailFormat) {
      isValid =
        value.indexOf("@") >= 1 &&
        value.lastIndexOf(".") - value.indexOf("@") > 1 &&
        value.lastIndexOf(".") < value.length - 1 &&
        value[value.indexOf("@") - 1] !== "." &&
        isValid;
    }

    return isValid;
  }

  inputChangedHandler(id, event) {
    const stateCopy = { ...this.state };
    const element = stateCopy.registerForm[id];
    element.value = event.target.value;
    element.touched = true;
    element.valid = this.checkValidity(element.value, element.validation);

    let allValid = true;

    for (let key in this.state.registerForm) {
      allValid = allValid && this.state.registerForm[key].valid;
    }

    this.setState({ element, formIsValid: allValid });
  }

  registerButtonPressedHandler(event) {
    event.preventDefault();

    if (!this.state.formIsValid) {
      for (let key in this.state.registerForm) {
        if (
          this.state.registerForm[key].validation.required &&
          this.state.registerForm[key].value === ""
        ) {
          this.setState({
            reasonForRegisterFail: "Completați toate câmpurile obligatorii!",
          });
          return;
        }
      }

      if (
        this.state.registerForm.password.value !==
        this.state.registerForm.confirmPassword.value
      ) {
        this.setState({ reasonForRegisterFail: "Parolele nu coincid!" });
        return;
      }
    } else {
      const lastName = this.state.registerForm.lastName.value;
      const firstName = this.state.registerForm.firstName.value;
      const email = this.state.registerForm.email.value;
      const password = this.state.registerForm.password.value;
      // sa fac un curl din php care sa apeleze serviciul web
      // si js-ul sa apeleze acel fisier php
      // si dupa intorc inapoi raspunsul la js
      if (this.state.formIsValid) {
        this.setState({ loading: true });
        axios({
          method: "post",
          url: "http://192.168.0.101/",
          data: JSON.stringify({
            url: "https://infox.ro/new/auth/register",
            email: email,
            password: password,
            lastName: lastName,
            firstName: firstName,
          }),
        })
          .then((res) => {
            this.setState({ loading: false });
            if (res.data.success) {
            } else {
              this.setState({
                reasonForRegisterFail: res.data.reason,
                somethingWentWrong: true,
              });
            }
          })
          .catch((err) => {
            this.setState({
              somethingWentWrong: true,
              loading: false,
              reasonForRegisterFail:
                err.response.data.reason === "undefined"
                  ? ""
                  : err.response.data.reason,
            });
          });
      }
    }
  }

  render() {
    let formElementArray = [];

    let navigate = useNavigate();

    for (let key in this.state.registerForm) {
      formElementArray.push({ id: key, config: this.state.registerForm[key] });
    }

    if (this.state.success) {
      return navigate("/main");
    }

    let form = (
      <form
        id="registerForm"
        className={styles.RegisterForm}
        name="authForm"
        autoComplete="off"
      >
        <h2 className={styles.RegisterH2}>Înregistrare</h2>
        <div className="alert alert-primary" role="alert">
          Cercetați și folderul SPAM pentru emailul primit!
        </div>
        {formElementArray.map((elem) => {
          return (
            <div className={styles.InputGroup} key={elem.id}>
              <Input
                classes={styles.InputElement}
                invalid={!elem.config.valid}
                shouldValidate={elem.config.validation}
                touched={elem.config.touched}
                key={elem.id}
                elementType={elem.id}
                elementConfig={elem.config.elementConfig}
                value={elem.config.value}
                changed={this.inputChangedHandler.bind(this, elem.id)}
              />
            </div>
          );
        })}
        <input
          id="registerButton"
          type="submit"
          value="Înregistrare"
          className={styles.RegisterSubmitBtn}
          style={this.state.formIsValid ? {} : { opacity: 0.6 }}
          onClick={this.registerButtonPressedHandler.bind(this)}
        />

        <div
          id="failed"
          className={styles.FailedAuthDiv}
          style={{ marginTop: "10px" }}
        >
          <span className="bg bg-danger">
            {this.state.reasonForRegisterFail}
          </span>
        </div>
        <div>
          <div
            className="alert alert-info mt-2"
            role="alert"
            style={{ padding: "6px" }}
          >
            *Parola trebuie să aibă minim 5 caractere
          </div>
        </div>
      </form>
    );

    return (
      <main style={{ margin: "30px" }}>
        <div className={styles.RegisterWrapper}>{form}</div>
      </main>
    );
  }
}

export default Register;
