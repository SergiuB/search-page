import styled from 'styled-components';
import media from 'src/lib/media';

const LargeScreenOnly = styled.div`
  ${media.phone`display: none;`}
  ${media.tablet`display: none;`}
  ${media.desktop`display: block;`};
`;
export default LargeScreenOnly;
