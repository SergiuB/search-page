import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme, { ITheme } from 'src/lib/theme';

export interface IProviderProps {
  theme?: ITheme;
}

const Root = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};
  * {
    box-sizing: border-box;
  }
`;

export default class Provider extends React.Component<IProviderProps> {
  public render() {
    const { theme = defaultTheme, ...props } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Root {...props} />
      </ThemeProvider>
    );
  }
}
