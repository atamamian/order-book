import { render } from '@testing-library/react';

import App from '../App';

describe('<App />', () => {
  it('renders', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toMatchSnapshot();
  });
});
