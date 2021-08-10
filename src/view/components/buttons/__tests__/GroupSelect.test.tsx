import { render } from '@testing-library/react';

import GroupSelect from '../GroupSelect';

describe('<GroupSelect />', () => {
  it('returns XBT group by default', () => {
    const { queryByTestId } = render(<GroupSelect />);
    expect(queryByTestId('market-group')?.innerHTML).toContain('Group 0.5');
  });
  it('returns ETH group', () => {
    const { queryByTestId } = render(<GroupSelect market="ETH" />);
    expect(queryByTestId('market-group')?.innerHTML).toContain('Group 0.05');
  });
  it('returns XBT group if `market` prop is invalid', () => {
    const { queryByTestId } = render(<GroupSelect market="XYZ" />);
    expect(queryByTestId('market-group')?.innerHTML).toContain('Group 0.5');
  });
});
