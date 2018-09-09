import styled from 'styled-components';
import media from '../lib/media';

const SmallScreenOnly = styled.div`
  ${media.phone`display: block;`}
  ${media.tablet`display: block;`}
  ${media.desktop`display: none;`};
`;
export default SmallScreenOnly;
