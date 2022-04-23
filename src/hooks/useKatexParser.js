const useKatexParser = () => {
  const tm = require("markdown-it-texmath");
  //markdown-it-katex parser
  const md = require("markdown-it")({ html: true }).use(tm, {
    engine: require("katex"),
    delimiters: "dollars",
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
  });

  return (textToBeParsed) => {
    return md.render(textToBeParsed);
  };
};

export default useKatexParser;
