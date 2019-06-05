import React from 'react';
import renderer from 'react-test-renderer';
import {cleanup} from 'react-testing-library';
import {IconButton} from './iconButton';
import Book from '../icons/book';

afterEach(cleanup);

test('It should render the same', () => {
    const component = renderer.create(<IconButton Icon={Book} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
