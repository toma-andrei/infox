import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import Input from "../../UI/Input/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { requestIP } from "../../../env";

const Register = (props) => {
  const [registerForm, setRegisterForm] = useState({
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
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [somethingWentWrong, setSomethingWentWrong] = useState(false);
  const [reasonForRegisterFail, setReasonForRegisterFail] = useState("");
  const [success, setSuccess] = useState(false);

  const checkValidity = (value, rules) => {
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
        value.trim() === registerForm[rules.matchField].value && isValid;
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
    const element = registerForm[id];
    element.value = event.target.value;
    element.touched = true;
    element.valid = checkValidity(element.value, element.validation);

    let allValid = true;

    for (let key in registerForm) {
      allValid = allValid && registerForm[key].valid;
    }

    setRegisterForm((prevState) => {
      return { ...prevState, [id]: { ...element } };
    });

    setFormIsValid(allValid);
  };

  const registerButtonPressedHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      for (let key in registerForm) {
        if (
          registerForm[key].validation.required &&
          registerForm[key].value === ""
        ) {
          setReasonForRegisterFail("Completați toate câmpurile obligatorii!");
          return;
        }
      }

      if (registerForm.password.value !== registerForm.confirmPassword.value) {
        setReasonForRegisterFail("Parolele nu coincid!");
        return;
      }
    } else {
      const lastName = registerForm.lastName.value;
      const firstName = registerForm.firstName.value;
      const email = registerForm.email.value;
      const password = registerForm.password.value;

      if (formIsValid) {
        setLoading(true);
        console.log("????");
        axios({
          method: "post",
          url: "http://" + requestIP,
          data: JSON.stringify({
            url: "https://infox.ro/new/auth/register",
            email: email,
            password: password,
            lastName: lastName,
            firstName: firstName,
          }),
        })
          .then((res) => {
            setLoading(false);
            if (res.data.success) {
            } else {
              setReasonForRegisterFail(res.data.reason);
              setSomethingWentWrong(true);
            }
          })
          .catch((err) => {
            setSomethingWentWrong(true);
            setLoading(false);
            setReasonForRegisterFail(
              err.response.data.reason === "undefined"
                ? ""
                : err.response.data.reason
            );
          });
      }
    }
  };

  let formElementArray = [];

  let navigate = useNavigate();

  for (let key in registerForm) {
    formElementArray.push({ id: key, config: registerForm[key] });
  }

  useEffect(() => {
    if (success) return navigate("/main");
  }, [success]);

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
              changed={(e) => inputChangedHandler(elem.id, e)}
            />
          </div>
        );
      })}
      <input
        id="registerButton"
        type="submit"
        value="Înregistrare"
        className={styles.RegisterSubmitBtn}
        style={formIsValid ? {} : { opacity: 0.6 }}
        onClick={(e) => registerButtonPressedHandler(e)}
      />

      <div
        id="failed"
        className={styles.FailedAuthDiv}
        style={{ marginTop: "10px" }}
      >
        <span className="bg bg-danger">{reasonForRegisterFail}</span>
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
};

export default Register;
