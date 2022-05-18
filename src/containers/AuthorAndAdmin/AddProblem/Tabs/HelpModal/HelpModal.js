import styles from "./HelpModal.module.css";
import useKatexParser from "../../../../../hooks/useKatexParser";
import useMermaidParser from "../../../../../hooks/useMermaidParser";
import mermaid from "mermaid";
const HelpModal = (props) => {
  let tableHeads = [{ text: "Cum scriu" }, { text: "Cum apare" }];
  let parser = useKatexParser();
  let mermaidParser = useMermaidParser();
  let tableRows = [
    {
      text: "### Subtitlu",
      meta: 'Vor fi folosite pentru "Cerință", "Date de intrare", etc.',
      show: parser("### Subtitlu"),
    },
    {
      text: "#### Sub-subtitlu",
      meta: 'Vor fi folosite pentru "Intrare", "Ieșire", "Explicații"',
      show: parser("#### Sub-subtitlu"),
    },
    { text: "**bold**", meta: "", show: parser("**bold**") },
    { text: "__bold__", meta: "", show: parser("__bold__") },
    { text: "*italic*", meta: "", show: parser("*italic*") },
    { text: "_italic_", meta: "", show: parser("_italic_") },
    { text: "~~taiat~~", meta: "", show: parser("~~taiat~~") },
    { text: "> citare", meta: "", show: parser("> citare") },
    {
      text: ">> citare nivel 2",
      meta: "",
      show: parser(">> citare nivel 2"),
    },
    { text: "---", meta: "", show: parser("---") },
    { text: "***", meta: "", show: parser("***") },
    { text: "___", meta: "", show: parser("___") },
    {
      isArray: true,
      text: ["1. item 1", "2. item 2", "3. item 3"],
      show: parser("1. item 1\n2. item 2\n3. item 3"),
    },
    {
      isArray: true,
      text: ["+ item 1", "+ item 2", "+ item 3"],
      show: parser("+ item 1\n+ item 2\n+ item 3"),
    },
    {
      text: "Inline `code`",
      meta: "",
      show: parser("Inline `code`"),
    },
    {
      isArray: true,
      text: [
        "&nbsp&nbsp&nbsp&nbsp// Codul se insereaza prefixat cu 4 spatii:",
        "&nbsp&nbsp&nbsp&nbsplinia 1 de cod",
        "&nbsp&nbsp&nbsp&nbsplinia 2 de cod",
        "&nbsp&nbsp&nbsp&nbsplinia 3 de cod",
      ],
      show: parser(
        "    // Codul se insereaza prefixat cu 4 spatii:\n    linia 1 de cod\n    linia 2 de cod\n    linia 3 de cod"
      ),
    },
    {
      isArray: true,
      text: [
        "```c++",
        "for(int i = 10; i>0; i--) {",
        "cout << i;",
        "};",
        'cout << "gata";',
        "```",
      ],
      show: parser(
        '```c++\nfor(int i = 10; i>0; i--) { \ncout << i; \n}; \ncout << "gata"; \n```'
      ),
    },
    {
      text: "[link](https://infox.ro)",
      meta: "",
      show: parser("[link](https://infox.ro)"),
    },
    {
      text: "![InfoX](https://infox.ro/img/necesare/yeswecode.jpg)",
      meta: "",
      show: parser("![InfoX](https://infox.ro/img/necesare/yeswecode.jpg)"),
    },
    {
      isArray: true,
      text: [
        "Editorul de probleme suportă <a href='https://mermaid-js.github.io/mermaid/#/' target='_blank'>mermaid</a> pentru a putea realiza diagrame sau grafuri. Iată ce generează următorul cod:",
        "",
        "```mermaid",
        "graph TD;",
        "A-->B;",
        "A-->C;",
        "B-->D;",
        "C-->D;```",
      ],
      show: mermaidParser("\ngraph TD;\nA-->B;\nA-->C;\nB-->D;\nC-->D;"),
    },
  ];
  return (
    <div className={styles.background} onClick={props.toggleModal}>
      <div
        className={styles.modal}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <span className={styles.closeModal} onClick={props.toggleModal}>
          ✖
        </span>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {tableHeads.map((head) => {
                  return (
                    <th key={head.text + Math.random()}>
                      <h4>{head.text}</h4>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => {
                let toShow = row.isArray
                  ? row.text.map((sentence) => {
                      return (sentence + "<br/>").replace(",", "    ");
                    })
                  : [row.text];
                return (
                  <tr key={row.text + Math.random()}>
                    <td dangerouslySetInnerHTML={{ __html: toShow.join("") }} />
                    <td
                      dangerouslySetInnerHTML={{
                        __html: row.show,
                      }}
                    ></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
