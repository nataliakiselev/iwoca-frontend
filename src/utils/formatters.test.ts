import { describe, it, expect } from 'vitest';
import {formatDate, formatCurrencyGBP} from './formatters'

describe('formatDate', () => {
  it('formats dates as DD Mon YYYY', () => {
    expect(formatDate('2021-06-11')).toBe('11 Jun 2021');
    expect(formatDate('2024-10-01')).toBe('01 Oct 2024');
  });
});

describe('formatCurrencyGBP', () => {
  it('formats numbers as GBP currency', () => {
    expect(formatCurrencyGBP(1000)).toBe('£1,000');
    expect(formatCurrencyGBP('25642')).toBe('£25,642');
  });
});
