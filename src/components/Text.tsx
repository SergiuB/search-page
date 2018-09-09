import styled, { css } from 'src/lib/styled-components';
import { fontSize, fontWeight, color } from 'src/lib/theme-utils';

/**
 * Theme-aware text component. Inspired by https://rebassjs.org/.
 *
 * Sample usages:
 *  <Text textAlign="right">From</Text>
 *  <Text fontWeight="bold">{formatPrice(price, currency)}</Text>
 *
 * Only a few properties have been added, just enough for this project.
 */

export interface ITextProps {
  fontSize?: string | number;
  fontWeight?: string;
  lineHeight?: string;
  textAlign?: string;
  color?: string;
}

const Text = styled<ITextProps, 'p'>('p')`
  margin: 0;
  ${props =>
    props.fontSize !== undefined &&
    css`
      font-size: ${fontSize(props.fontSize)};
    `};

  ${props =>
    props.fontWeight !== undefined &&
    css`
      font-weight: ${fontWeight(props.fontWeight)};
    `};

  ${props =>
    props.lineHeight !== undefined &&
    css`
      line-height: ${props.lineHeight};
    `};

  ${props =>
    props.color !== undefined &&
    css`
      color: ${color(props.color)};
    `};

  ${props =>
    props.textAlign !== undefined &&
    css`
      text-align: ${props.textAlign};
    `};
`;

export default Text;
