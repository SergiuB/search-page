import * as React from 'react';
import SearchPage from 'src/components/SearchPage';
import Provider from 'src/components/Provider';

class App extends React.Component {
  public render() {
    return (
      <Provider>
        <SearchPage dataUrl="https://api.myjson.com/bins/18x6yt" />
      </Provider>
    );
  }
}

export default App;
