import { ITheme } from './theme';

/**
 * Helpers for theming styled components.
 *
 * Sample usage in a component:
 *
 *  const Heading = styled.h2`
 *    font-size: ${fontSize(5)};          // use font size #5 in the theme.fontSizes (see theme.js).
 *    font-weight: ${fontWeight('bold')}; // use weight defined in theme.fontWeights.bold (see theme.js).
 *    line-height: 1.25;
 *    margin: 0;
 *  `;
 */

export const space = (value: number | string) => ({
  theme
}: {
  theme: ITheme;
}) => (typeof value === 'number' ? `${theme.space[value]}px` : value);

export const color = (colorName: string) => ({ theme }: { theme: ITheme }) =>
  theme.colors[colorName];

export const fontSize = (value: number | string) => ({
  theme
}: {
  theme: ITheme;
}) => (typeof value === 'number' ? `${theme.fontSizes[value]}px` : value);

export const fontWeight = (weightName: string) => ({
  theme
}: {
  theme: ITheme;
}) => theme.fontWeights[weightName];
