import { render } from '@testing-library/react';
import { forEach } from 'lodash';

import FeedColumn from '../FeedColumn';

const mockFeedData = [
  {
    price: 10000,
    size: 5,
    total: 8,
  },
  {
    price: 10010,
    size: 2,
    total: 16,
  },
];

describe('<FeedColumn />', () => {
  it('renders rows with passed in `feedData`', () => {
    const { queryAllByTestId } = render(<FeedColumn feedData={mockFeedData} feedType="sell" />);
    forEach(queryAllByTestId('feed-row'), (feedRowElement, index) => {
      expect(feedRowElement.innerHTML).toContain(mockFeedData[index].price.toLocaleString());
      expect(feedRowElement.innerHTML).toContain(mockFeedData[index].size.toString());
      expect(feedRowElement.innerHTML).toContain(mockFeedData[index].total.toString());
    });
  });
  it('renders rows with passed in `feedData`', () => {
    const { queryAllByTestId } = render(<FeedColumn feedData={mockFeedData} />);
    forEach(queryAllByTestId('feed-row'), (feedRowElement, index) => {
      expect(feedRowElement.innerHTML).toContain(mockFeedData[index].price.toLocaleString());
      expect(feedRowElement.innerHTML).toContain(mockFeedData[index].size.toString());
      expect(feedRowElement.innerHTML).toContain(mockFeedData[index].total.toString());
    });
  });
});
