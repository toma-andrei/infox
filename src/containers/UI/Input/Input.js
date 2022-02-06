import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let element = null;

  const elementStylingClasses = [];

  if (props.invalid && props.shouldValidate && props.touched) {
    elementStylingClasses.push(classes.Invalid);
  } else if (!props.invalid) {
    elementStylingClasses.push(classes.Valid);
  } else {
    elementStylingClasses.push(classes.NotModified);
  }

  switch (props.elementType) {
    case "input":
      element = (
        <input
          className={elementStylingClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      element = (
        <textarea
          {...props.elementConfig}
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      element = (
        <select
          className={classes.InputElement}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      element = (
        <input
          className={elementStylingClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return element;
};

export default input;
