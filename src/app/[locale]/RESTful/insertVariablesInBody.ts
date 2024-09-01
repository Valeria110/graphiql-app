import { VariableRow } from '@/types/types';
// TODO: boolean, object, inserted object

function replacePlaceholderInJson(jsonString: string, placeholder: string, replacement: number | string): string {
  if (typeof replacement === 'number') {
    return jsonString.replace(new RegExp(placeholder, 'g'), replacement.toString());
  } else {
    return jsonString.replace(new RegExp(placeholder, 'g'), `${replacement}`);
  }
}

export default function insertVariablesInBody(variableTable: VariableRow[], bodyText: string): string {
  let newText = bodyText;

  variableTable.map((item) => {
    newText = replacePlaceholderInJson(newText, `"__${item.variable}__"`, item.value);
  });

  return newText;
}
