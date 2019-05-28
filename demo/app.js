import React, {Fragment} from 'react';
import {RoundedButton} from "../src";

const App = () => (
    <Fragment>
        <RoundedButton>Normal</RoundedButton>
        <RoundedButton disabled={true}>Disabled</RoundedButton>
    </Fragment>
);

export default App;
