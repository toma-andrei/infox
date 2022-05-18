import mermaid from "mermaid";
const useMermaidParser = () => {
  return (textToBeParsed) => {
    return mermaid.render("mermaid", textToBeParsed);
  };
};

export default useMermaidParser;
