import styles from "./TestsComponent.module.css";
import SingleTest from "./SingleTest/SingleTest";
import { useState, useEffect } from "react";
import ProponentSource from "../ProponentSource/ProponentSource";
import Loading from "../../../../UI/Loading/Loading";

const TestsComponent = (props) => {
  //state for managing a test
  let MAX_TESTS = 100;
  const [tests, setTests] = useState([]);

  useEffect(() => {
    setTests(props.tests);
  }, [props.tests]);

  const AddSingleTest = () => {
    if (tests.length < MAX_TESTS) {
      props.addTestHandler({
        id: tests.length,
        compiled: false,
        input: "",
        output: "",
        memory: 0,
        stackMemory: 0,
        time: 0,
        score: 0,
        isExample: false,
        loading: false,
        error: "",
      });
    }
  };

  const updateInput = (id, input) => {
    props.updateTestHandler(
      tests.map((test) => {
        if (test.id === id) {
          return {
            ...test,
            input: input,
          };
        }
        return test;
      })
    );
  };

  const updateOutput = (id, output) => {
    props.updateTestHandler([
      ...tests.map((test) => {
        if (test.id === id) {
          return {
            ...test,
            output: output,
          };
        }
        return test;
      }),
    ]);
  };

  const updateScore = (id, score) => {
    props.updateTestHandler([
      ...tests.map((test) => {
        if (test.id === id) {
          return {
            ...test,
            score: score,
          };
        }
        return test;
      }),
    ]);
  };

  const updateIsExample = (id) => {
    props.updateTestHandler([
      ...tests.map((test) => {
        if (test.id === id) {
          return {
            ...test,
            isExample: !test.isExample,
          };
        }
        return test;
      }),
    ]);
  };

  const removeTest = (id) => {
    let components = tests.filter((test) => test.id !== id);

    for (let i = 0; i < components.length; i++) {
      components[i].id = i;
    }

    props.updateTestHandler([...components]);
  };

  const generateOutput = () => {
    props.compileAllTests();
  };

  const loadFile = (id, event) => {
    let fr = new FileReader();
    fr.onload = (e) => {
      props.inputFromFile(id, fr.result);
    };
    fr.readAsText(event.target.files[0]);
  };
  let testsComponents = tests.map((test) => {
    return (
      <SingleTest
        loadFile={loadFile}
        compileSingleTest={props.compileSingleTest}
        problemType={props.problemType}
        id={test.id}
        key={test.id}
        input={test.input}
        output={test.output}
        score={test.score}
        loading={test.loading}
        isExample={test.isExample}
        updateInput={(event) => updateInput(test.id, event.target.value)}
        updateOutput={(event) => updateOutput(test.id, event.target.value)}
        updateScore={(event) => updateScore(test.id, event.target.value)}
        updateIsExample={() => updateIsExample(test.id)}
        removeTest={() => removeTest(test.id)}
      />
    );
  });

  return (
    <>
      <div className={styles.testsWrapper} id="addTest">
        {testsComponents}
      </div>
      <div className={[styles.componentWrapper].join(" ")}>
        <button
          className={[styles.testComponentButton, styles.addTestButton].join(
            " "
          )}
          onClick={AddSingleTest}
        >
          <div className={styles.buttonText}>{`Adaugă test`}</div>
        </button>
        {props.currentlyCompiling ? (
          <div className={styles.loaderContainer}>
            <div className={styles.animationYellow}></div>
            <div className={styles.animationRed}></div>
            <div className={styles.animationBlue}></div>
            <div className={styles.animationViolet}></div>
          </div>
        ) : (
          <button
            className={[
              styles.testComponentButton,
              styles.generateOutputButton,
            ].join(" ")}
            onClick={generateOutput}
          >
            <div className={styles.buttonText}>
              {`Compilează codul (Se vor genera outputurile & timpul maxim pe baza
          codului sursă de mai sus și a inputurilor de aici. Obținerea outputurilor poate dura.)`}
            </div>
          </button>
        )}
      </div>
    </>
  );
};

export default TestsComponent;
