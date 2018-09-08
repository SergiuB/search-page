import * as React from 'react';
import Info, { IInfoProps } from './Info';
import LargeScreenOnly from './LargeScreenOnly';
import SmallScreenOnly from './SmallScreenOnly';
import ExtraInfo, { IExtraInfoProps } from './ExtraInfo';
import Box from '../Box';
import styled from '../../lib/styled-components';
import { color, space } from '../../lib/theme-utils';
import media from '../../lib/media';

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

const TourCardWrapper = styled.div`
  background: ${color('white')};
  flex-wrap: wrap;
  display: flex;
`;

const ImageWrapper = styled.div`
  position: relative;
  ${media.phone`width: 100%;`}
  ${media.tablet`width: 100%;`}
  ${media.desktop`width: 250px;`}
`;

const InfoWrapper = styled.div`
  padding-top: ${space(3)};
  padding-bottom: ${space(1)};
  flex: 1 1 auto;
`;

const ExtraInfoWrapper = styled(InfoWrapper)`
  padding-top: ${space(3)};
  padding-bottom: ${space(1)};
  ${media.phone`width: 100%;`}
  ${media.tablet`width: 100%;`}
  ${media.desktop`width: 0px;`};
`;

const MapThumbnail = styled(Box)`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 100px;
`;

export default class TourCard extends React.PureComponent<ITourCardProps> {
  public render() {
    return (
      <TourCardWrapper>
        <ImageWrapper>{this.renderImage()}</ImageWrapper>
        <InfoWrapper>{this.renderInfo()}</InfoWrapper>
        <ExtraInfoWrapper>{this.renderExtraInfo()}</ExtraInfoWrapper>
      </TourCardWrapper>
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
      <React.Fragment>
        {imageEl}
        <LargeScreenOnly>
          <Box pt={1}>{mapEl}</Box>
        </LargeScreenOnly>
        <SmallScreenOnly>
          <MapThumbnail>{mapEl}</MapThumbnail>
        </SmallScreenOnly>
      </React.Fragment>
    );
  }
}
