/* test: check if the notification appears when clicking a button
/* test: check if the notification disappears after 2000ms
/* test: check if the text is copied to the clipboard */

import React from 'react';
import {fireEvent} from 'react-testing-library';
import PropTypes from '../../utils/propTypes';
import {withAddNotification} from './copyNotification';

test('Change collapse/expand status on click', () => {
    const addNotificationButton = ({addNotification}) => (
        <button type="button" onClick={() => addNotification('82e841c49822b2abcab9e95fe9ae359316d70ab5f627a28b0b67618dd945b2c3', 'Dataset\'s key successfully copied to clipboard!')}>
            Add notification
        </button>
    );

    addNotificationButton.propTypes = {
        addNotification: PropTypes.func.isRequired,
    };

    const button = withAddNotification(addNotificationButton);

    fireEvent.click(button); // simulate a click
});
