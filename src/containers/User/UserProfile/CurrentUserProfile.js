import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../../../components/Layout/Layout";
import { requestIP } from "../../../env";
import Input from "../../UI/Input/Input";
import Loading from "../../UI/Loading/Loading";
import styles from "./UserProfile.module.css";
import defaultAvatar from "../../../assets/img/navbarImages/basic_avatar.jpg";
import useAuth from "../../../hooks/useAuth";
import ColorPicker from "../../UI/ColorPicker/ColorPicker";
const CurrentUserProfile = (props) => {
  const fromContext = useContext(AuthContext);

  const [profileForm, setProfileForm] = useState({});

  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [somethingWentWrong, setSomethingWentWrong] = useState(false);
  const [reasonForModificationFail, setReasonForRegisterFail] = useState("");
  const [success, setSuccess] = useState(false);
  const { setBackgroundColor } = useAuth();

  const inputChangedHandler = (id, event) => {
    let elementCopy = { ...profileForm };
    elementCopy[id].value = event.target.value;
    elementCopy[id].touched = true;

    elementCopy[id].valid = checkValidity(
      elementCopy[id].value,
      elementCopy[id].validation
    );

    if (id === "password") {
      elementCopy["confirmPassword"].valid = checkValidity(
        elementCopy["confirmPassword"].value,
        elementCopy["confirmPassword"].validation
      );
    }

    setProfileForm({ ...elementCopy });

    let allValid = true;

    for (let key in profileForm) {
      allValid = profileForm[key].valid && allValid;
    }

    setFormIsValid(allValid);
  };

  const checkValidity = (value, rules) => {
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

    if (formIsValid) {
      axios({
        method: "post",
        url: "http://" + requestIP,
        data: {
          url: "https://infox.ro/new/users/profile",
          jwt: fromContext.jwt,
          firstname: profileForm.firstName.value,
          lastname: profileForm.lastName.value,
          nickname: profileForm.nickname.value,
          public: fromContext.public,
          password: profileForm.password.value,
          confirmPassword: profileForm.confirmPassword.value,
          school: profileForm.school.value,
          county: profileForm.county.value,
          locality: profileForm.locality.value,
        },
      }).then((res) => {
        console.log(res.data);
      });
    }
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
        value: fromContext?.firstname || "",
        validation: {},
        valid: true,
        touched: false,
        stylingClasses: [],
      },
      lastName: {
        elementType: "input",
        label: { id: "lastNameId", text: "Nume" },
        elementConfig: { type: "text", placeholder: "Nume" },
        value: fromContext?.lastname,
        validation: {},
        valid: true,
        touched: false,
        stylingClasses: [],
      },
      nickname: {
        elementType: "input",
        label: { id: "nickNameId", text: "Utilizator" },
        elementConfig: { type: "text", placeholder: "Nume de utilizator" },
        value: fromContext?.nickname,
        validation: {},
        valid: true,
        touched: false,
        stylingClasses: [],
      },
      password: {
        elementType: "input",
        label: { id: "passwordId", text: "Parola" },
        elementConfig: { type: "password", placeholder: "Parolă" },
        value: "",
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        touched: false,
        stylingClasses: [],
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
        stylingClasses: [],
      },
      school: {
        elementType: "input",
        label: { id: "schoolId", text: "Școala" },
        elementConfig: { type: "text", placeholder: "Școala" },
        value:
          fromContext?.school === "Nu este setată școala"
            ? ""
            : fromContext?.school,
        validation: {},
        valid: true,
        touched: false,
        stylingClasses: [],
      },
      county: {
        elementType: "input",
        label: { id: "countyId", text: "Județ" },
        elementConfig: { type: "text", placeholder: "Județ" },
        value:
          fromContext?.county === "Setează județul" ? "" : fromContext?.county,
        validation: {},
        valid: true,
        touched: false,
        stylingClasses: [],
      },
      locality: {
        elementType: "input",
        label: { id: "localityId", text: "Localitate" },
        elementConfig: { type: "text", placeholder: "Localitate" },
        value:
          fromContext?.locality === "Setează localitatea"
            ? ""
            : fromContext?.locality,
        validation: {},
        valid: true,
        touched: false,
        stylingClasses: [],
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
              invalid={!key.config.valid}
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
    <main>
      <div className={styles.userProfile}>
        <div className={styles.user_info_box}>
          <div>
            <img
              className={styles.profile_picture}
              src={
                fromContext.avatar === "/avatars/basic_avatar.jpg"
                  ? defaultAvatar
                  : fromContext.avatar
              }
              alt="avatar"
            />
            <div
              className={styles.changeProfilePicture}
              onClick={changeProfilePicture}
            >
              <div className={styles.changePhotoContent}>Change photo</div>
            </div>

            <p className={styles.description}>
              Email: {localStorage.getItem("userEmail")}
              <br />
              Statut: {fromContext.teacher === "0" ? "Elev" : "Profesor"}
            </p>
          </div>
          <div className={styles.profile_editable_data}>{ownProfileForm}</div>
          <div className={styles.colorCustomization}>
            <p className={styles.colorLabel}>Culoare de fundal</p>
            <div className={styles.colorPicker}>
              <ColorPicker changeBackground={setBackgroundColor} />
              {/* <button
                className={[styles.colorButton, styles.clasicColor].join(" ")}
                onClick={() => {
                  setBackgroundColor("#208f8f");
                }}
              ></button>
              <button
                className={[styles.colorButton, styles.yellowColor].join(" ")}
                onClick={() => {
                  setBackgroundColor("#fcc603");
                }}
              ></button>
              <button
                className={[styles.colorButton, styles.purpleColor].join(" ")}
                onClick={() => {
                  setBackgroundColor("#8000FF");
                }}
              ></button>
              <button
                className={[styles.colorButton, styles.blueColor].join(" ")}
                onClick={() => {
                  setBackgroundColor("#2e77b8");
                }}
              ></button>
              <button
                className={[styles.colorButton, styles.grayColor].join(" ")}
                onClick={() => {
                  setBackgroundColor("#ccc");
                }}
              ></button> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CurrentUserProfile;
