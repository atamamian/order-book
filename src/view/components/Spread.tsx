import { ReactElement, useContext } from 'react';
import { getStyles } from '@/constants/styles';
import AppContext from '@/helpers/contexts';

const Spread = ({ mode = 'default' }: { mode?: string }): ReactElement => {
  const { spread } = getStyles({ mode });
  const { askPrice, bidPrice, selectedMarket } = useContext(AppContext);

  const value = askPrice - bidPrice;
  const percentage = value === 0 ? 0 : ((value / askPrice) * 100).toFixed(2);
  const marketSymbol = selectedMarket.symbol === 'PI_XBTUSD' ? 'XBT' : 'ETH';

  return (
    <div css={spread} data-testid="spread-data">
      {`${marketSymbol} - Spread: ${value.toFixed(1)} (${percentage}%)`}
    </div>
  );
};

export default Spread;
