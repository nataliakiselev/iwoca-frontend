import { describe, it, expect } from 'vitest';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatCurrencyGBP = (amount: number | string) => {
  const numberAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberAmount);
};

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
