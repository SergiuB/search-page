import * as React from 'react';
import { forceCheck } from 'react-lazyload';

import styled from 'src/lib/styled-components';
import { color, space } from 'src/lib/theme-utils';
import Spinner from 'src/components/Spinner';
import { ITourCardProps } from 'src/components/TourCard';
import SortingDrodown, {
  ISortOption
} from '../SortingDropdown/SortingDropdown';

import { ITourItemAPI } from './types';
import SearchPageItems from './SearchPageItems';

const itemToTourCardProps: (item: ITourItemAPI) => ITourCardProps = item => ({
  ...item,
  tourName: item.tour_name,
  tourImage: item.tour_image,
  mapImage: item.map_image,
  ageFrom: item.age_from,
  ageTo: item.age_to,
  tourOperator: item.tour_operator
});

const Container = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${space(3)};
  padding-right: ${space(3)};
  background: ${color('gray')};
  flex-wrap: wrap;
  display: flex;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const sortOptions: ISortOption[] = [
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

interface ISearchPageProps {
  dataUrl: string;
}

interface ISearchPageState {
  items: ITourCardProps[];
  sortBy: string;
}

export default class SearchPage extends React.Component<
  ISearchPageProps,
  ISearchPageState
> {
  public state = { items: [] as ITourCardProps[], sortBy: 'lowestPrice' };
  public render() {
    const { items, sortBy } = this.state;

    const sortedItems = items.sort(this.compareTours);

    if (!sortedItems.length) {
      return (
        <Center>
          <Spinner />
        </Center>
      );
    }

    return (
      <Container>
        <SortingDrodown
          sortOptions={sortOptions}
          value={sortBy}
          onChange={this.handleSortChange}
        />
        <SearchPageItems items={sortedItems} />
        ))}
      </Container>
    );
  }

  public componentDidMount() {
    fetch(this.props.dataUrl)
      .then(response => response.json())
      .then((items: ITourItemAPI[]) =>
        this.setState({ items: items.map(itemToTourCardProps) })
      );
  }

  private handleSortChange = (
    event: React.SyntheticEvent<HTMLSelectElement>
  ) => {
    this.setState({ sortBy: event.currentTarget.value }, () => {
      forceCheck();
    });
  };

  private compareTours = (tourA: ITourCardProps, tourB: ITourCardProps) => {
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
