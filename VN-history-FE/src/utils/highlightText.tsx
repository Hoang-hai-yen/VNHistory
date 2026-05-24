
export const highlightText = (
  text: string,
  keyword: string
) => {

  if (!keyword)
    return text;

  const parts =
    text.split(
      new RegExp(
        `(${keyword})`,
        'gi'
      )
    );

  return parts.map(
    (part, index) =>

      part.toLowerCase() ===
      keyword.toLowerCase()

      ? (
          <mark
            key={index}
            className="search-highlight"
          >
            {part}
          </mark>
        )

      : part
  );

};