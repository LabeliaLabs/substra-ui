import React, {Fragment} from 'react';
import {IconButton, RoundedButton} from "../src";
import styled from "@emotion/styled";
import Book from "../src/icons/book";

const CustomRoundedButton = styled.button`
    border: 1px solid red;
`;

const CustomRoundedButton2 = (props) => <button {...props}/>;

const App = () => (
    <Fragment>
        <RoundedButton>Normal</RoundedButton>
        <RoundedButton disabled={true}>Disabled</RoundedButton>
        <RoundedButton Button={CustomRoundedButton}>Custom</RoundedButton>
        <RoundedButton Button={CustomRoundedButton} disabled={true}>Custom isabled</RoundedButton>
        <RoundedButton Button={CustomRoundedButton2}>Custom 2</RoundedButton>
        <IconButton Icon={Book}/>
    </Fragment>
);

export default App;
