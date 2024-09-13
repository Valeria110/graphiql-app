import { describe, it, expect } from 'vitest';
import insertVariablesInBody from './insertVariablesInBody';
import { VariableRow } from '@/types/types';

describe('insertVariablesInBody', () => {
  it('should replace placeholders in the body text with corresponding values from variable table', () => {
    const variableTable = [
      { variable: 'PLACEHOLDER1', value: 'value1' },
      { variable: 'PLACEHOLDER2', value: 'value2' },
    ];
    const bodyText = '{"key1": "__PLACEHOLDER1__", "key2": "__PLACEHOLDER2__"}';

    const result = insertVariablesInBody(variableTable, bodyText);
    expect(result).toBe('{"key1": "value1", "key2": "value2"}');
  });

  it('should handle empty variable table', () => {
    const variableTable: VariableRow[] = [];
    const bodyText = '{"key": "__PLACEHOLDER__"}';

    const result = insertVariablesInBody(variableTable, bodyText);
    expect(result).toBe('{"key": "__PLACEHOLDER__"}');
  });

  it('should not replace placeholders if they are not in the variable table', () => {
    const variableTable = [{ variable: 'OTHER_PLACEHOLDER', value: 'value' }];
    const bodyText = '{"key": "__PLACEHOLDER__"}';

    const result = insertVariablesInBody(variableTable, bodyText);
    expect(result).toBe('{"key": "__PLACEHOLDER__"}');
  });

  it('should handle body text with no placeholders', () => {
    const variableTable = [{ variable: 'PLACEHOLDER', value: 'value' }];
    const bodyText = '{"key": "value"}';

    const result = insertVariablesInBody(variableTable, bodyText);
    expect(result).toBe('{"key": "value"}');
  });
});
