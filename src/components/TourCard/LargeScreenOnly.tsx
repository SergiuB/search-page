import * as React from 'react';
import { Hide } from 'rebass';

const LargeScreenOnly: React.SFC = ({ children }) => (
  <Hide small={true} xsmall={true}>
    {children}
  </Hide>
);

export default LargeScreenOnly;
