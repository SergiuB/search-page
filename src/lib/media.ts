import { css } from 'styled-components';
import { InterpolationValue } from 'styled-components';

const minWidths = {
  xxLarge: 1921,
  xLarge: 1441,
  desktop: 1025,
  tablet: 641,
  phone: 1
};

type MediaFunction = (
  strings: TemplateStringsArray,
  ...args: any[]
) => InterpolationValue[];

interface IMedia {
  xxLarge: MediaFunction;
  xLarge: MediaFunction;
  desktop: MediaFunction;
  tablet: MediaFunction;
  phone: MediaFunction;
}

// Iterate through the sizes and create a media template
const media = Object.keys(minWidths).reduce(
  (acc, label) => {
    acc[label] = (strings: TemplateStringsArray, ...args: any[]) => css`
      @media (min-width: ${minWidths[label] / 16}em) {
        ${css(strings, ...args)};
      }
    `;

    return acc;
  },
  {} as IMedia
);

export default media;
