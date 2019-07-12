import React from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, color} from '@storybook/addon-knobs';
import PropTypes from '../../utils/propTypes';
import withAddNotification from './copyNotification';
import Check from '../../icons/check';
import {darkSkyBlue} from '../../variables/colors';

storiesOf('CopyNotification', module)
    .addDecorator(withKnobs)
    .add('default', () => {
        const addNotificationButton = ({addNotification}) => (
            <button type="button" onClick={() => addNotification('key', 'text')}>
                Add notification
            </button>
        );

        addNotificationButton.propTypes = {
            addNotification: PropTypes.func.isRequired,
        };

        const Button = withAddNotification(addNotificationButton);

        return <Button />;
    })
    .add('color override', () => {
        const checkColor = color('Color: ', darkSkyBlue);
        const addNotificationButton = ({addNotification}) => (
            <button type="button" onClick={() => addNotification('key', 'text')}>
                Add notification
            </button>
        );

        addNotificationButton.propTypes = {
            addNotification: PropTypes.func.isRequired,
        };

        const OwkestraCheck = () => <Check color={checkColor} />;

        const Button = withAddNotification(addNotificationButton, OwkestraCheck);

        return <Button />;
    });
