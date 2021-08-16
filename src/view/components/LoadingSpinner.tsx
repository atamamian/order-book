import { ReactElement } from 'react';

import { loadingSpinner } from '@/constants/styles';

const LoadingSpinner = (): ReactElement => (
  <div css={loadingSpinner} data-testid="loading-spinner" />
);

export default LoadingSpinner;
