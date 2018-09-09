import * as React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';

import styled from 'src/lib/styled-components';
import { space, color } from 'src/lib/theme-utils';
import LargeScreenOnly from 'src/components/LargeScreenOnly';
import SmallScreenOnly from 'src/components/SmallScreenOnly';
import Flex from 'src/components/Flex';
import Text from 'src/components/Text';
import Box from 'src/components/Box';

const formatPrice = (price: number, currency: string) =>
  `${getSymbolFromCurrency(currency) || ''}${price}`;

export interface IExtraInfoProps {
  price: number;
  saving: number;
  currency: string;
  length: number;
}

const ExtraInfoSmall: React.SFC<IExtraInfoProps> = ({
  price,
  saving,
  currency,
  length
}) => {
  return (
    <React.Fragment>
      <Flex justifyContent="space-between">
        <Box>
          <Text>Days</Text>
          <Text fontWeight="bold">{`${length} Days`}</Text>
        </Box>
        <Box>
          <Text textAlign="center">Our saving</Text>
          <Text textAlign="center">{formatPrice(saving, currency)}</Text>
        </Box>
        <Box>
          <Text textAlign="right">From</Text>
          <Text fontWeight="bold">{formatPrice(price, currency)}</Text>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

const Divider = styled.hr`
  margin-left: ${space(0)};
  margin-right: ${space(0)};
  margin-top: ${space(3)};
  margin-bottom: ${space(3)};
  border-width: 1px;
  border-color: ${color('gray')};
`;

const ExtraInfoLarge: React.SFC<IExtraInfoProps> = ({
  price,
  saving,
  currency,
  length
}) => {
  return (
    <React.Fragment>
      <Flex>
        <Box>
          <Text>Our saving</Text>
          <Text>{formatPrice(saving, currency)}</Text>
        </Box>
        <Box ml="auto">
          <Text textAlign="right">From</Text>
          <Text fontWeight="bold">{formatPrice(price, currency)}</Text>
        </Box>
      </Flex>
      <Divider />
      <Text textAlign="center" fontWeight="bold">{`${length} Days`}</Text>
      <Divider />
    </React.Fragment>
  );
};

const ExtraInfo: React.SFC<IExtraInfoProps> = props => {
  return (
    <React.Fragment>
      <LargeScreenOnly>
        <ExtraInfoLarge {...props} />
      </LargeScreenOnly>
      <SmallScreenOnly>
        <ExtraInfoSmall {...props} />
      </SmallScreenOnly>
    </React.Fragment>
  );
};

export default ExtraInfo;
