import keyboard from "../../../../../assets/img/addProblemsImages/keyboard.png";
import file from "../../../../../assets/img/addProblemsImages/paper.png";
import checked from "../../../../../assets/img/addProblemsImages/check.png";
import styles from "./InputAndOutputType.module.css";
import { useState } from "react";
import TextToShow from "../TextToShow/TextToShow";

const InputAndOutputType = (props) => {
  const [images, setImages] = useState([
    {
      image: keyboard,
      figureCaption: "Citire și scriere din consolă",
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
  ]);

  const selectType = (inputType) => {
    for (let i = 0; i < images.length; i++) {
      if (images[i].type === inputType) {
        images[i].selected = true;
      } else {
        images[i].selected = false;
      }
    }

    props.changed(inputType);
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
      {props.inputType === "keyboardInput" ? (
        <TextToShow text="Datele de intrare vor fi citite de la consolă respectiv datele de ieșire vor fi afișate la consolă." />
      ) : props.inputType === "fileInput" ? (
        <TextToShow
          text={`Datele de intrare vor fi citite din fișierul 
                      <strong><i>data.in</i></strong> iar datele
                      de ieșire vor fi scrise în fișierul <strong><i>data.out</i></strong>.`}
        />
      ) : null}
    </div>
  );
};

export default InputAndOutputType;
