import * as React from 'react';
import styled, { css } from '../lib/styled-components';
import { space } from '../lib/theme-utils';
import Box, { IBoxProps } from 'src/components/Box';

/**
 * Flex inherits from Box, and adds it's own flex-related attributes.
 * https://www.styled-components.com/docs/api#styling-components
 */
const Flex = styled<
  {
    justifyContent?: string;
  } & IBoxProps
>(({ justifyContent, ...rest }) => <Box {...rest} />)`
  display: flex;
  ${props =>
    props.justifyContent !== undefined &&
    css`
      justify-content: ${space(props.justifyContent)};
    `};
`;

export default Flex;
