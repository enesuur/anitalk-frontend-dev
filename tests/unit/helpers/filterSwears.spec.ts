import { filterSwears } from '@/helpers/index';
jest.mock(
  '@/data/swears.json',
  () => ({
    en: ['idiot', 'stupid'],
  }),
  { virtual: true },
);

/*
You can directly run the test via
yarn jest --testPathPattern=filterSwears
on terminal.
PS: swears.json does not includes production level word resources!!.
*/

describe('FilterSwears helper function - English locale edge cases', () => {
  it('Returns false for empty string input', () => {
    expect(filterSwears('', 'en')).toBe(false);
  });

  it('Returns false for strings with only whitespace', () => {
    expect(filterSwears('   ', 'en')).toBe(false);
  });

  it('Returns false when swear words are part of other words (no false positives)', () => {
    expect(filterSwears('Assessment is important', 'en')).toBe(false);
    expect(filterSwears('You are stupidly funny', 'en')).toBe(false);
  });

  it('Returns true when swear words have punctuation attached', () => {
    expect(filterSwears('You idiot!', 'en')).toBe(true);
  });

  it('Returns false when swear words appear as part of larger words with no boundary', () => {
    expect(filterSwears('darned', 'en')).toBe(false);
  });

  it('Returns false for numbers and symbols only', () => {
    expect(filterSwears('12345', 'en')).toBe(false);
    expect(filterSwears('!@#$%', 'en')).toBe(false);
  });
});
