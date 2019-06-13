import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {Paper, withStyles} from '@material-ui/core';


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

function SnackbarContent(props) {
    const {
        classes, className, message, ...other
    } = props;

    return (
        <Paper
            data-testid="snackbar"
            role="alertdialog"
            square
            elevation={6}
            className={classNames(classes.root, className)}
            {...other}
        >
            <div className={classes.message}>{message}</div>
        </Paper>
    );
}

SnackbarContent.propTypes = {
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
};

SnackbarContent.defaultProps = {
    className: '',
    message: null,
};

export default withStyles(styles, {name: 'MuiSnackbarContent'})(SnackbarContent);
