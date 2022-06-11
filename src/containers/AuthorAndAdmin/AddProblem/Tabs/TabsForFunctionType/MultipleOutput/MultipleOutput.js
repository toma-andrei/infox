import styles from "./MultipleOutput.module.css";

const MultipleOutput = (props) => {
  return (
    <>
      <label
        className={"col-sm-2 col-form-label " + styles.changeLabel}
        htmlFor="sourceCode"
      >
        Sursa oficială a problemei:
      </label>
      <div className={styles.ReqAndPrevDiv}>
        <textarea
          placeholder="Aici se introduce sursa oficială, care va fi folosită la generarea testelor"
          id="sourceCode"
          onChange={props.sourceModifiedHandler}
          className={styles.sourceCodeStyle}
          value={props.source}
        ></textarea>
      </div>
      <label
        className={"col-sm-2 col-form-label " + styles.changeLabel}
        htmlFor="sourceCode"
      >
        <strong>Programul de verificare:</strong>
        <br />
        Valorile ce trebuie verificare vor fi citite de la tastatură, similar cu
        urmatorul cod:
        <hr style={{ width: "40%" }} />
        <pre>{`  #include<iostream>
  #include<cstring>
  using namespace std;
  
  int main()
  {
      char userOuput[255], correctOutput[255];
      cin>>userOuput>>correctOutput;
      if(strlen(userOuput) == strlen(correctOutput))
      return 1;
      return 0;
    }`}</pre>
        <hr style={{ width: "40%" }} />
      </label>
      <div className={styles.ReqAndPrevDiv}>
        <textarea
          placeholder="Aici se va introduce programul de verificare, cel care va verifica corectitudinea datelor de ieșire ale utilizatorului."
          id="sourceCode"
          onChange={props.verificationCodeModified}
          className={styles.sourceCodeStyle}
          value={props.verificationCode}
        ></textarea>
      </div>
    </>
  );
};

export default MultipleOutput;
