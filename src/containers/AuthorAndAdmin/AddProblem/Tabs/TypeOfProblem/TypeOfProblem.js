import keyboard from "../../../../../assets/img/addProblemsImages/keyboard.png";
import file from "../../../../../assets/img/addProblemsImages/paper.png";
import functionImage from "../../../../../assets/img/addProblemsImages/function.png";
import checked from "../../../../../assets/img/addProblemsImages/check.png";
import styles from "./TypeOfProblem.module.css";
import { useState } from "react";
import TextToShow from "./TextToShow";

// upper component in addProblem page which allows author to choose type of problem to be added
const TypeOfProblem = (props) => {
  const [images, setImages] = useState([
    {
      image: keyboard,
      figureCaption: "Citire de la tastatură",
      id: 1,
      selected: true,
      type: "keyboardInput",
    },
    {
      image: file,
      figureCaption: "Citire și scriere din fișier",
      id: 2,
      selected: false,
      type: "fileInput",
    },
    {
      image: functionImage,
      figureCaption: "Funcție",
      id: 3,
      selected: false,
      type: "function",
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
      {props.problemType === images[0].type ? (
        <TextToShow text="Datele de intrare vor fi citite de la consolă respectiv datele de ieșire vor fi afișate la consolă." />
      ) : props.problemType === images[1].type ? (
        <TextToShow
          text={`Datele de intrare vor fi citite din fișierul 
                  <strong><i>data.in</i></strong> iar datele
                  de ieșire vor fi scrise în fișierul <strong><i>data.out</i></strong>.`}
        />
      ) : (
        <TextToShow text="Problemă de creat subprograme. Locul în care va fi inserată funcția se evidențiază prin șirul <strong><i>&amp;&amp;===&amp;&amp;</i></strong>." />
      )}
    </div>
  );
};

export default TypeOfProblem;
