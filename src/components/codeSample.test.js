// /* global Blob */
import React from 'react';
import {render, fireEvent, cleanup} from 'react-testing-library';
import {toHaveStyle} from 'jest-dom';
import {saveAs} from 'file-saver';

import CodeSample from './codeSample';
import 'jest-dom/extend-expect';

afterEach(cleanup);

const text = 'toto'; // the default text used in the tests below

/* requirements for the "Download on click" test */
jest.mock('file-saver', () => ({saveAs: jest.fn()}));

expect.extend({toHaveStyle});

test('Change collapse/expand status on click', () => {
    const {getByTestId} = render(<CodeSample codeString={text} filename="opener.py" language="python" collapsible />);
    let button = getByTestId('toggle');
    expect(button.title).toEqual('Expand'); // check if the button has the title "Expand"
    let wrapper = getByTestId('wrapper');
    expect(wrapper).toHaveStyle('max-height: 150px'); // check if the wrapper is collapsed through the css
    fireEvent.click(button); // simulate a click
    button = getByTestId('toggle');
    expect(button.title).toEqual('Collapse'); // check if the button has the title "Collapse"
    wrapper = getByTestId('wrapper');
    expect(wrapper).not.toHaveStyle('max-height: 150px'); // check if the wrapper is expanded through the css
});

test('Download on click', () => {
    const {getByTestId} = render(<CodeSample codeString={text} filename="opener.py" language="python" collapsible />);
    const button = getByTestId('download');
    fireEvent.click(button); // simulate a click
    expect(saveAs).toHaveBeenCalledTimes(1); // then we verify that the saveAs function was correctly called one time only
});

test('Has a collapse/expand button', () => {
    const noButtonCpt = render(<CodeSample codeString={text} filename="opener.py" language="python" />);
    expect(() => {
        noButtonCpt.getByTestId('toggle');
    }).toThrow();
    const withButtonCpt = render(<CodeSample codeString={text} filename="opener.py" language="python" collapsible />);
    expect(withButtonCpt.getByTestId('toggle')).toBeTruthy();
});
