import * as React from 'react';
import { Hide } from 'rebass';

const SmallScreenOnly: React.SFC = ({ children }) => (
  <Hide xlarge={true} large={true} medium={true}>
    {children}
  </Hide>
);

export default SmallScreenOnly;
