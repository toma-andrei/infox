import styles from "./Login.module.css";
import Input from "../../UI/Input/Input";
import { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
/**
 * loginForm is an object containing informations about input elements on page
 */
class Login extends Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Adresa de email" },
        value: "",
        validation: { required: true, minLength: 5, acceptsEmailFormat: true },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: { type: "password", placeholder: "Parola" },
        value: "",
        validation: { required: true, minLength: 5 },
        valid: false,
        touched: false,
      },
    },
    formIsValid: false,
    loading: false,
    somethingWentWrong: false,
    reasonForLoginFail: "",
    success: false,
  };

  /**
   * Checks input validity based on some rules
   * @param {string} value Value of user's input
   * @param {Object} rules Rules for user's input
   * @returns boolean
   */
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

  /**
   * Function is called whenever user change input value and updates the state
   * @param {*} id
   * @param {*} event
   */
  inputChangedHandler(id, event) {
    const stateCopy = { ...this.state };
    const element = stateCopy.loginForm[id];
    element.value = event.target.value;
    element.touched = true;
    element.valid = this.checkValidity(element.value, element.validation);

    let allValid = true;

    for (let key in this.state.loginForm) {
      allValid = allValid && this.state.loginForm[key].valid;
    }

    this.setState({ element, formIsValid: allValid });
  }

  /**
   * When submit button is pressed a call is made to backend and a specific message is received
   * @param {Event} event
   */
  loginButtonPressedHandler(event) {
    event.preventDefault();
    const email = this.state.loginForm.email.value;
    const password = this.state.loginForm.password.value;

    if (this.state.formIsValid) {
      this.setState({ loading: true });
      axios({
        method: "post",
        url: "http://192.168.0.101/",
        data: JSON.stringify({
          url: "https://infox.ro/new/auth/login",
          email: email,
          password: password,
        }),
      })
        .then((res) => {
          this.setState({ loading: false });
          if (res.data.success) {
            if (res.data.jwt) {
              localStorage.setItem("infoxJWT", res.data.jwt);
              this.setState({ success: true });
            }
          } else {
            this.setState({
              reasonForLoginFail: res.data.reason,
              somethingWentWrong: true,
            });
          }
        })
        .catch((err) => {
          const response = err.hasOwnProperty("response")
            ? ""
            : err.response.data.reason;
          this.setState({
            somethingWentWrong: true,
            loading: false,
            reasonForLoginFail: response,
          });
        });
    }
  }

  render() {
    //translate loginForm object to array
    const formElementArray = [];

    for (let key in this.state.loginForm) {
      formElementArray.push({ id: key, config: this.state.loginForm[key] });
    }

    //if login is successfull redirect to /main
    if (this.state.success) {
      return <Redirect to="/main" />;
    }

    //create a form element and inputs using loginForm field in state
    let form = (
      <form
        id="loginForm"
        className={styles.LoginForm}
        name="authForm"
        autoComplete="off"
      >
        <h2 className={styles.LoginH2}>Autentificare</h2>
        <div className={styles.RegisterLinkDiv}>
          <Link className={styles.RegisterLink} to="/user/register">
            Înregistrare
          </Link>
        </div>
        {formElementArray.map((elem) => {
          return (
            <div className={styles.inputGroup} key={elem.id}>
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
          id="loginButton"
          type="submit"
          value="Autentificare"
          className={styles.loginSubmitBtn}
          style={this.state.formIsValid ? {} : { opacity: 0.6 }}
          onClick={this.loginButtonPressedHandler.bind(this)}
        />
        <div id="failed" className={styles.FailedAuthDiv}>
          {this.state.somethingWentWrong ? (
            <>
              <span className={"bg bg-danger " + styles.FailedAuthBadge}>
                Autentificare esuata !
              </span>
              <Link
                to="/user/restore"
                className={[styles.forgotPw, styles.FailedAuthA].join(" ")}
              >
                Ați uitat parola ?
              </Link>
            </>
          ) : null}
        </div>
        {this.state.reasonForLoginFail ? (
          <div className={styles.ReasonBadgeWrapper}>
            <span
              className={
                "bg bg-pill bg-danger " +
                [styles.FailedAuthBadge, styles.CenterBadge].join(" ")
              }
            >
              {this.state.reasonForLoginFail}
            </span>
          </div>
        ) : null}
      </form>
    );

    return (
      <>
        <main style={{ margin: 30 }}>
          <div className={styles.loginWrapper}>{form}</div>
        </main>
      </>
    );
  }
}

export default Login;
