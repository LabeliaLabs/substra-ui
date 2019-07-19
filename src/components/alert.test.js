import React from 'react';
import styled from '@emotion/styled';
import {render, fireEvent} from '@testing-library/react';
import {
    alertInlineButton,
    AlertActions,
    alertTitle,
    alertWrapper,
} from './alert';


test('A function can be called by the button', () => {
    let test = 1;
    const AlertWrapper = styled('div')`
            ${alertWrapper}
        `;
    const AlertTitle = styled('div')`
            ${alertTitle}
        `;
    const AlertInlineButton = styled('button')`
            ${alertInlineButton}
        `;

    function increment() {
        test = 2;
    }

    const {getByTestId} = render(
        <AlertWrapper>
            <AlertTitle>This model has not been tested yet</AlertTitle>
            <AlertActions>
                <AlertInlineButton data-testid="button" onClick={() => increment()}>learn more</AlertInlineButton>
            </AlertActions>
        </AlertWrapper>,
    );

    expect(test).toEqual(1);

    fireEvent.click(getByTestId('button'));

    expect(test).toEqual(2);
});
