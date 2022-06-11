import keyboard from "../../../../../assets/img/addProblemsImages/keyboard.png";
import file from "../../../../../assets/img/addProblemsImages/paper.png";
import checked from "../../../../../assets/img/addProblemsImages/check.png";
import styles from "./InputAndOutputType.module.css";
import { useState } from "react";
import TextToShow from "../TextToShow/TextToShow";
import { useEffect } from "react";

const InputAndOutputType = (props) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log("inputType", props.inputType);
    setImages(
      images.map((image) => {
        if (image.type === props.inputType) {
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
  }, [props.inputType]);

  const selectType = (inputType) => {
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
    </div>
  );
};

export default InputAndOutputType;
