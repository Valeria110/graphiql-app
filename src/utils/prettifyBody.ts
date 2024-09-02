export function prettifyJSON(jsonString: string, numberOfSpace: number = 2): string {
  try {
    const jsonObject = JSON.parse(jsonString);
    return JSON.stringify(jsonObject, null, numberOfSpace);
  } catch (error) {
    console.error('Invalid JSON', error);
    return jsonString;
  }
}

export function prettifyText(text: string): string {
  const trimmedText = text.trim();
  // Replaces multiple spaces on one
  const singleSpacedText = trimmedText.replace(/\s{2,}/g, ' ');

  return singleSpacedText;
}
