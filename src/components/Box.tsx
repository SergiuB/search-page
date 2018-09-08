import styled, { css } from '../lib/styled-components';
import { space } from '../lib/theme-utils';

const Box = styled<
  {
    px?: string | number;
    pt?: string | number;
    pb?: string | number;
    ml?: string | number;
    width?: string;
  },
  'div'
>('div')`
  ${props =>
    props.ml !== undefined &&
    css`
      margin-left: ${space(props.ml)};
    `};

  ${props =>
    props.px &&
    css`
      padding-left: ${space(props.px)};
      padding-right: ${space(props.px)};
    `};

  ${props =>
    props.pt &&
    css`
      padding-top: ${space(props.pt)};
    `};

  ${props =>
    props.pb &&
    css`
      padding-bottom: ${space(props.pb)};
    `};

  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `};
`;

export default Box;
