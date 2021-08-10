import { render } from '@testing-library/react';

import Spread from '../Spread';

describe('<Spread />', () => {
  it('displays passed props', () => {
    const props = {
      ask: '34079.5',
      bid: '34062.5',
    };
    const { queryByTestId } = render(<Spread {...props} />);
    expect(queryByTestId('spread-data')?.innerHTML).toEqual(`Spread: 17.0 (0.05%)`);
  });
});
