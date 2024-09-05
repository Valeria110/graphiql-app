import { VariableRow } from '@/types/types';

function replacePlaceholderInJson(jsonString: string, placeholder: string, replacement: string): string {
  const saveReplacement = JSON.stringify(replacement).slice(1, -1);
  return jsonString.replace(new RegExp(placeholder, 'g'), `"${saveReplacement}"`);
}

export default function insertVariablesInBody(variableTable: VariableRow[], bodyText: string): string {
  let newText = bodyText;

  variableTable.map((item) => {
    newText = replacePlaceholderInJson(newText, `"__${item.variable}__"`, item.value);
  });

  return newText;
}
