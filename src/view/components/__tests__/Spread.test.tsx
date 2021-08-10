import { render } from '@testing-library/react';

import Spread from '../Spread';

describe('<Spread />', () => {
  it('does not error with no props', () => {
    const { queryByTestId } = render(<Spread />);
    expect(queryByTestId('spread-data')?.innerHTML).toContain('Spread: 0.0 (0%)');
  });
  it('displays passed props', () => {
    const props = {
      percentage: '0.05',
      value: '17.0',
    };
    const { queryByTestId } = render(<Spread {...props} />);
    expect(queryByTestId('spread-data')?.innerHTML).toContain(
      `Spread: ${props.value} (${props.percentage}%)`,
    );
  });
});
