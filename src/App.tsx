import * as React from 'react';
import TourCard from './components/TourCard/TourCard';
import TourThemeProvider from './components/Provider/Provider';
import media from './lib/media';
import styled from './lib/styled-components';
import { color, space } from './lib/theme-utils';

const Tour = () => (
  <TourCard
    id={1}
    tourName="Home Ing"
    description="13 days Home Ing experience"
    destinations={[
      'Liushun',
      'Uppsala',
      'Zagórnik',
      'Salon-de-Provence',
      'Washington',
      'Prawdzinski',
      'Maredakalada',
      'Breia',
      'Baisha',
      'Songlong'
    ]}
    length={13}
    price={5008}
    saving={92}
    currency="AUD"
    tourImage="http://dummyimage.com/928x680.png/5fa2dd/ffffff"
    mapImage="http://dummyimage.com/928x400.png/cc0000/ffffff"
    ageFrom={21}
    ageTo={73}
    tourOperator="Cormier-Pfeffer"
    country="Indonesia"
  />
);

const TourCardContainer = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${space(3)};
  padding-right: ${space(3)};
  background: ${color('gray')};
  flex-wrap: wrap;
  display: flex;
`;

const TourCardWrapper = styled.div`
  padding: ${space(1)};
  ${media.phone`width: 100%;`}
  ${media.tablet`width: 50%;`}
  ${media.desktop`width: 100%;`}
`;

//
class App extends React.Component {
  public render() {
    return (
      <TourThemeProvider>
        <TourCardContainer>
          <TourCardWrapper>
            <Tour />
          </TourCardWrapper>
          <TourCardWrapper>
            <Tour />
          </TourCardWrapper>
          <TourCardWrapper>
            <Tour />
          </TourCardWrapper>
        </TourCardContainer>
      </TourThemeProvider>
    );
  }
}

export default App;
