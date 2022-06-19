import styles from "./Login.module.css";
import Input from "../../UI/Input/Input";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import ajax from "../../../assets/js/ajax";
import particles from "../../../assets/js/particles";

const Login = (props) => {
  //input elements for login with different attributes
  const [loginForm, setLoginForm] = useState({
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
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [somethingWentWrong, setSomethingWentWrong] = useState(false);
  const [reasonForLoginFail, setReasonForLoginFail] = useState("");

  //function that handles jwt changes
  const { updateJWT } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //check validity of form inputs
  const checkValidity = (value, rules) => {
    /**
     * Checks input validity based on some rules
     * @param {string} value Value of user's input
     * @param {Object} rules Rules for user's input
     * @returns {boolean} value depending on user's input
     */
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
  };

  const inputChangedHandler = (id, event) => {
    /**
     * Function is called whenever user change input value and updates the state
     * @param {*} id
     * @param {*} event
     */

    let element = loginForm[id];
    element.value = event.target.value;
    element.touched = true;
    element.valid = checkValidity(element.value, element.validation);

    let allValid = true;

    for (let key in loginForm) {
      allValid = allValid && loginForm[key].valid;
    }

    setLoginForm((prevState) => {
      return { ...prevState, [id]: { ...element } };
    });
    setFormIsValid(allValid);
  };

  //if login button was pressed
  const loginButtonPressedHandler = (event) => {
    event.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    if (formIsValid) {
      setLoading(true);
      ajax("https://infox.ro/new/auth/login", "post", "", {
        email: email,
        password: password,
      })
        .then((res) => {
          setLoading(false);

          if (res.data.success) {
            if (res.data.jwt) {
              localStorage.setItem("infoxJWT", res.data.jwt);
              //set jwt in auth context
              updateJWT(res.data.jwt);
              localStorage.setItem("userEmail", JSON.stringify(email));
              //if all is ok, send user to the page he came from
              navigate(from, { replace: true });
              return;
            }
          } else {
            setReasonForLoginFail(res.data.reason);
            setSomethingWentWrong(true);
          }
        })
        .catch((err) => {
          const response = err.hasOwnProperty("response")
            ? ""
            : err.response.data.reason;
          setSomethingWentWrong(true);
          setLoading(false);
          setReasonForLoginFail(response);
        });
    }
  };

  const formElementArray = [];

  for (let key in loginForm) {
    formElementArray.push({ id: key, config: loginForm[key] });
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
        <Link className={styles.RegisterLink} to="/register">
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
              changed={(e) => inputChangedHandler(elem.id, e)}
            />
          </div>
        );
      })}
      <input
        id="loginButton"
        type="submit"
        value="Autentificare"
        className={styles.loginSubmitBtn}
        style={formIsValid ? {} : { opacity: 0.6 }}
        onClick={(e) => loginButtonPressedHandler(e)}
      />
      <div id="failed" className={styles.FailedAuthDiv}>
        {somethingWentWrong ? (
          <>
            <span className={"bg bg-danger " + styles.FailedAuthBadge}>
              Autentificare esuata !
            </span>
            <Link
              to="/restore"
              className={[styles.forgotPw, styles.FailedAuthA].join(" ")}
            >
              Ați uitat parola ?
            </Link>
          </>
        ) : null}
      </div>
      {reasonForLoginFail ? (
        <div className={styles.ReasonBadgeWrapper}>
          <span
            className={
              "bg bg-pill bg-danger " +
              [styles.FailedAuthBadge, styles.CenterBadge].join(" ")
            }
          >
            {reasonForLoginFail}
          </span>
        </div>
      ) : null}
    </form>
  );

  return (
    <>
      <main style={{ margin: 30 }}>
        {particles(65, false, 80)}
        <div className={styles.loginWrapper}>{form}</div>
      </main>
    </>
  );
};

export default Login;
