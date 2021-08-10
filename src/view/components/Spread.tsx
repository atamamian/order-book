import { ReactElement } from 'react';
import { getStyles } from '@/constants/styles';

const Spread = ({
  ask,
  bid,
  mode = 'default',
}: {
  ask: string;
  bid: string;
  mode?: string;
}): ReactElement => {
  const { spread } = getStyles({ mode });
  const value = Number(ask) - Number(bid);
  const percentage = Number((value / Number(ask)) * 100).toFixed(2);
  return (
    <div css={spread} data-testid="spread-data">
      {`Spread: ${Number(value).toFixed(1)} (${percentage}%)`}
    </div>
  );
};

export default Spread;
