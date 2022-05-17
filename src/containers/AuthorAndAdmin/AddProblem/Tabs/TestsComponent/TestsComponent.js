import styles from "./TestsComponent.module.css";
import SingleTest from "./SingleTest/SingleTest";
import { useState } from "react";

const TestsComponent = () => {
  //state for manageing a test
  let MAX_TESTS = 100;
  const [tests, setTests] = useState({ components: [] });

  const AddSingleTest = () => {
    if (tests.components.length < MAX_TESTS) {
      setTests({
        components: [
          ...tests.components,
          {
            id: tests.components.length,
            input: "",
            output: "",
            score: -1,
            isExemple: false,
          },
        ],
      });
    }
  };

  const updateInput = (id, input) => {
    setTests({
      components: tests.components.map((test) => {
        if (test.id === id) {
          return {
            ...test,
            input,
          };
        }
        return test;
      }),
    });
  };

  const updateOutput = (id, output) => {
    setTests({
      components: tests.components.map((test) => {
        if (test.id === id) {
          return {
            ...test,
            output: output,
          };
        }
        return test;
      }),
    });
  };

  const updateScore = (id, score) => {
    setTests({
      components: tests.components.map((test) => {
        if (test.id === id) {
          return {
            ...test,
            score: score,
          };
        }
        return test;
      }),
    });
  };

  const updateIsExemple = (id) => {
    setTests({
      components: tests.components.map((test) => {
        if (test.id === id) {
          return {
            ...test,
            isExemple: !test.isExemple,
          };
        }
        return test;
      }),
    });
  };

  const removeTest = (id) => {
    let components = tests.components.filter((test) => test.id !== id);
    components.forEach((test, index) => {
      test.id = index;
    });

    setTests({
      components: components,
    });
  };

  const generateOutput = () => {
    console.log("generate output");
  };

  let testsComponents = tests.components.map((test) => {
    return (
      <SingleTest
        id={test.id}
        key={test.id}
        input={test.input}
        output={test.output}
        score={test.score}
        isExemple={test.isExemple}
        updateInput={(event) => updateInput(test.id, event.target.value)}
        updateOutput={(event) => updateOutput(test.id, event.target.value)}
        updateScore={(event) => updateScore(test.id, event.target.value)}
        updateIsExemple={() => updateIsExemple(test.id)}
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
        <button
          className={[
            styles.testComponentButton,
            styles.generateOutputButton,
          ].join(" ")}
          onClick={generateOutput}
        >
          <div className={styles.buttonText}>
            {`Generează output (Se vor genera outputurile & timpul maxim pe baza
          codului sursă de mai sus și a inputurilor de aici. Obținerea outputurilor poate dura.)`}
          </div>
        </button>
      </div>
    </>
  );
};

export default TestsComponent;
