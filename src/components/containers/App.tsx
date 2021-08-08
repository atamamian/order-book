import { FC, ReactElement } from 'react';

const App: FC = (): ReactElement => (
  <div
    css={{ color: 'purple' }}
    data-testid="headline"
  >
    Order Book
  </div>
);

export default App;
