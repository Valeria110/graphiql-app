import { VariableRow } from '@/types/types';

function replacePlaceholderInJson(jsonString: string, placeholder: string, replacement: string): string {
  return jsonString.replace(new RegExp(placeholder, 'g'), `"${replacement}"`);
}

export default function insertVariablesInBody(variableTable: VariableRow[], bodyText: string): string {
  let newText = bodyText;

  variableTable.map((item) => {
    newText = replacePlaceholderInJson(newText, `"__${item.variable}__"`, item.value);
  });

  return newText;
}
