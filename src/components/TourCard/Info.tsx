import * as React from 'react';
import { Flex, Heading, Text } from 'rebass';
import styled from 'styled-components';
import LargeScreenOnly from './LargeScreenOnly';
import Box from '../Box';

export interface IInfoProps {
  tourName: string;
  description: string;
  destinations: string[];
  ageFrom: number;
  ageTo: number;
  country: string;
  tourOperator: string;
}

const InfoLabel = styled(Text)`
  text-transform: uppercase;
`;

const Detail: React.SFC<{ label: string; info: string }> = ({
  label,
  info
}) => (
  <Flex pt={1}>
    <Box width="40%">
      <InfoLabel color="darken" fontSize={1}>
        {label}
      </InfoLabel>
    </Box>
    <Box width="60%">
      <Text fontSize={1}>{info}</Text>
    </Box>
  </Flex>
);

const Info: React.SFC<IInfoProps> = ({
  tourName,
  description,
  destinations,
  ageFrom,
  ageTo,
  country,
  tourOperator
}) => (
  <React.Fragment>
    <Heading>{tourName}</Heading>
    <LargeScreenOnly>
      <Box pt={2} pb={3}>
        <Text>{description}</Text>
      </Box>
      <Box>
        <Detail label="Destinations" info={destinations[0]} />
        <Detail
          label="Starts/Ends In"
          info={`${destinations[0]} / ${destinations[destinations.length - 1]}`}
        />
        <Detail label="Age Range" info={`${ageFrom} to ${ageTo} years old`} />
        <Detail label="Country" info={country} />
        <Detail label="Operator" info={tourOperator} />
      </Box>
    </LargeScreenOnly>
  </React.Fragment>
);

export default Info;
