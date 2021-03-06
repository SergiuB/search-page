import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import { injectGlobal } from "src/lib/styled-components";

// tslint:disable-next-line
injectGlobal`
  body {
    margin: 0;
  }
`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
