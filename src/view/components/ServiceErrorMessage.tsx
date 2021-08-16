import { ReactElement } from 'react';
import { serviceErrorMessage } from '@/constants/styles';

export const ServiceErrorMessage = (): ReactElement => {
  return (
    <p css={serviceErrorMessage} data-testid="service-error-message">
      WebSocket connection failed! Please try reconnecting.
    </p>
  );
};

export default ServiceErrorMessage;
