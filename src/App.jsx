import GlobalStyle from "./createGlobalStyle.js";

import { Fragment } from "react";
import { Main } from "./page/Main.jsx";

function App() {
    return (
        <Fragment>
            <GlobalStyle />
            <Main />
        </Fragment>
    );
}

export default App;
