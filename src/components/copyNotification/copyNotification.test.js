import React from 'react';
import {fireEvent, render} from 'react-testing-library';
import copy from 'copy-to-clipboard';
import PropTypes from '../../utils/propTypes';
import {withAddNotification} from './copyNotification';

jest.mock('copy-to-clipboard');

const addNotificationButton = ({addNotification}) => (
    <button
        data-testid="button"
        type="button"
        onClick={() => addNotification('key', 'text')}
    >
        Add notification
    </button>
);

addNotificationButton.propTypes = {
    addNotification: PropTypes.func.isRequired,
};

const Main = withAddNotification(addNotificationButton);

test('The notification appears', () => {
    const {getByTestId} = render(<Main />);

    expect(() => getByTestId('notification')).toThrow();
    fireEvent.click(getByTestId('button'));
    expect(getByTestId('notification')).toBeDefined();
});

test('Key copied to the clipboard', () => {
    copy.mockReset();
    const {getByTestId} = render(<Main />);

    expect(copy).not.toHaveBeenCalled();
    fireEvent.click(getByTestId('button'));
    expect(copy).toHaveBeenCalledTimes(1);
    expect(copy).toHaveBeenCalledWith('key');
});
