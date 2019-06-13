import React from 'react';
import {storiesOf} from '@storybook/react';
import SnackbarContent from './snackbar';

storiesOf('Snackbar', module)
    .add('default', () => (
        <SnackbarContent message="This is a simple message" />
    ));
