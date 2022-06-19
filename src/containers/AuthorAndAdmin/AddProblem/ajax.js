import ajax from "../../../assets/js/ajax";
const prepareTests = (tests, problemId) => {
  let body = { problemId: problemId, testsNumber: tests.length };
  for (let i = 0; i < tests.length; i++) {
    let testName = i < 10 ? "test0" + (i + 1) : test + i;
    body[testName + "-in"] = tests[i].input;
    body[testName + "-out"] = tests[i].output;
    body[testName + "-score"] = parseInt(tests[i].score);
    body[testName + "-example"] = tests[i].isExample;
  }
  return body;
};

//save problem data with specificId id
export const saveProblem = (
  problemId,
  problemTitle,
  problemSource,
  problemSummary,
  requirements,
  hints,
  selectedChapter,
  functionCode,
  proponentSource,
  problemType,
  timeLimit,
  memoryLimit,
  stackMemoryLimit,
  tests,
  jwt,
  labels,
  setProblemSaved,
  setLabelsSaved,
  setTestsSaved
) => {
  if (problemId) {
    if (labels.length === 0) {
      alert("Lista de etichete nu poate fi goală.");
      return;
    }
    if (tests.length <= 2) {
      alert("Trebuie să existe cel puțin 3 teste.");
      return;
    }

    if (tests.some((test) => test.score === 0)) {
      alert("Scorul unui test trebuie sa fie mai mare decât 0.");
      return;
    }

    const problem = {
      title: problemTitle,
      source: problemSource,
      abstract: problemSummary,
      full: requirements,
      tips: hints,
      subchapterId: parseInt(selectedChapter),
      proposerCode: problemType === "function" ? functionCode : proponentSource,
      type: problemType,
      functionTemplate: proponentSource,
      checkOutput: "",
      timeLimit: parseInt(timeLimit),
      memoryLimit: parseInt(memoryLimit),
      stackMemoryLimit: parseInt(stackMemoryLimit),
    };

    let testsModified = {};
    for (let i = 0; i < tests.length; i++) {
      let testName = i < 10 ? "test0" + i : "test" + i;
      testsModified[testName + "-in"] = tests[i].input;
      testsModified[testName + "-score"] = parseInt(tests[i].score);
      testsModified[testName + "-example"] = tests[i].isExample;
      testsModified[testName + "-out"] = tests[i].output;
    }

    ajax(
      "https://infox.ro/new/new/authors/problem/" + problemId,
      "post",
      jwt,
      problem
    ).then((res) => {
      if (res.data.success) {
        setProblemSaved(true);
      } else {
        alert(
          "A apărut o eroare la salvarea problemei. Asigurați-vă ca ați făcut cel puțin o modificare în datele problemei."
        );
        setProblemSaved(false);
        return;
      }
    });

    let constLabels = [];
    for (let i = 0; i < labels.selectedLabels.length; i++) {
      constLabels.push(parseInt(labels.selectedLabels[i]));
    }

    ajax("https://infox.ro/new/new/authors/labels/problem", "post", jwt, {
      problemId: problemId,
      labels: constLabels,
    }).then((res) => {
      if (res.data.success) {
        setLabelsSaved(true);
      } else {
        alert("Lista de etichete nu poate fi goală.");
        setLabelsSaved(false);
      }
    });

    ajax(
      "https://infox.ro/new/new/authors/tests/problem",
      "post",
      jwt,
      prepareTests(tests, problemId)
    ).then((res) => {
      if (res.data.success) {
        setTestsSaved(true);
      } else {
        setTestsSaved(false);
      }
    });
  } else {
    saveProblemWithoutId(
      problemTitle,
      problemSource,
      problemSummary,
      requirements,
      hints,
      selectedChapter,
      functionCode,
      proponentSource,
      problemType,
      timeLimit,
      memoryLimit,
      stackMemoryLimit,
      tests,
      jwt,
      labels,
      setProblemSaved,
      setLabelsSaved,
      setTestsSaved
    );
  }
};

//if problem does not have an ID, first is created the id then
//the problem is saved
const saveProblemWithoutId = (
  problemTitle,
  problemSource,
  problemSummary,
  requirements,
  hints,
  selectedChapter,
  functionCode,
  proponentSource,
  problemType,
  timeLimit,
  memoryLimit,
  stackMemoryLimit,
  tests,
  jwt,
  labels,
  setProblemSaved,
  setLabelsSaved,
  setTestsSaved
) => {
  //create problem id
  ajax("https://infox.ro/new/new/authors/problem", "post", jwt, {}).then(
    (res) => {
      let problemId = res.data.problemId;
      const problem = {
        title: problemTitle,
        source: problemSource,
        abstract: problemSummary,
        full: requirements,
        tips: hints,
        subchapterId: parseInt(selectedChapter),
        proposerCode:
          problemType === "function" ? functionCode : proponentSource,
        type: problemType,
        functionTemplate: proponentSource,
        checkOutput: "",
        timeLimit: parseInt(timeLimit),
        memoryLimit: parseInt(memoryLimit),
        stackMemoryLimit: parseInt(stackMemoryLimit),
      };

      let testsModified = {};
      for (let i = 0; i < tests.length; i++) {
        let testName = i < 10 ? "test0" + i : "test" + i;
        testsModified[testName + "-in"] = tests[i].input;
        testsModified[testName + "-score"] = parseInt(tests[i].score);
        testsModified[testName + "-example"] = tests[i].isExample;
        testsModified[testName + "-out"] = tests[i].output;
      }

      // save problem data
      ajax(
        "https://infox.ro/new/new/authors/problem/" + problemId,
        "post",
        jwt,
        problem
      ).then((res) => {
        if (res.data.statusCode === 200) {
          setProblemSaved(true);
        } else {
          setProblemSaved(false);
        }
      });

      let constLabels = [];
      for (let i = 0; i < labels.selectedLabels.length; i++) {
        constLabels.push(parseInt(labels.selectedLabels[i]));
      }

      // save labels data
      ajax("https://infox.ro/new/new/authors/labels/problem", "post", jwt, {
        problemId: problemId,
        labels: constLabels,
      }).then((res) => {
        if (res.data.statusCode === 200) {
          setLabelsSaved(true);
        } else {
          setLabelsSaved(false);
        }
      });

      // save tests data
      ajax(
        "https://infox.ro/new/new/authors/tests/problem",
        "post",
        jwt,
        prepareTests(tests, problemId)
      ).then((res) => {
        if (res.data.statusCode === 200) {
          setTestsSaved(true);
        } else {
          setTestsSaved(false);
        }
      });
    }
  );
};
