import { CSSObject } from '@emotion/react';
import { get, map, mapValues } from 'lodash';

const breakpoints = [376, 640, 1024];
const [mobile, tablet, desktop] = [0, 1, 2];
const mq = map(breakpoints, (bp) => `@media (min-width: ${bp}px)`);

export const getStyles = ({ mode }: { mode: string }): CSSObject =>
  mapValues(styleObjects, (v) => get(v, mode, get(v, 'default', v)));

export const globalStyles = {
  body: {
    fontFamily: 'Helvetica, Arial, system-ui',
    fontSize: '16px',
  },
};

export const wrapper = {
  position: 'relative',
  backgroundColor: '#13171f',
  border: '3px solid #2a323e',
  boxSizing: 'border-box',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '525px',
  maxWidth: '875px',
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
  opacity: '0.3',
  display: 'none',
  [mq[tablet]]: {
    display: 'block',
  },
};

export const groupDropdown = {
  backgroundColor: '#2a323e',
  color: 'white',
  border: 'none',
  borderRadius: '3px',
  padding: '2px 3px 2px 3px',
};

export const feedContainer = {
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
  alignItems: 'center',
  width: '100%',
  [mq[tablet]]: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
} as CSSObject;

export const feedColumn = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
} as CSSObject;

export const feedRow = {
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

export const feedCategories = {
  ...feedRow,
  borderBottom: '1px solid #2a323e',
  opacity: '0.3',
};

export const feedFooter = {
  display: 'flex',
  backgroundColor: '#13171f',
  justifyContent: 'center',
} as CSSObject;

const buttonBase = {
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '126px',
  height: '33px',
  borderRadius: '4px',
  margin: '10px 0px 10px 0px',
  fontSize: '0.9em',
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
    sell: {
      ...feedCategories,
      display: 'none',
      flexDirection: 'row-reverse',
      [mq[tablet]]: {
        display: 'flex',
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
