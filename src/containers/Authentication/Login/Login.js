import styles from "./Login.module.css";
import Input from "../../UI/Input/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { requestIP } from "../../../env";

const Login = (props) => {
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
  const [success, setSuccess] = useState(false);

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

  const loginButtonPressedHandler = (event) => {
    event.preventDefault();
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    if (formIsValid) {
      setLoading(true);

      axios({
        method: "post",
        url: "http://" + requestIP,
        data: JSON.stringify({
          url: "https://infox.ro/new/auth/login",
          email: email,
          password: password,
        }),
      })
        .then((res) => {
          setLoading(false);

          if (res.data.success) {
            if (res.data.jwt) {
              localStorage.setItem("infoxJWT", res.data.jwt);
              setSuccess(true);
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

  let navigate = useNavigate();
  useEffect(() => {
    if (success) {
      return navigate("/main");
    }
  }, [success]);

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
              to="/user/restore"
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
        <div className={styles.loginWrapper}>{form}</div>
      </main>
    </>
  );
};

export default Login;
