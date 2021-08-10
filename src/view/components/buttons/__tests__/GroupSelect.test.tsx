import { ETH } from '@/constants/markets';
import { render } from '@testing-library/react';

import GroupSelect from '../GroupSelect';

describe('<GroupSelect />', () => {
  it('returns ETH group', () => {
    const { queryByTestId } = render(<GroupSelect tickSizes={ETH.tickSizes} />);
    expect(queryByTestId('market-group')?.innerHTML).toContain('Group 0.05');
  });
});
