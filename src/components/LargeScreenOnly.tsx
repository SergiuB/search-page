import styled from 'styled-components';
import media from '../lib/media';

const LargeScreenOnly = styled.div`
  ${media.phone`display: none;`}
  ${media.tablet`display: none;`}
  ${media.desktop`display: block;`};
`;
export default LargeScreenOnly;
