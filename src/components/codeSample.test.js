import React from 'react';
import {render, fireEvent, cleanup} from 'react-testing-library';
import {toHaveStyle} from 'jest-dom';
import CodeSample from './codeSample';
import 'jest-dom/extend-expect';

afterEach(cleanup);

const text = 'toto';

expect.extend({toHaveStyle});

test('Change collapse/expand status on click', () => {
    const {getByTestId} = render(<CodeSample codeString={text} filename="opener.py" language="python" collapsible />);
    let button = getByTestId('toggle');
    let wrapper = getByTestId('wrapper');
    expect(button.title).toEqual('Expand');
    expect(wrapper).toHaveStyle('max-height: 150px');
    fireEvent.click(button);
    button = getByTestId('toggle');
    expect(button.title).toEqual('Collapse');
    wrapper = getByTestId('wrapper');
    expect(wrapper).not.toHaveStyle('max-height: 150px');
});

// test('Download on click', () => {
//
// });

test('Has a collapse/expand button', () => {
    const noButtonCpt = render(<CodeSample codeString={text} filename="opener.py" language="python" />);
    expect(() => {
        noButtonCpt.getByTestId('toggle');
    }).toThrow();
    const withButtonCpt = render(<CodeSample codeString={text} filename="opener.py" language="python" collapsible />);
    expect(withButtonCpt.getByTestId('toggle')).toBeTruthy();
});
