import React from 'react';
import PropTypes from 'prop-types';
import {Paper, withStyles} from '@material-ui/core';
import classNames from 'classnames';

export const styles = theme => {
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

function SnackbarMain(props) {
    const {
        classes,
        message,
        className,
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
                {message}
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
    key: PropTypes.string,
};

SnackbarMain.defaultProps = {
    className: '',
    message: null,
    key: '',
};

export default withStyles(styles, {name: 'MuiSnackbarContent'})(SnackbarMain);
