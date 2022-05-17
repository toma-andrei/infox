import styles from "./HelpModal.module.css";

const HelpModal = (props) => {
  let tableHeads = [{ text: "Cum scriu" }, { text: "Cum apare" }];
  let tableRows = [
    {
      text: "### Subtitlu",
      meta: 'Vor fi folosite pentru "Cerință", "Date de intrare", etc.',
    },
    {
      text: "#### Sub-subtitlu",
      meta: 'Vor fi folosite pentru "Intrare", "Ieșire", "Explicații"',
    },
    { text: "**bold**" },
    { text: "__bold__" },
    { text: "*italic*" },
    { text: "_italic_" },
    { text: "~~taiat~~" },
    { text: "> citare" },
    { text: ">> citare nivel 2" },
    { text: "---" },
    { text: "***" },
    { text: "___" },
    {
      isArray: true,
      text: ["1. item 1", "2. item 2", "3. item 3"],
    },
    {
      isArray: true,
      text: ["+ item 1", "+ item 2", "+ item 3"],
    },
    {
      text: "Inline `code`",
    },
    {
      isArray: true,
      text: [
        "    // Codul se insereaza prefixat cu 4 spatii:",
        "    linia 1 de cod",
        "    linia 2 de cod",
        "    linia 3 de cod",
      ],
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
    },
    { text: "[link](https://infox.ro)" },
    { text: "![InfoX](https://infox.ro/img/necesare/yeswecode.jpg)" },
    {
      isArray: true,
      text: [
        "Editorul de probleme suportă mermaid pentru a putea realiza diagrame sau grafuri. Iată ce generează următorul cod:",
        "",
        "```mermaid",
        "graph TD;",
        "A-->B;",
        "A-->C;",
        "B-->D;",
        "C-->D;```",
      ],
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
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                {tableHeads.map((head) => {
                  return (
                    <th>
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
                      console.log(sentence);
                      return sentence + "<br/>";
                    })
                  : row.text;

                return (
                  <tr>
                    <td dangerouslySetInnerHTML={{ __html: toShow }} />
                    <td>cum apare</td>
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
