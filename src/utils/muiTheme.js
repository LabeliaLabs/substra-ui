import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

export const theme = createMuiTheme({
    palette: {
        primary: indigo, // Purple and green play nicely together.
    },
    typography: {
        useNextVariants: true,
        fontFamily: 'Lato',
        fontSize: 12,
    },
});

export const withMuiTheme = (WrappedComponent, muiTheme = theme) => props => (
    <MuiThemeProvider theme={muiTheme}>
        <WrappedComponent {...props} />
    </MuiThemeProvider>
    );
