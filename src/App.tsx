import * as React from 'react';
import TourCard from './components/TourCard/TourCard';
import TourCardHidden from './components/TourCard/TourCardHidden';
import TourThemeProvider from './components/Provider';
import media from './lib/media';
import styled from './lib/styled-components';
import { color, space } from './lib/theme-utils';
import LazyLoadBase, { forceCheck } from 'react-lazyload';
import Spinner from 'src/components/Spinner';

import downIcon from 'src/icons/down-arrow.svg';

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

interface ISortOption {
  label: string;
  value: string;
}

const defaultSortOptions: ISortOption[] = [
  {
    label: 'Lowest Price First',
    value: 'lowestPrice'
  },
  {
    label: 'Highest Price First',
    value: 'highestPrice'
  },
  {
    label: 'Longest Tour First',
    value: 'longestTour'
  },
  {
    label: 'Shortest Tour First',
    value: 'shortestTour'
  }
];

const Select = styled.select`
  padding: 10px 35px 10px 5px;
  margin-left: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  height: 44px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url(${downIcon}) 96% / 15% no-repeat;
  background-color: white;
  &:focus {
    outline: none;
  }
`;

const SelectWrapper = styled.div`
  margin: 20px 0px 10px auto;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: gray;
  /* width: 250px; */
`;

const SortingDrodown: React.SFC<{
  sortOptions: ISortOption[];
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
}> = ({ sortOptions, value, onChange }) => {
  return (
    <SelectWrapper>
      <label htmlFor="">Sort By</label>
      <Select onChange={onChange} value={value}>
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </SelectWrapper>
  );
};

class App extends React.Component<{}, { items: ITourItem[]; sortBy: string }> {
  public state = { items: [] as ITourItem[], sortBy: 'lowestPrice' };
  public render() {
    const { items, sortBy } = this.state;

    const sortedItems = items.sort(this.compareTours);

    const content = !sortedItems.length ? (
      <Center>
        <Spinner />
      </Center>
    ) : (
      <TourCardContainer>
        <SortingDrodown
          sortOptions={defaultSortOptions}
          value={sortBy}
          onChange={this.handleSortChange}
        />
        {sortedItems.map((item: ITourItem) => (
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

  private handleSortChange = (
    event: React.SyntheticEvent<HTMLSelectElement>
  ) => {
    this.setState({ sortBy: event.currentTarget.value }, () => {
      forceCheck();
    });
  };

  private compareTours = (tourA: ITourItem, tourB: ITourItem) => {
    switch (this.state.sortBy) {
      case 'lowestPrice':
        return tourA.price - tourB.price;
      case 'highestPrice':
        return tourB.price - tourA.price;
      case 'longestTour':
        return tourB.length - tourA.length;
      case 'shortestTour':
        return tourA.length - tourB.length;
      default:
        throw new Error(`Unsupported sorting criteria: ${this.state.sortBy}`);
    }
  };
}

export default App;
