import * as React from 'react';
import { Flex, Relative, Absolute, Box } from 'rebass';
import Info, { IInfoProps } from './Info';
import LargeScreenOnly from './LargeScreenOnly';
import SmallScreenOnly from './SmallScreenOnly';
import ExtraInfo, { IExtraInfoProps } from './ExtraInfo';
import styled from 'styled-components';

export interface ITourCardProps extends IInfoProps, IExtraInfoProps {
  id: number;
  tourImage: string;
  mapImage: string;
}

const Image = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
`;

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
    const extraInfoEl = (
      <ExtraInfo
        price={this.props.price}
        saving={this.props.saving}
        currency={this.props.currency}
        length={this.props.length}
      />
    );

    return (
      <Box px={2}>
        <LargeScreenOnly>{extraInfoEl}</LargeScreenOnly>
        <SmallScreenOnly>
          <Box pb={2}>{extraInfoEl}</Box>
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
