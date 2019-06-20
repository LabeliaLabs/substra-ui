import React, {Component, Fragment} from 'react';
import styled from '@emotion/styled';
import {css} from 'emotion';
import copy from 'copy-to-clipboard';

import {Snackbar} from '@material-ui/core';
import {Check} from '../../icons';
import SnackbarContent from './snackbarContent';

import {tealish, ice} from '../../variables/colors';

export const middle = css`
    display: inline-block;
    vertical-align: top;
`;

export const snackbarContent = css`
    color: ${tealish};
    background-color: ${ice};
    
    @media (min-width: 960px) {
        min-width: 200px;
    }    
`;

export const ClipboardContent = styled('div')`
    margin-left: 15px;
    input {
        display: block;
        padding: 3px 0;
        border: 1px solid #9b9b9b;
        color: #9b9b9b;
        background-color: transparent;
        outline: none;
        width: 100%;
    }
    
    p {
        color: #4b6073;
        font-size: 13px;
        margin: 4px 0 0;
    }
`;

export const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
};


const withAddNotification = (WrappedComponent, Icon = Check) => {
    class CopyNotification extends Component {
        queuedNotification;

        state = {
            clipboard: {
                open: false,
                key: '',
                text: '',
            },
        };

        processNotificationQueue = () => {
            if (this.queuedNotification) {
                this.setState((state) => {
                    const queuedNotification = this.queuedNotification;
                    this.queuedNotification = undefined;
                    return {
                        ...state,
                        clipboard: {
                            ...queuedNotification,
                            open: true,
                        },
                    };
                });
            }
        };

        handleClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }

            this.setState(state => ({
                ...state,
                clipboard: {
                    ...state.clipboard,
                    open: false,
                },
            }));
        };


        handleExited = () => {
            this.processNotificationQueue();
        };

        addNotification = (key, text) => {
            copy(key);
            this.queuedNotification = {
                key,
                text,
            };

            if (this.state.clipboard.open) {
                // immediately begin dismissing current message
                // to start showing new one
                this.setState(state => ({
                    ...state,
                    clipboard: {
                        ...state.clipboard,
                        open: false,
                    },
                }));
            }
            else {
                this.processNotificationQueue();
            }
        };

        render() {
            const {clipboard: {open, text, key}} = this.state;

            return (
                <Fragment>
                    <WrappedComponent addNotification={this.addNotification} {...this.props} />

                    <Snackbar
                        data-testid="notification"
                        anchorOrigin={anchorOrigin}
                        open={open}
                        onClose={this.handleClose}
                        onExited={this.handleExited}
                        autoHideDuration={2000}
                    >
                        <SnackbarContent
                            className={snackbarContent}
                            message={(
                                <div>
                                    <Icon />
                                    <ClipboardContent className={middle}>
                                        <input disabled value={key} />
                                        <p>
                                            {text}
                                        </p>
                                    </ClipboardContent>
                                </div>
                            )}
                        />
                    </Snackbar>
                </Fragment>

            );
        }
    }
    return CopyNotification;
};

export default withAddNotification;
