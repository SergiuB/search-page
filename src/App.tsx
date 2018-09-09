import * as React from 'react';
import TourCard from './components/TourCard/TourCard';
import TourCardHidden from './components/TourCard/TourCardHidden';
import TourThemeProvider from './components/Provider/Provider';
import media from './lib/media';
import styled from './lib/styled-components';
import { color, space } from './lib/theme-utils';
import LazyLoadBase from 'react-lazyload';
import Spinner from 'src/components/Spinner';

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

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

/**
 * Uses react-lazyload component, with some good values for height and offset,
 * to optimize how many items LazyLoad can render.
 *
 * Depending on screen size, the TourCard height may vary, but 400px is a good
 * approximation.
 *
 * 300px offset ensures we render at least another item "below the fold".
 *
 * A placeholder with basic tour information is rendered for the items not
 * visible, to help with SEO.
 * If we don't render something, only the first 4-8 tours will be rendered,
 * but with a placeholder we can render some basic information about the non-visible
 * items, for site indexing.
 *
 * Rendering all TourCard items from the start is quite expensive, even if we
 * lazy load the images (maybe styled-components doesn't perform as good as inline
 * styles or CSS), that's why I chose to render just a few visible TourCard elements,
 * and the rest as TourCardHidden, which is just some basic HTML that renders very fast.
 */

const LazyLoad: React.SFC<{ item: ITourItem }> = ({ item, children }) => (
  <LazyLoadBase
    height={400}
    offset={300}
    placeholder={
      <TourCardHidden
        id={item.id}
        tourName={item.tour_name}
        description={item.description}
        destinations={item.destinations}
        length={item.length}
        price={item.price}
        saving={item.saving}
        currency={item.currency}
        tourImage={item.tour_image}
        mapImage={item.map_image}
        ageFrom={item.age_from}
        ageTo={item.age_to}
        tourOperator={item.tour_operator}
        country={item.country}
      />
    }
  >
    {children as JSX.Element}
  </LazyLoadBase>
);

interface ITourItem {
  id: number;
  tour_name: string;
  length: number;
  description: string;
  price: number;
  saving: number;
  currency: string;
  destinations: string[];
  age_from: number;
  age_to: number;
  rating: number;
  tour_operator: string;
  country: string;
  tour_image: string;
  map_image: string;
}

//
class App extends React.Component<{}, { items: ITourItem[] }> {
  public state = { items: [] };
  public render() {
    const { items } = this.state;

    const content = !items.length ? (
      <Center>
        <Spinner />
      </Center>
    ) : (
      <TourCardContainer>
        {items.map((item: ITourItem) => (
          <TourCardWrapper key={item.id}>
            <LazyLoad item={item}>
              <TourCard
                id={item.id}
                tourName={item.tour_name}
                description={item.description}
                destinations={item.destinations}
                length={item.length}
                price={item.price}
                saving={item.saving}
                currency={item.currency}
                tourImage={item.tour_image}
                mapImage={item.map_image}
                ageFrom={item.age_from}
                ageTo={item.age_to}
                tourOperator={item.tour_operator}
                country={item.country}
              />
            </LazyLoad>
          </TourCardWrapper>
        ))}
      </TourCardContainer>
    );

    return <TourThemeProvider>{content}</TourThemeProvider>;
  }

  public componentDidMount() {
    fetch('https://api.myjson.com/bins/18x6yt')
      .then(response => response.json())
      .then((items: ITourItem[]) => this.setState({ items }));
  }
}

export default App;
