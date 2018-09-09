import * as React from 'react';
import { ITourCardProps } from './TourCard';

/**
 * Very basic representation of a tour.
 * It will be rendered by the LazyLoad component as a placeholder for the
 * non-visible items, to help with SEO. The user should never see this.
 *
 * Only the 3 most important tour attributes are rendered, but more can be added.
 *
 * See also SearchPageItems component explanation.
 */
export default class TourCardHidden extends React.PureComponent<
  ITourCardProps
> {
  public render() {
    return (
      <React.Fragment>
        <p>{this.props.tourName}</p>
        <p>{this.props.description}</p>
        <p>{this.props.price}</p>
      </React.Fragment>
    );
  }
}
