import React from 'react';
import {storiesOf} from '@storybook/react';
import PropTypes from '../../utils/propTypes';
import {withAddNotification} from './copyNotification';

storiesOf('CopyNotification', module)
    .add('default', () => {
        const addNotificationButton = ({addNotification}) => (
            <button type="button" onClick={() => addNotification('82e841c49822b2abcab9e95fe9ae359316d70ab5f627a28b0b67618dd945b2c3', 'Dataset\'s key successfully copied to clipboard!')}>
                Add notification
            </button>
        );

        addNotificationButton.propTypes = {
            addNotification: PropTypes.func.isRequired,
        };

        const Button = withAddNotification(addNotificationButton);

        return <Button />;
    });
