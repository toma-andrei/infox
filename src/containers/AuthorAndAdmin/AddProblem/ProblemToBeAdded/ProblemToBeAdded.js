import HRsAndTitles from "../HRsAndTitles/HRsAndTitles";
import ProblemSummary from "../Tabs/ProblemSummary/ProblemSummary";
import Hints from "../Tabs/Hints/Hints";
import SettingsComponent from "../Tabs/SettingsComponent/SettingsComponent";
import ProponentSource from "../Tabs/ProponentSource/ProponentSource";
import RequirementsAndPreview from "../Tabs/RequirementsAndPreview/RequirementsAndPreview";
import Labels from "../Tabs/Labels/Labels";
import TestsComponent from "../Tabs/TestsComponent/TestsComponent";
import FunctionAndProgramSources from "../Tabs/TabsForFunctionType/FunctionAndProgramSources/FunctionAndProgramSources";
import MultipleOutput from "../Tabs/TabsForFunctionType/MultipleOutput/MultipleOutput";
const ProblemToBeAdded = (props) => {
  return (
    <>
      <HRsAndTitles title={"Rezumatul problemei"} />
      <ProblemSummary
        states={{
          chapters: props.chapters,
          selectedChapter: props.selectedChapter,
          setChapters: props.chapterSummarySelectedHandler,
          problemSummary: props.problemSummary,
          setProblemSummary: props.textareaSummaryValueModifiedHandler,
          problemTitle: props.problemTitle,
          setProblemTitle: props.titleSummaryValueModifiedHandler,
          problemSource: props.problemSource,
          setProblemSource: props.sourceSummaryInputModifiedHandler,
        }}
      />

      <HRsAndTitles title={"Cerința și previzualizare"} />
      <RequirementsAndPreview
        req={{
          requirements: props.requirements,
          modifiedHandler: props.textareaPreviewValueModifiedHandler,
        }}
      />
      <HRsAndTitles title={"Etichete"} />
      <Labels
        labelsModifiedHandler={props.labelsModifiedHandler}
        selectedLabels={props.labels.selectedLabels}
        customLabel={props.labels.customLabel}
        changeCustomLabel={props.customLabelModifiedHandler}
      />
      <HRsAndTitles title={"Indicații"} />
      <Hints
        hints={props.hints}
        hintsModifiedHandler={props.hintsModifiedHandler}
      />
      <HRsAndTitles title={"Sursa propunătorului"} />
      {props.problemType === "function" ? (
        <FunctionAndProgramSources
          source={props.source}
          sourceModifiedHandler={props.sourceModifiedHandler}
          functionCode={props.functionCode}
          setFunctionCode={props.functionCodeModifiedHandler}
        />
      ) : props.problemType === "check_solution" ? (
        <MultipleOutput
          source={props.proponentSource}
          sourceModifiedHandler={props.sourceModifiedHandler}
          verificationCode={props.verificationCode}
          verificationCodeModified={props.verificationCodeModified}
        />
      ) : (
        <ProponentSource
          source={props.proponentSource}
          sourceModifiedHandler={props.sourceModifiedHandler}
        />
      )}

      <HRsAndTitles title={"Teste"} />
      <TestsComponent
        inputType={props.inputType}
        tests={props.tests}
        addTestHandler={props.addTestHandler}
        compileSingleTest={props.compileSingleTest}
        compileAllTests={props.compileAllTests}
        updateTestHandler={props.updateTestHandler}
      />

      <HRsAndTitles title={"Setări"} />
      <SettingsComponent
        timeLimit={props.timeLimit}
        modifiedTimeLimit={props.timeLimitModifiedHandler}
        memoryLimit={props.memoryLimit}
        modifiedMemoryLimit={props.memoryLimitModifiedHandler}
        stackMemoryLimit={props.stackMemoryLimit}
        modifiedStackMemoryLimit={props.stackMemoryLimitModifiedHandler}
      />
    </>
  );
};

export default ProblemToBeAdded;
