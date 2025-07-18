import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Applications from './Applications';

global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: 1, company: 'Test', first_name: 'A', last_name: 'B', email: 'a@b.com', loan_amount: 1000, date_created: '2021-01-01', expiry_date: '2021-01-01' },
      { id: 2, company: 'Test2', first_name: 'C', last_name: 'D', email: 'c@d.com', loan_amount: 2000, date_created: '2021-01-01', expiry_date: '2021-01-01' },
    ]),
    headers: { get: () => 'rel="next"' },
  })
) as any;

describe('Applications pagination', () => {
  it('loads more applications when clicking Load more', async () => {
    render(<Applications />);

    const loadMoreButton = await screen.findByRole('button', { name: /load more/i });
    expect(loadMoreButton).toBeInTheDocument();

    fireEvent.click(loadMoreButton);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
