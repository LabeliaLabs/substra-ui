import React, {Fragment} from 'react';
import {RoundedButton} from "../src";
import styled from "@emotion/styled";

const CustomRoundedButton = styled.button`
    border: 1px solid red;
`;

const CustomRoundedButton2 = () => <button/>;

const App = () => (
    <Fragment>
        <RoundedButton>Normal</RoundedButton>
        <RoundedButton disabled={true}>Disabled</RoundedButton>
        <RoundedButton Button={CustomRoundedButton}>Custom</RoundedButton>
        <RoundedButton Button={CustomRoundedButton} disabled={true}>Custom isabled</RoundedButton>
        <RoundedButton Button={CustomRoundedButton2}>Custom 2</RoundedButton>
    </Fragment>
);

export default App;
