export default function prettifyJSON(jsonString: string, numberOfSpace: number = 2): string {
  try {
    const jsonObject = JSON.parse(jsonString);
    return JSON.stringify(jsonObject, null, numberOfSpace);
  } catch (error) {
    console.error('Invalid JSON', error);
    return jsonString;
  }
}
