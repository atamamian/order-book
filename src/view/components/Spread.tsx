import { ReactElement } from 'react';
import { getStyles } from '@/constants/styles';

const Spread = ({
  mode = 'default',
  percentage = '0',
  value = '0.0',
}: {
  mode?: string;
  percentage?: string;
  value?: string;
}): ReactElement => {
  const { spread } = getStyles({ mode });
  return (
    <div css={spread} data-testid="spread-data">
      {`Spread: ${value} (${percentage}%)`}
    </div>
  );
};

export default Spread;
