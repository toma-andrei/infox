const tm = require("markdown-it-texmath");
const md = require("markdown-it")({ html: true }).use(tm, {
  engine: require("katex"),
  delimiters: "dollars",
  katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
});
/*
const addH3 = (text) => {
  return "<h3>" + text + "</h3>";
};

const addH4 = (text) => {
  return "<h4>" + text + "</h4>";
};

const addLi = (text) => {
  return "<li>" + text + "</li>";
};

const addHr = () => {
  return "<hr />";
};

const addP = (text) => {
  return "<p>" + text + "</p>";
};
*/

const parseProblemRequirements = (problem) => {
  return md.render(problem);
  /*
  let data = [];
  const H2Delimiter = "### ";
  const H4Delimiter = "#### ";
  const LiDelimiter = "- ";
  const BrDelimiter = "---";
  const LetterDelimiter = "/[a-zA-Z]/";
  const CodeDelimiter = "    ";
*/
  //split problem into array of strings (manual text parsing)
  /*
  data = problem.split("\n");
  //remove empty elements
  data = data.filter((item) => item !== "");
  for (let i = 0; i < data.length; i++) {
    if (data[i].startsWith(H2Delimiter)) {
      data[i] = data[i].replace(H2Delimiter, "");
      data[i] = addH3(data[i]);
    } else if (data[i].startsWith(H4Delimiter)) {
      data[i] = data[i].replace(H4Delimiter, "");
      data[i] = addH4(data[i]);
    } else if (data[i].startsWith(LiDelimiter)) {
      data[i] = data[i].replace(LiDelimiter, "");
      data[i] = addLi(data[i]);
    } else if (data[i].startsWith(BrDelimiter)) {
      data[i] = addHr();
    } else if (data[i].startsWith(LetterDelimiter)) {
      data[i] = addP(data[i]);
    } else if (data[i].startsWith(CodeDelimiter)) {
    }
  }
  */
};

export default parseProblemRequirements;
