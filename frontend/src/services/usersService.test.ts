import { searchUsers } from './usersService';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: [{ name: 'John Doe', email: 'johndoe@example.com' }] }),
  })
) as jest.Mock;

describe('usersService', () => {
  it('searches for users', async () => {
    const result = await searchUsers('John');
    expect(result).toEqual({ data: [{ name: 'John Doe', email: 'johndoe@example.com' }] });
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/users?q=John'));
  });
});
