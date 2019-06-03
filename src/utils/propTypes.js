import RootPropTypes from 'prop-types';
import {isValidElementType} from 'react-is';

const PropTypes = {
    ...RootPropTypes,
    /*
     * Custom component propTypes
     * Taken from https://github.com/facebook/react/issues/5143
     */
    component: (props, propName, componentName) => {
        if (props[propName] && !isValidElementType(props[propName])) {
            return new Error(`Invalid prop '${propName}' supplied to '${componentName}': the prop is not a valid React component`);
        }
    },
};

export default PropTypes;
