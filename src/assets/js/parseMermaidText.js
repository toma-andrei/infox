import mermaid from "mermaid";

const graphCreator = (text) => {
  return mermaid.render("mermaid", text);
};

const parseMermaidText = (textToBeParsed) => {
  //this variable will store the pr. req. and will replace newlines with spaces
  let problem = textToBeParsed;

  //based in indexes of mermaid text, replace mermaid text with html
  let problemUntauched = textToBeParsed;

  //function for replacing text between 2 indexes
  String.prototype.replaceBetween = function (start, end, what) {
    return this.substring(0, start) + what + this.substring(end);
  };

  //replace newlines with spaces
  problem = problem.replace(/\n/g, " ");

  //get all pieces of mermaid text
  let graphString = problem.match("(```mermaid).+?(```)");

  if (graphString != null) {
    //more than one graphs
    if (Array.isArray(graphString)) {
      graphString.forEach((element) => {
        if (element.length > "```mermaid ".length) {
          //generate graph
          let mermaidGraph = graphCreator(
            element.replace(/```mermaid|```/g, "")
          );

          //replace mermaid text with html
          problemUntauched = problemUntauched.replaceBetween(
            problem.indexOf(element),
            problem.indexOf(element) + element.length,
            mermaidGraph
          );
        }
      });
    }
    //if one graph
    else {
      let mermaidGraph = graphCreator(
        graphString.replace(/```mermaid|```/g, "")
      );

      problemUntauched = problemUntauched.replaceBetween(
        problem.indexOf(graphString),
        problem.indexOf(graphString) + graphString.length,
        mermaidGraph
      );
    }
  }

  return problemUntauched;
};

export default parseMermaidText;
