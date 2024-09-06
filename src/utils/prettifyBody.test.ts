import { describe, expect, it } from 'vitest';
import { prettifyJSON, prettifyText } from './prettifyBody';

describe('prettifyJSON', () => {
  it('should prettify valid JSON', () => {
    const jsonStr = '{"name": "John Doe", "age": 30}';
    const expected = '{\n  "name": "John Doe",\n  "age": 30\n}';

    const result = prettifyJSON(jsonStr);
    expect(result).toEqual(expected);
  });

  it('should handle invalid JSON', () => {
    const jsonStr = '{invalid JSON}';
    const expected = '{invalid JSON}';

    const result = prettifyJSON(jsonStr);
    expect(result).toEqual(expected);
  });

  it('should accept custom number of spaces', () => {
    const jsonStr = '{"name": "John Doe", "age": 30}';
    const expected = '{\n   "name": "John Doe",\n   "age": 30\n}';

    const result = prettifyJSON(jsonStr, 3);
    expect(result).toEqual(expected);
  });
});

describe('prettifyText', () => {
  it('should trim and replace multiple spaces with single space', () => {
    const text = '  This   is   a   test  ';
    const expected = 'This is a test';

    const result = prettifyText(text);
    expect(result).toEqual(expected);
  });

  it('should return empty string for empty input', () => {
    const text = '';
    const expected = '';

    const result = prettifyText(text);
    expect(result).toEqual(expected);
  });

  it('should handle text with leading and trailing spaces', () => {
    const text = '  This is a test  ';
    const expected = 'This is a test';

    const result = prettifyText(text);
    expect(result).toEqual(expected);
  });
});
