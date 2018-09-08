import * as React from 'react';
import { Flex, Box, Text, Divider } from 'rebass';
import getSymbolFromCurrency from 'currency-symbol-map';
import LargeScreenOnly from './LargeScreenOnly';
import SmallScreenOnly from './SmallScreenOnly';

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
      <Divider w={1} borderColor="gray" />
      <Text textAlign="center" fontWeight="bold">{`${length} Days`}</Text>
      <Divider w={1} borderColor="gray" />
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
