import * as React from 'react';
import LazyLoadBase from 'react-lazyload';

import TourCard, { ITourCardProps } from 'src/components/TourCard';
import media from 'src/lib/media';
import styled from 'src/lib/styled-components';
import { space } from 'src/lib/theme-utils';

const TourCardWrapper = styled.div`
  padding: ${space(1)};
  ${media.phone`width: 100%;`}
  ${media.tablet`width: 50%;`}
  ${media.desktop`width: 100%;`}
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
 * A placeholder with basic tour information (TourCard.Hidden) is rendered for the items not
 * visible, to help with SEO.
 * If we don't render something like this, only the first 4-8 tours will be rendered,
 * but with a placeholder we can render some basic information about the non-visible
 * items, for site indexing.
 *
 * Rendering all TourCard items from the start is quite expensive, even if we
 * lazy load the images (maybe styled-components doesn't perform as good as inline
 * styles or CSS), that's why I chose to render just a few visible TourCard elements,
 * and the rest as TourCardHidden, which is just some basic HTML that renders very fast.
 */

const LazyLoad: React.SFC<{ item: ITourCardProps }> = ({ item, children }) => (
  <LazyLoadBase
    height={400}
    offset={300}
    placeholder={<TourCard.Hidden {...item} />}
  >
    {children as JSX.Element}
  </LazyLoadBase>
);

export default class SearchPageItems extends React.Component<{
  items: ITourCardProps[];
}> {
  public render() {
    const { items } = this.props;

    return (
      <React.Fragment>
        {items.map(item => (
          <TourCardWrapper key={item.id}>
            <LazyLoad item={item}>
              <TourCard {...item} />
            </LazyLoad>
          </TourCardWrapper>
        ))}
      </React.Fragment>
    );
  }
}
