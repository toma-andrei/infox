import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../../../../components/Layout/Layout";
import { requestIP } from "../../../../env";
import Input from "../../../UI/Input/Input";
import Loading from "../../../UI/Loading/Loading";
import styles from "../UserProfile.module.css";
const OwnProfile = (props) => {
  const fromContext = useContext(AuthContext);

  const [profileForm, setProfileForm] = useState({});

  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [somethingWentWrong, setSomethingWentWrong] = useState(false);
  const [reasonForModificationFail, setReasonForRegisterFail] = useState("");
  const [success, setSuccess] = useState(false);

  const inputChangedHandler = (id, event) => {
    let elementCopy = { ...profileForm };
    elementCopy[id].value = event.target.value;
    elementCopy[id].valid = checkValidity(
      elementCopy[id].value,
      elementCopy[id].validation
    );

    setProfileForm({ ...elementCopy });

    let allValid = true;

    for (let key in profileForm) {
      allValid = profileForm[key].valid && allValid;
    }

    setFormIsValid(allValid);
  };

  const checkValidity = (value, rules) => {
    console.log("???????");
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = !(value.trim().length <= rules.minLength) && isValid;
    }

    if (rules.maxLength) {
      isValid = !(value.trim().length > rules.maxLength) && isValid;
    }

    if (rules.matchField) {
      isValid = value.trim() === profileForm[rules.matchField].value && isValid;
    }
    return isValid;
  };

  const changeProfilePicture = () => {
    console.log("change profile pic");
  };

  const submitButtonPressedHandler = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    //TODO a success/fail message
  }, [success]);

  let formInputsArray = [];

  for (let key in profileForm) {
    formInputsArray.push({ id: key, config: profileForm[key] });
  }

  useEffect(() => {
    setProfileForm({
      firstName: {
        elementType: "input",
        label: { id: "firstNameId", text: "Prenume" },
        elementConfig: { type: "text", placeholder: "Prenume" },
        value: fromContext.firstname,
        validation: {},
        valid: true,
        touched: false,
      },
      lastName: {
        elementType: "input",
        label: { id: "lastNameId", text: "Nume" },
        elementConfig: { type: "text", placeholder: "Nume" },
        value: fromContext.lastname,
        validation: {},
        valid: true,
        touched: false,
      },
      nickname: {
        elementType: "input",
        label: { id: "nickNameId", text: "Utilizator" },
        elementConfig: { type: "text", placeholder: "Nume de utilizator" },
        value: fromContext.nickname,
        validation: {},
        valid: true,
        touched: false,
      },
      password: {
        elementType: "input",
        label: { id: "passwordId", text: "Parola" },
        elementConfig: { type: "password", placeholder: "Parolă" },
        value: "",
        validation: { required: true, minLength: 5 },
        valid: false,
        touched: false,
      },
      confirmPassword: {
        elementType: "input",
        label: { id: "ConfirmPasswordId", text: "Confirmare" },
        elementConfig: {
          type: "password",
          placeholder: "Confirmare parolă",
        },
        value: "",
        validation: { required: true, minLength: 5, matchField: "password" },
        valid: false,
        touched: false,
      },
      school: {
        elementType: "input",
        label: { id: "schoolId", text: "Școala" },
        elementConfig: { type: "text", placeholder: "Școala" },
        value: fromContext.school,
        validation: {},
        valid: true,
        touched: false,
      },
      county: {
        elementType: "input",
        label: { id: "countyId", text: "Județ" },
        elementConfig: { type: "text", placeholder: "Județ" },
        value: fromContext.county,
        validation: {},
        valid: true,
        touched: false,
      },
      locality: {
        elementType: "input",
        label: { id: "localityId", text: "Localitate" },
        elementConfig: { type: "text", placeholder: "Localitate" },
        value: fromContext.locality,
        validation: {},
        valid: true,
        touched: false,
      },
    });
  }, [fromContext]);

  let ownProfileForm = (
    <form>
      {formInputsArray.map((key) => {
        return (
          <div className={styles.formLine} key={key.id}>
            <label id={key.config.label.id} className={styles.formLabel}>
              {key.config.label.text + ": "}
            </label>
            <Input
              changed={(event) => inputChangedHandler(key.id, event)}
              value={profileForm[key.id].value}
              inputStyles={styles.formInput}
              touched={key.config.touched}
              invalid={key.config.isValid}
              shouldValidate={key.config.validation}
              elementType={key.config.elementType}
              elementConfig={{
                ...key.config.elementConfig,
                id: key.config.label.id,
              }}
            />
          </div>
        );
      })}
      <div className={styles.submitFormButtonDiv}>
        <input
          type="submit"
          onClick={(event) => {
            submitButtonPressedHandler(event);
          }}
          id="submitButton"
          className={styles.submitFormButton}
          value="Salvează"
          style={!formIsValid ? { opacity: "0.6", cursor: "default" } : null}
        />
      </div>
    </form>
  );

  return (
    <>
      <div className={styles.user_profile}>
        <div className={styles.user_info_box}>
          <div>
            <img
              className={styles.profile_picture}
              src={fromContext.avatar}
              alt="avatar"
            />
            <div
              className={styles.changeProfilePicture}
              onClick={changeProfilePicture}
            >
              <div className={styles.changePhotoContent}>Change photo</div>
            </div>

            <p className={styles.description}>
              Email: {fromContext.id}
              <br />
              Statut: {fromContext.teacher === "0" ? "Elev" : "Profesor"}
            </p>
          </div>
          <div className={styles.profile_editable_data}>{ownProfileForm}</div>
        </div>
      </div>
    </>
  );
};

export default OwnProfile;
