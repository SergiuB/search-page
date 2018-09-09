import * as React from 'react';
import SearchPage, { ISearchPageProps } from './SearchPage';
import { shallow, ShallowWrapper } from 'enzyme';

import Spinner from 'src/components/Spinner';
import SearchPageItems from './SearchPageItems';
import SortingDrodown from '../SortingDropdown';

const json = [
  {
    id: 1,
    tour_name: 'Home Ing',
    length: 13,
    description: '13 days Home Ing experience',
    price: 5008,
    saving: 92,
    currency: 'AUD',
    destinations: [
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
    ],
    age_from: 21,
    age_to: 73,
    rating: 3,
    tour_operator: 'Cormier-Pfeffer',
    country: 'Indonesia',
    tour_image: 'http://dummyimage.com/928x680.png/ff4444/ffffff',
    map_image: 'http://dummyimage.com/928x400.png/cc0000/ffffff'
  },
  {
    id: 2,
    tour_name: 'Hatity',
    length: 11,
    description: '11 days Hatity experience',
    price: 2641,
    saving: 108,
    currency: 'AUD',
    destinations: [
      'Chengnan',
      'Tenggina Daya',
      'Ribeira do Pombal',
      'Liangdang Chengguanzhen',
      'Boncong',
      'Oebobo',
      'Mégara',
      'Qian’an',
      'Zemio',
      'Jelisavac'
    ],
    age_from: 20,
    age_to: 45,
    rating: 5,
    tour_operator: 'Schoen Inc',
    country: 'Canada',
    tour_image: 'http://dummyimage.com/928x680.png/dddddd/000000',
    map_image: 'http://dummyimage.com/928x400.png/5fa2dd/ffffff'
  },
  {
    id: 3,
    tour_name: 'Biodex',
    length: 26,
    description: '26 days Biodex experience',
    price: 4604,
    saving: 148,
    currency: 'AUD',
    destinations: [
      'Uitenhage',
      'Tomingad',
      'Wenping',
      'Stettler',
      'Sidi Redouane',
      'Niuzhuang',
      'Nazran’',
      'Az Zuwaytīnah',
      'Iporá',
      'Drosáto'
    ],
    age_from: 27,
    age_to: 38,
    rating: 3,
    tour_operator: 'Larson-Heaney',
    country: 'Venezuela',
    tour_image: 'http://dummyimage.com/928x680.png/5fa2dd/ffffff',
    map_image: 'http://dummyimage.com/928x400.png/cc0000/ffffff'
  }
];

let wrapper: ShallowWrapper<ISearchPageProps>;

const jsonPromise = Promise.resolve(json);
const responsePromise = Promise.resolve({ json: () => jsonPromise });

describe('SearchPage', () => {
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => responsePromise);
  });

  it('renders a spinner initially', () => {
    wrapper = shallow(<SearchPage dataUrl="my.api" />);
    expect(wrapper.find(Spinner).length).toBe(1);
  });

  it('renders the items with the default sort order (lowest price)', async () => {
    wrapper = shallow(<SearchPage dataUrl="my.api" />);
    // wait for the fetch promises to complete
    await responsePromise;
    await jsonPromise;
    expect(wrapper.find(Spinner).length).toBe(0);
    expect(
      wrapper
        .find(SearchPageItems)
        .props()
        .items.map(({ price }) => price)
    ).toMatchObject([2641, 4604, 5008]);
  });

  it('renders the items in correct order when sorting by the longest tour', async () => {
    wrapper = shallow(<SearchPage dataUrl="my.api" />);
    // wait for the fetch promises to complete
    await responsePromise;
    await jsonPromise;

    wrapper
      .find(SortingDrodown)
      .props()
      .onChange('longestTour');

    expect(
      wrapper
        .find(SearchPageItems)
        .props()
        .items.map(({ length }) => length)
    ).toMatchObject([26, 13, 11]);
  });
});
