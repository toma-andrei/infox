import styles from "./ColorPicker.module.css";
const ColorPicker = (props) => {
  return (
    <input
      type="color"
      className={styles.styleColorPicker}
      onChange={(event) => props.changeBackground(event.target.value)}
    ></input>
  );
};

export default ColorPicker;
