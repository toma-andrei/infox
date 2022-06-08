import output from "../../../../../assets/img/addProblemsImages/output.png";
import functionImage from "../../../../../assets/img/addProblemsImages/function.png";
import checked from "../../../../../assets/img/addProblemsImages/check.png";
import styles from "./TypeOfProblem.module.css";
import { useState } from "react";
import TextToShow from "../TextToShow/TextToShow";

// upper component in addProblem page which allows author to choose type of problem to be added
const TypeOfProblem = (props) => {
  const [images, setImages] = useState([
    {
      image: functionImage,
      figureCaption: "Funcție",
      id: 3,
      selected: false,
      type: "function",
    },
    {
      image: output,
      figureCaption: "Output multiplu",
      id: 3,
      selected: false,
      type: "multipleOutput",
    },
  ]);

  const selectType = (problemType) => {
    for (let i = 0; i < images.length; i++) {
      if (images[i].type === problemType) {
        images[i].selected = true;
      } else {
        images[i].selected = false;
      }
    }

    props.changed(problemType);
  };

  return (
    <div>
      <div className={styles.imageContainer}>
        {images.map((image) => {
          const imageStyleClasses = [styles.imageStyle];
          if (image.selected) {
            imageStyleClasses.push(styles.selected);
          }

          return (
            <div className={styles.imageWrapper} key={image.id}>
              <figure className={styles.figureStyle}>
                {image.selected ? (
                  <img src={checked} className={styles.checkedSymbol} />
                ) : null}
                <img
                  src={image.image}
                  className={imageStyleClasses.join(" ")}
                  onClick={() => selectType(image.type)}
                />
                <figcaption className={styles.figureCaption}>
                  {image.figureCaption}
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
      {props.problemType === "multipleOutput" ? (
        <TextToShow text="Dacă există mai multe output-uri posibile pentru același input, autorul problemei va crea un program de verificare al corectitudinii rezultatelor." />
      ) : props.problemType === "function" ? (
        <TextToShow
          text={`Problemă de creat subprograme. 
                  Locul în care va fi inserată funcția se evidențiază prin șirul 
                  <strong><i>&amp;&amp;===&amp;&amp;</i></strong>.`}
        />
      ) : (
        <TextToShow text="" />
      )}
    </div>
  );
};

export default TypeOfProblem;
