import { fireEvent, render, waitFor } from '@testing-library/react';

import App from '../App';

describe('<App />', () => {
  it('renders', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('wrapper')).not.toBeNull();
  });
  it('toggles feed', async () => {
    const { queryAllByTestId, queryByTestId } = render(<App />);
    fireEvent.click(queryByTestId('toggle-feed-button') as HTMLElement);
    await waitFor(() => expect(queryAllByTestId('spread-data')[0]?.innerHTML).toContain('ETH'));
  });
  it('kills feed', async () => {
    const mockSocket = new WebSocket('wss://test');
    const wsSpy = jest.spyOn(global, 'WebSocket');
    const mockDispatch = jest.fn();
    wsSpy.mockImplementation((url: string) => {
      return {
        ...mockSocket,
        dispatchEvent: mockDispatch,
      };
    });
    const { queryByTestId } = render(<App />);
    fireEvent.click(queryByTestId('kill-feed-button') as HTMLElement);
    expect(mockDispatch).toHaveBeenCalled();
    wsSpy.mockClear();
    wsSpy.mockRestore();
  });
  it('sets grouping when changed', () => {
    const { queryByTestId } = render(<App />);
    fireEvent.change(queryByTestId('market-group') as HTMLElement, {
      target: { value: 'Group 1' },
    });
    expect(queryByTestId('market-group')?.innerHTML).toContain('Group 1');
  });
});
