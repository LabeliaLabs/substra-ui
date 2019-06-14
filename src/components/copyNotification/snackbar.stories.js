import React from 'react';
import {storiesOf} from '@storybook/react';
import SnackbarContent from './snackbar';

storiesOf('Snackbar', module)
    .add('substra', () => (
        <div>
            <SnackbarContent
                message="This is a simple message (Substra)"
                inputValue="1cdafbb018dd195690111d74916b76c96892d897ec3587c814f287946db446c3"
                env="SUBSTRA"
            />
        </div>
    ))
    .add('owkestra', () => (
        <div>
            <SnackbarContent
                message="This is a simple message (Owkestra)"
                inputValue="3d70ab46d710dacb0f48cb42db4874fac14e048a0d415e266aad38c09591ee71"
                env="OWKESTRA"
            />
        </div>
    ));
