import { CSSObject, keyframes } from '@emotion/react';
import { get, map, mapValues } from 'lodash';

const breakpoints = [376, 640, 1024];
const [mobile, tablet, desktop] = [0, 1, 2];
const mq = map(breakpoints, (bp) => `@media (min-width: ${bp}px)`);

const loadingSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const getStyles = ({ mode }: { mode: string }): CSSObject =>
  mapValues(styleObjects, (v) => get(v, mode, get(v, 'default', v)));

export const globalStyles = {
  body: {
    fontFamily: 'Helvetica, Arial, system-ui',
    fontSize: '16px',
  },
};

export const wrapper = {
  backgroundColor: '#13171f',
  border: '3px solid #2a323e',
  boxSizing: 'border-box',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '875px',
  minHeight: '525px',
  position: 'relative',
} as CSSObject;

export const header = {
  alignItems: 'center',
  borderBottom: '1px solid #2a323e',
  display: 'flex',
  flexDirection: 'row',
  fontSize: '0.8em',
  justifyContent: 'space-between',
  padding: '10px 15px 10px 15px',
} as CSSObject;

export const spread = {
  display: 'none',
  opacity: '0.3',
  [mq[tablet]]: {
    display: 'block',
  },
};

export const groupDropdown = {
  backgroundColor: '#2a323e',
  border: 'none',
  borderRadius: '3px',
  color: 'white',
  padding: '2px 3px 2px 3px',
};

export const feedContainer = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
  width: '100%',
  maxHeight: '500px',
  overflow: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  [mq[tablet]]: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
  },
} as CSSObject;

export const feedColumn = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  '&.column-buy': {
    flexDirection: 'column-reverse',
  },
  [mq[tablet]]: {
    '&.column-buy': {
      flexDirection: 'column',
    },
  },
} as CSSObject;

export const feedRow = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row-reverse',
  fontSize: '0.7em',
  justifyContent: 'space-around',
  padding: '3px 0px 3px 0px',
  '& .price': {
    color: 'green',
  },
  [mq[tablet]]: {
    flexDirection: 'row',
  },
} as CSSObject;

export const feedRowSegment = {
  display: 'inline-block',
  width: '20%',
  textAlign: 'right',
} as CSSObject;

export const feedCategories = {
  ...feedRow,
  display: 'none',
  borderBottom: '1px solid #2a323e',
  opacity: '0.3',
  [mq[tablet]]: {
    display: 'flex',
  },
};

export const feedFooter = {
  display: 'flex',
  backgroundColor: '#13171f',
  justifyContent: 'center',
} as CSSObject;

export const loadingSpinner = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'inline-block',
  transform: 'translate(-50%, -50%)',
  width: '40px',
  height: '40px',
  '&:after': {
    content: '" "',
    display: 'block',
    width: '32px',
    height: '32px',
    margin: '1px',
    borderRadius: '50%',
    border: '3px solid #fff',
    borderColor: '#fff transparent #fff transparent',
    animation: `${loadingSpin} 1.2s linear infinite`,
  },
} as CSSObject;

const buttonBase = {
  alignItems: 'center',
  border: 'none',
  borderRadius: '4px',
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  fontSize: '0.9em',
  height: '33px',
  justifyContent: 'center',
  margin: '10px 20px 10px 20px',
  width: '126px',
};

export const toggleFeedButton = {
  ...buttonBase,
  backgroundColor: '#4a3fce',
  marginRight: '8px',
};

export const killFeedButton = {
  ...buttonBase,
  backgroundColor: '#b31a21',
  marginLeft: '8px',
};

export const serviceErrorMessage = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
} as CSSObject;

const styleObjects = {
  feedRow: {
    sell: {
      ...feedRow,
      flexDirection: 'row-reverse',
      '& .price': {
        color: 'red',
      },
      [mq[tablet]]: {
        flexDirection: 'row-reverse',
      },
    },
    default: feedRow,
  },
  feedCategories: {
    header: {
      ...feedCategories,
      display: 'flex',
      [mq[tablet]]: {
        display: 'none',
      },
    },
    buy: {
      ...feedCategories,
      [mq[tablet]]: {
        display: 'flex',
        flexDirection: 'row',
      },
    },
    sell: {
      ...feedCategories,
      display: 'none',
      flexDirection: 'row-reverse',
      [mq[tablet]]: {
        display: 'flex',
        flexDirection: 'row-reverse',
      },
    },
    default: feedCategories,
  },
  spread: {
    mobile: {
      ...spread,
      display: 'block',
      fontSize: '0.7em',
      padding: '5px 0px 5px 0px',
      [mq[tablet]]: {
        display: 'none',
      },
    },
    default: spread,
  },
};
