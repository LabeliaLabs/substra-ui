import React from 'react';
import {RoundedButton} from "./roundedButton";
import renderer from 'react-test-renderer';


test('render an actual button', () => {
    const component = renderer.create(
        <RoundedButton/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

