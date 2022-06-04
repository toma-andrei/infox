import keyboard from "../../../../../assets/img/addProblemsImages/keyboard.png";
import file from "../../../../../assets/img/addProblemsImages/paper.png";
import functionImage from "../../../../../assets/img/addProblemsImages/function.png";
import checked from "../../../../../assets/img/addProblemsImages/check.png";
import styles from "./TypeOfProblem.module.css";
import { useState } from "react";

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
  );
};

export default TypeOfProblem;
