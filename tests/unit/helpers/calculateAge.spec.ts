/*
You can directly run the test via
yarn jest --testPathPattern=calculateAge
on terminal.
*/
import { describe, expect, it } from '@jest/globals';
import { calculateAge } from '@/helpers/index';

describe('CalculateAge helper function', () => {
  it('Returns 0 for a birthdate in the future', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    expect(calculateAge(futureDate)).toBe(0);
  });

  it('Calculates correct age when birthday has passed this year', () => {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 25);
    pastDate.setMonth(pastDate.getMonth() - 1);
    expect(calculateAge(pastDate)).toBe(25);
  });

  it('Calculates correct age when birthday is today', () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 30);
    expect(calculateAge(today)).toBe(30);
  });

  it('Calculates correct age when birthday is later this year', () => {
    const laterThisYear = new Date();
    laterThisYear.setFullYear(laterThisYear.getFullYear() - 20);
    laterThisYear.setMonth(laterThisYear.getMonth() + 1);
    expect(calculateAge(laterThisYear)).toBe(19);
  });

  it('Calculates age correctly at year boundary', () => {
    const dec31LastYear = new Date();
    dec31LastYear.setFullYear(dec31LastYear.getFullYear() - 1);
    dec31LastYear.setMonth(11);
    dec31LastYear.setDate(31);
    const currentDate = new Date();
    const expectedAge =
      currentDate.getFullYear() -
      dec31LastYear.getFullYear() -
      (currentDate.getMonth() < 11 || (currentDate.getMonth() === 11 && currentDate.getDate() < 31)
        ? 1
        : 0);
    expect(calculateAge(dec31LastYear)).toBe(expectedAge);
  });
});
