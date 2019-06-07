import React from 'react';
import {render, fireEvent, cleanup} from 'react-testing-library';
import {RoundedButton} from './roundedButton';

afterEach(cleanup);

test('It should handle onClick', () => {
    const callback = jest.fn();
    const {container} = render(<RoundedButton onClick={callback} />);
    const button = container.querySelector('button');
    fireEvent.click(button);
    expect(callback).toHaveBeenCalled();
});

test('It should have a disabled state', () => {
    const callback = jest.fn();
    const {container} = render(<RoundedButton onClick={callback} disabled />);
    const button = container.querySelector('button');
    expect(button.disabled).toBeTruthy();
    fireEvent.click(button);
    expect(callback).not.toHaveBeenCalled();
});
