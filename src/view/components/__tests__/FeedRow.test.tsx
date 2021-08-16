import { render } from '@testing-library/react';
import FeedRow from '../FeedRow';

describe('<FeedRow />', () => {
  it('renders with default props', () => {
    const { queryByTestId } = render(<FeedRow />);
    expect(queryByTestId('feed-row')).not.toBeNull();
  });
});
