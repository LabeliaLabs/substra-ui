import React from 'react';
import styled from '@emotion/styled';
import PropTypes from '../utils/propTypes';
import {ice} from '../variables/colors';

export const RoundButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid ${ice};
    padding: 0;
    background: none;
    cursor: pointer;
    
    &:hover {
        background-color: ${ice};
        transition: background-color 200ms ease-out;
    }
`;

export const IconButton = ({Icon, iconSize, ...props}) => (
    <RoundButton {...props}>
        <Icon width={iconSize} height={iconSize} />
    </RoundButton>
);

IconButton.propTypes = {
    Icon: PropTypes.component.isRequired,
    iconSize: PropTypes.number,
};

IconButton.defaultProps = {
    iconSize: 15,
};
