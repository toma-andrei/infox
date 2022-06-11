import output from "../../../../../assets/img/addProblemsImages/output.png";
import functionImage from "../../../../../assets/img/addProblemsImages/function.png";
import keyboard from "../../../../../assets/img/addProblemsImages/keyboard.png";
import file from "../../../../../assets/img/addProblemsImages/paper.png";
import checked from "../../../../../assets/img/addProblemsImages/check.png";
import styles from "./TypeOfProblem.module.css";
import { useState, useEffect } from "react";
import TextToShow from "../TextToShow/TextToShow";

// upper component in addProblem page which allows author to choose type of problem to be added
const TypeOfProblem = (props) => {
  const [images, setImages] = useState([
    {
      image: keyboard,
      figureCaption: "Citire și scriere din consolă",
      id: 1,
      selected: props.problemType === "console_io",
      type: "console_io",
      text: "Datele de intrare vor fi citite și scrise la consolă.",
    },
    {
      image: file,
      figureCaption: "Citire și scriere din fișier",
      id: 2,
      selected: props.problemType === "file_io",
      type: "file_io",
      text: `Datele de intrare vor fi citite din fișierul 
      <strong><i>data.in</i></strong> iar datele
      de ieșire vor fi scrise în fișierul <strong><i>data.out</i></strong>.`,
    },

    {
      image: functionImage,
      figureCaption: "Funcție",
      id: 5,
      selected: props.problemType === "function",
      type: "function",
      text: `Problemă de creat subprograme. 
      Locul în care va fi inserată funcția se evidențiază prin șirul 
      <strong><i>&amp;&amp;===&amp;&amp;</i></strong>.`,
    },
    {
      image: output,
      figureCaption: "Output multiplu",
      id: 6,
      selected: props.problemType === "check_solution",
      type: "check_solution",
      text: "Dacă există mai multe output-uri corecte pentru același input, autorul problemei va crea un program de verificare al corectitudinii rezultatelor.",
    },
  ]);

  useEffect(() => {
    setImages(
      images.map((image) => {
        if (image.type === props.problemType) {
          return {
            ...image,
            selected: true,
          };
        }
        return {
          ...image,
          selected: false,
        };
      })
    );
  }, [props.problemType]);

  const selectType = (problemType) => {
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
      {props.problemType === images[0].type ? (
        <TextToShow text={images[0].text} />
      ) : props.problemType === images[1].type ? (
        <TextToShow text={images[1].text} />
      ) : props.problemType === images[2].type ? (
        <TextToShow text={images[2].text} />
      ) : (
        <TextToShow text={images[3].text} />
      )}
    </div>
  );
};

export default TypeOfProblem;
