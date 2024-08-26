export function prettifyGraphQL(query: string) {
  const indentSize = 2;
  const TAB_SPACING = ' '.repeat(indentSize);
  const commentPattern = /\/\/.*(\n|$)/gm;
  const propertyPattern = /\b[\s\n]+\b/g;
  const closingBracePattern = /\b[\s\n]+}/g;
  const whitespacePattern = /[\s\n]/g;
  let formattedCode = '';
  let indentation = '';

  const queryInOneLine = query
    .split('/n')
    .map((line) => line.trim())
    .join('')
    .replaceAll(commentPattern, '')
    .replaceAll(propertyPattern, ',')
    .replaceAll(closingBracePattern, ',}')
    .replaceAll(whitespacePattern, '');

  for (let i = 0; i < queryInOneLine.length; i += 1) {
    if (queryInOneLine[i] === '{') {
      formattedCode += '{\n';
      indentation += TAB_SPACING;
      formattedCode += indentation;
      continue;
    }
    if (queryInOneLine[i] === '}') {
      indentation = indentation.slice(0, -2);
      formattedCode = formattedCode.trimEnd();
      formattedCode += `\n${indentation}}\n`;
      continue;
    }
    if (queryInOneLine[i] === ',') {
      formattedCode += `\n${indentation}`;
      continue;
    }

    formattedCode += queryInOneLine[i];
  }

  return formattedCode.trim();
}

export const formatToBase64 = (str: string): string => {
  return btoa(str);
};
