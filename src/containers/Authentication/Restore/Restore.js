import React, { useState } from "react";
import styles from "./Restore.module.css";
import Input from "../../UI/Input/Input";
import { useNavigate } from "react-router-dom";
import ajax from "../../../assets/js/ajax";
import SavedWithSuccess from "../../AuthorAndAdmin/AddProblem/SavedWithSuccess/SavedWithSuccess";

const Restore = (props) => {
  const [restoreForm, setRestoreForm] = useState({
    email: {
      elementType: "input",
      elementConfig: { type: "text", placeholder: "Adresa de email" },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        acceptsEmailFormat: true,
      },
      valid: false,
      touched: false,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [somethingWentWrong, setSomethingWentWrong] = useState(false);
  const [reasonForRestoreFail, setReasonForRestoreFail] = useState("");
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
      isValid = value.trim() === restoreForm[rules.matchField].value && isValid;
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
    let element = restoreForm[id];
    element.value = event.target.value;
    element.touched = true;
    element.valid = checkValidity(element.value, element.validation);
    let allValid = true;

    for (let key in restoreForm) {
      allValid = allValid && restoreForm[key].valid;
    }
    setRestoreForm((prevState) => {
      return { [id]: { ...element } };
    });
    setFormIsValid(allValid);
  };

  const restoreButtonPressedHandler = (event) => {
    event.preventDefault();
    ajax("https://infox.ro/new/auth/reset", "post", "", {
      email: restoreForm.email.value,
    }).then((res) => {
      if (res?.data?.success ?? false) {
        setSuccess(true);
      } else {
        setReasonForRestoreFail(res?.data?.reason ?? "");
      }
    });
  };

  const formElementArray = [];

  let navigate = useNavigate();

  for (let key in restoreForm) {
    formElementArray.push({ id: key, config: restoreForm[key] });
  }

  //if login is successfull redirect to /main

  let form = (
    <form
      id="restoreForm"
      className={styles.RestoreForm}
      name="restoreForm"
      autoComplete="off"
    >
      <h2 className={styles.RestoreH2}>Recuperare cont</h2>

      {/* <div className="alert alert-primary" role="alert">
        Recomandăm să autentificați folosind Google sau Facebook
      </div> */}

      <div className="alert alert-secondary" role="alert">
        După ce apăsați recuperare veți primii un e-mail care vă va ajuta să vă
        recuperați contul!
      </div>
      {formElementArray.map((elem) => {
        return (
          <>
            {success ? (
              <SavedWithSuccess
                text="Un email de verificare va fi trimis în curând."
                moveToFalse={() => setSuccess(false)}
              />
            ) : null}
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
                changed={(event) => inputChangedHandler(elem.id, event)}
              />
            </div>
          </>
        );
      })}
      <input
        id="restoreButton"
        type="button"
        value="Recuperare"
        style={formIsValid ? {} : { opacity: 0.6 }}
        className={styles.RestoreSubmitBtn}
        onClick={(event) => restoreButtonPressedHandler(event)}
      />

      <div
        id="failed"
        className={styles.FailedAuthDiv}
        style={{ marginTop: "10px" }}
      >
        <span className="bg bg-danger">{reasonForRestoreFail}</span>
      </div>
      <div id="failed" className={styles.FailedAuthDiv}></div>
    </form>
  );

  return (
    <div style={{ margin: 30 }}>
      <main className={styles.RestoreWrapper}>{form}</main>
    </div>
  );
};

export default Restore;
