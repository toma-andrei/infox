import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../components/Layout/Layout";
import Input from "../../UI/Input/Input";
import styles from "./UserProfile.module.css";
import defaultAvatar from "../../../assets/img/navbarImages/basic_avatar.jpg";
import useAuth from "../../../hooks/useAuth";
import ColorPicker from "../../UI/ColorPicker/ColorPicker";
import UserModal from "./Modal/UserModal";
import ajax from "../../../assets/js/ajax";
import SavedWithSuccess from "../../AuthorAndAdmin/AddProblem/SavedWithSuccess/SavedWithSuccess";

const CurrentUserProfile = (props) => {
  const fromContext = useContext(AuthContext);

  const [profileForm, setProfileForm] = useState({});

  const [formIsValid, setFormIsValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setBackgroundColor } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [authorBought, setAuthorBought] = useState(false);
  const [error, setError] = useState("");

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
    alert("TODO: on backend : posibility to change picture url");
  };

  const submitButtonPressedHandler = (event) => {
    event.preventDefault();

    if (formIsValid) {
      ajax("https://infox.ro/new/users/profile", "post", fromContext.jwt, {
        firstname: profileForm.firstName.value,
        lastname: profileForm.lastName.value,
        nickname: profileForm.nickname.value,
        public: fromContext.public,
        password: profileForm.password.value,
        confirmPassword: profileForm.confirmPassword.value,
        school: profileForm.school.value,
        county: profileForm.county.value,
        locality: profileForm.locality.value,
      }).then((res) => {
        if (res.data.success) {
          setSuccess(true);
        } else {
          setError("Datele nu au putut fi salvate.");
        }
      });
    }
  };

  // button for buying author right was pressed
  const buyAuthor = () => {
    if (fromContext.coins < 1000) {
      alert("Nu ai destule monede!");
      return;
    }

    ajax(
      "https://infox.ro/new/new/authors/rights",
      "post",
      fromContext.jwt,
      {}
    ).then((res) => {
      setShowModal(false);
      setAuthorBought(true);
      fromContext.updateUserInfo({
        ...fromContext,
        coins: fromContext.coins - 1000,
      });
    });
  };

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
        elementConfig: { type: "password", placeholder: "Parol??" },
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
          placeholder: "Confirmare parol??",
        },
        value: "",
        validation: { required: true, minLength: 5, matchField: "password" },
        valid: false,
        touched: false,
        stylingClasses: [],
      },
      school: {
        elementType: "input",
        label: { id: "schoolId", text: "??coala" },
        elementConfig: { type: "text", placeholder: "??coala" },
        value:
          fromContext?.school === "Nu este setat?? ??coala"
            ? ""
            : fromContext?.school,
        validation: {},
        valid: true,
        touched: false,
        stylingClasses: [],
      },
      county: {
        elementType: "input",
        label: { id: "countyId", text: "Jude??" },
        elementConfig: { type: "text", placeholder: "Jude??" },
        value:
          fromContext?.county === "Seteaz?? jude??ul" ? "" : fromContext?.county,
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
          fromContext?.locality === "Seteaz?? localitatea"
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
          value="Salveaz??"
          style={!formIsValid ? { opacity: "0.6", cursor: "default" } : null}
        />
      </div>
    </form>
  );

  const toggleModal = () => {
    setShowModal(!showModal);
    setAuthorBought(false);
  };

  let becomeProposerButton = showModal ? (
    <UserModal
      text={`Dori??i s?? cump??ra??i drept de autor? 
      Prin ap??sarea butonului 'Da' ve??i deveni propun??tor de probleme.
      Acesta va costa 1000 de monede.`}
      toggleModal={toggleModal}
      choiceFromModal={buyAuthor}
    />
  ) : authorBought ? (
    <UserModal
      toggleModal={toggleModal}
      authorBought={authorBought}
      text="Felicit??ri! A??i cump??rat dreptul de autor! Pentru a avea efect, v?? rug??m s?? v?? autentifica??i din nou ??n aplica??ie."
    />
  ) : null;

  return (
    <main>
      {success ? (
        <SavedWithSuccess
          text="Datele au fost salvate cu succes."
          moveToFalse={() => setSuccess(false)}
          error={error}
        />
      ) : null}
      {becomeProposerButton}
      <div className={styles.userProfile}>
        <div className={styles.user_info_box}>
          <div className={styles.wrapperDiv}>
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
            <div className="mb-3">
              <button className={styles.buyAuthorRight} onClick={toggleModal}>
                devino propun??tor: 1000
              </button>
            </div>
          </div>
          <div className={styles.profile_editable_data}>{ownProfileForm}</div>
          <div className={styles.colorCustomization}>
            <p className={styles.colorLabel}>Culoare de fundal</p>
            <div className={styles.colorPicker}>
              <ColorPicker changeBackground={setBackgroundColor} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CurrentUserProfile;
