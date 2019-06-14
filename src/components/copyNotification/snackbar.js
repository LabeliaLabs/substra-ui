import React from 'react';
import PropTypes from 'prop-types';
import {Paper, withStyles} from '@material-ui/core';
import styled from '@emotion/styled';
import {css} from 'emotion';
import classNames from 'classnames';
import Check from '../../icons/check';
import {primaryAccent} from '../../variables/colors';

export const styles = (theme) => {
    const backgroundColor = theme.palette.background.default;

    return {
        /* Styles applied to the root element. */
        root: {
            color: theme.palette.getContrastText(backgroundColor),
            backgroundColor,
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            padding: '6px 24px',
            [theme.breakpoints.up('md')]: {
                minWidth: 288,
                maxWidth: 568,
                borderRadius: theme.shape.borderRadius,
            },
            [theme.breakpoints.down('sm')]: {
                flexGrow: 1,
            },
        },
        /* Styles applied to the message wrapper element. */
        message: {
            padding: '8px 0',
        },
        /* Styles applied to the action wrapper element if `action` is provided. */
        action: {
            display: 'flex',
            alignItems: 'center',
            marginLeft: 'auto',
            paddingLeft: 24,
            marginRight: -8,
        },
    };
};

export const ClipboardContent = styled('div')`
    margin-left: 15px;
    input {
        display: block;
        padding: 3px 0;
        border: 1px solid #9b9b9b;
        color: #9b9b9b;
        background-color: transparent;
        outline: none;
        width: 100%;
    }
    
    p {
        color: #4b6073;
        font-size: 13px;
        margin: 4px 0 0;
    }
`;

export const middle = css`
    display: inline-block;
    vertical-align: top;
`;

function SnackbarMain(props) {
    const {
        inputValue,
        classes,
        message,
        className,
        env,
        ...other
    } = props;
    return (
        <Paper
            role="alertdialog"
            square
            elevation={6}
            className={classNames(classes.root, className)}
            {...other}
        >
            <div className={classes.message}>
                <Check color={primaryAccent(env)} className={middle} />
                <ClipboardContent className={middle}>
                    <input disabled value={inputValue} />
                    <p>
                        {message}
                    </p>
                </ClipboardContent>
            </div>
        </Paper>
    );
}

SnackbarMain.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css-api) below for more details.
     */
    classes: PropTypes.shape({
        root: PropTypes.string,
        message: PropTypes.string,
    }).isRequired,
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The message to display.
     */
    message: PropTypes.node,
    inputValue: PropTypes.node,
    env: PropTypes.string,
};

SnackbarMain.defaultProps = {
    className: '',
    message: null,
    inputValue: '',
    env: 'OWKESTRA',
};

export default withStyles(styles, {name: 'MuiSnackbarContent'})(SnackbarMain);
