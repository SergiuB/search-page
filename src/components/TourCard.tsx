import * as React from 'react';
import {
  Flex,
  Image,
  Hide,
  Relative,
  Absolute,
  Box,
  Heading,
  Text,
  Divider
} from 'rebass';
import styled from 'styled-components';
import getSymbolFromCurrency from 'currency-symbol-map';

interface IInfoProps {
  tourName: string;
  description: string;
  destinations: string[];
  ageFrom: number;
  ageTo: number;
  country: string;
  tourOperator: string;
}

interface IExtraInfoProps {
  price: number;
  saving: number;
  currency: string;
  length: number;
}

export interface ITourCardProps extends IInfoProps, IExtraInfoProps {
  id: number;
  tourImage: string;
  mapImage: string;
}

const SmallScreenOnly: React.SFC = ({ children }) => (
  <Hide xlarge={true} large={true} medium={true}>
    {children}
  </Hide>
);

const LargeScreenOnly: React.SFC = ({ children }) => (
  <Hide small={true} xsmall={true}>
    {children}
  </Hide>
);

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

const formatPrice = (price: number, currency: string) =>
  `${getSymbolFromCurrency(currency) || ''}${price}`;

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

export default class TourCard extends React.PureComponent<ITourCardProps> {
  public render() {
    return (
      <Flex bg="white" flexWrap="wrap">
        <Box width={[1, 1, '250px']}>{this.renderImage()}</Box>
        <Box flex="1 1 auto" pt={3} pb={1}>
          {this.renderInfo()}
        </Box>
        <Box width={[1, 1, 1 / 4]} pt={3} pb={1}>
          {this.renderExtraInfo()}
        </Box>
      </Flex>
    );
  }

  private renderInfo() {
    const infoEl = (
      <Info
        tourName={this.props.tourName}
        description={this.props.description}
        destinations={this.props.destinations}
        ageFrom={this.props.ageFrom}
        ageTo={this.props.ageTo}
        country={this.props.country}
        tourOperator={this.props.tourOperator}
      />
    );

    return (
      <React.Fragment>
        <LargeScreenOnly>
          <Box ml="auto" width="95%">
            {infoEl}
          </Box>
        </LargeScreenOnly>
        <SmallScreenOnly>
          <Box px={2}>{infoEl}</Box>
        </SmallScreenOnly>
      </React.Fragment>
    );
  }

  private renderExtraInfo() {
    const { price, saving, currency, length } = this.props;
    const extraInfoProps = { price, saving, currency, length };

    return (
      <Box px={2}>
        <LargeScreenOnly>
          <ExtraInfoLarge {...extraInfoProps} />
        </LargeScreenOnly>
        <SmallScreenOnly>
          <Box pb={2}>
            <ExtraInfoSmall {...extraInfoProps} />
          </Box>
        </SmallScreenOnly>
      </Box>
    );
  }

  private renderImage() {
    const imageEl = <Image src={this.props.tourImage} />;
    const mapEl = <Image src={this.props.mapImage} />;

    return (
      <Relative>
        {imageEl}
        <LargeScreenOnly>
          <Box pt={1}>{mapEl}</Box>
        </LargeScreenOnly>
        <SmallScreenOnly>
          <Absolute bottom="10px" right="10px">
            <Box width={100}>{mapEl}</Box>
          </Absolute>
        </SmallScreenOnly>
      </Relative>
    );
  }
}
