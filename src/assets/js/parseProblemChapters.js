const formatChapters = (chapters, year) => {
  let restructuredChapters = {};

  let currentIndex = 0;
  //position of the current chapter (the one i am working on)
  let position = 0;

  //Create structure like {class: {chapterId: [{subchapter: subchTitle, id: subchId}, {...}, {...}]}}
  console.log(chapters);
  while (position < chapters.length - 1) {
    //filter on if the current chapter is the same as the next one
    let filteredChapters = chapters.filter((chapter, index) => {
      if (chapter["chapter"] === chapters[currentIndex]["chapter"]) {
        if (index - position > 1 || index - position < -1) {
          return false;
        }
        position = index;
        return true;
      }
      return false;
    });

    //Concat '##' to a field only if it already exists
    if (
      restructuredChapters[year] !== undefined &&
      restructuredChapters[year].hasOwnProperty(filteredChapters[0].chapter)
    ) {
      restructuredChapters[year] = {
        ...restructuredChapters[year],
        [filteredChapters[0].chapter + "##"]: filteredChapters.map((subch) => {
          return { id: subch.id, subchapter: subch.subchapter };
        }),
      };
    } else
      restructuredChapters[year] = {
        ...restructuredChapters[year],
        [filteredChapters[0].chapter]: filteredChapters.map((subch) => {
          return { id: subch.id, subchapter: subch.subchapter };
        }),
      };

    currentIndex = position + 1;
  }
  return restructuredChapters;
};

export default formatChapters;
