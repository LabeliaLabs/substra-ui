import React from 'react';
import {storiesOf} from '@storybook/react';
import PropTypes from '../../utils/propTypes';
import {withAddNotification} from './copyNotification';

storiesOf('CopyNotification', module)
    .add('default', () => {
        const addNotificationButton = ({addNotification}) => (
            <button type="button" onClick={() => addNotification('value to copy', 'success !')}>
                Add notification
            </button>
        );

        addNotificationButton.propTypes = {
            addNotification: PropTypes.func.isRequired,
        };

        const Button = withAddNotification(addNotificationButton);

        return <Button />;
    });
