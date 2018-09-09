import { ITheme } from './theme';

export const space = (value: number | string) => ({
  theme
}: {
  theme: ITheme;
}) => (typeof value === 'number' ? `${theme.space[value]}px` : value);

export const color = (colorName: string) => ({ theme }: { theme: ITheme }) =>
  theme.colors[colorName];