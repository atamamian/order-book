import { render } from '@testing-library/react';

import App from '../App';

describe('<App />', () => {
  it('renders', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('headline')?.innerHTML).toBe('Order Book');
  });
});
