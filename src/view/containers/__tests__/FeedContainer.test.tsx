import { render } from '@testing-library/react';

import FeedContainer from '../FeedContainer';

describe('<FeedContainer />', () => {
  it('renders loading spinner when lists are empty', () => {
    const { queryByTestId } = render(<FeedContainer askList={[]} bidList={[]} />);
    expect(queryByTestId('loading-spinner')).not.toBeNull();
  });
});
