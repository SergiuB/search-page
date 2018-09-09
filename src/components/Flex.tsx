import * as React from 'react';
import styled, { css } from 'src/lib/styled-components';
import { space } from 'src/lib/theme-utils';
import Box, { IBoxProps } from 'src/components/Box';

/**
 * Theme-aware Flex component, for flex layouts.
 * Inspired by Flex component in https://rebassjs.org/.
 *
 * Flex inherits from Box, and adds it's own flex-related attributes
 * (https://www.styled-components.com/docs/api#styling-components);
 *
 * Sample usage:
 *
 *     <Flex justifyContent="space-between">
 *       <Box>... </Box>
 *       <Box>...</Box>
 *       <Box>...</Box>
 *     </Flex>
 *
 * Only a few properties have been added, just enough for this project.
 *
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
