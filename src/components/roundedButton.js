import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import styled from '@emotion/styled';
import {blueGrey, ice, slate} from '../variables/colors';
import {spacingExtraSmall, spacingNormal} from '../variables/spacing';

export const Button = styled.button`
    color: ${slate};
    height: 30px;
    line-height: 28px;
    border-radius: 15px;
    border: 1px solid ${ice};
    padding: 0 ${spacingNormal};
    background: none;
    cursor: pointer;
    
    &:not(:disabled):hover {
        background-color: ${ice};
        transition: background-color 200ms ease-out;
    }
    
    &:disabled {
        color: ${blueGrey}
    }
`;

const icon = css`
    margin-right: ${spacingExtraSmall};
    margin-bottom: -3px;
`;

export const RoundedButton = ({
    disabled, Icon, Button, iconColor, iconColorDisabled, children, ...props
}) => (
    <Button disabled={disabled} {...props}>
        {Icon && (
            <Icon
                width={15}
                height={15}
                color={disabled ? iconColorDisabled : iconColor}
                className={icon}
            />
        )}
        {children}
    </Button>
);

RoundedButton.propTypes = {
    disabled: PropTypes.bool,
    iconColor: PropTypes.string,
    iconColorDisabled: PropTypes.string,
    Icon: PropTypes.element,
    children: PropTypes.node,
    Button: PropTypes.element,
};


RoundedButton.defaultProps = {
    disabled: false,
    iconColor: blueGrey,
    iconColorDisabled: slate,
    Icon: null,
    children: null,
    Button,
};
