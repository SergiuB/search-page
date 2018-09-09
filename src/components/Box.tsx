import styled, { css } from 'src/lib/styled-components';
import { space } from 'src/lib/theme-utils';

/**
 * Theme-aware Box component, for layouts.
 * Inspired by Box component in https://rebassjs.org/.
 *
 * Sample usages:
 *    <Box width="40%">...</Box>
 *    <Box width="60%">...</Box>
 *    <Box pb={2} ml="auto">...</Box>
 *
 * Only a few properties have been added, just enough for this project.
 */

export interface IBoxProps {
  px?: string | number;
  pt?: string | number;
  pb?: string | number;
  ml?: string | number;
  width?: string;
}

const Box = styled<IBoxProps, 'div'>('div')`
  ${props =>
    props.ml !== undefined &&
    css`
      margin-left: ${space(props.ml)};
    `};

  ${props =>
    props.px !== undefined &&
    css`
      padding-left: ${space(props.px)};
      padding-right: ${space(props.px)};
    `};

  ${props =>
    props.pt !== undefined &&
    css`
      padding-top: ${space(props.pt)};
    `};

  ${props =>
    props.pb !== undefined &&
    css`
      padding-bottom: ${space(props.pb)};
    `};

  ${props =>
    props.width !== undefined &&
    css`
      width: ${props.width};
    `};
`;

export default Box;
