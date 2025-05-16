/*
You can directly run the test via
yarn jest --testPathPattern=capitalize
on terminal.
*/
import { describe, expect, it } from '@jest/globals';
import { capitalize } from '@/helpers/index';

describe('Capitalize (unit)', () => {
  it('capitalizes the first letter of a lowercase word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('returns the same string if first letter is uppercase', () => {
    expect(capitalize('World')).toBe('World');
  });

  it('returns empty string when input is empty', () => {
    expect(capitalize('')).toBe('');
  });

  it('preserves the rest of the string', () => {
    expect(capitalize('hELLO')).toBe('HELLO');
  });

  it('handles single-character string', () => {
    expect(capitalize('x')).toBe('X');
  });

  it('ignores numbers or symbols at the beginning', () => {
    expect(capitalize('1hello')).toBe('1hello');
    expect(capitalize('@hello')).toBe('@hello');
  });
});
