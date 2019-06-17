/* global window */
import React, {Component, Fragment} from 'react';
import {css} from 'emotion';
import styled from '@emotion/styled';
import PropTypes from '../utils/propTypes';
import {spacingLarge, spacingNormal} from '../variables/spacing';
import {white, ice} from '../variables/colors';

const MIN_COL_WIDTH = 250;

export const middle = css`
    display: inline-block;
    vertical-align: top;
`;

export const margin = 40;
const barSize = 15;
const halfBarSize = (barSize - 1) / 2;

export const verticalBar = css`
    ${middle};
    width: ${barSize}px;
    margin-right: -${halfBarSize}px;
    margin-left: -${halfBarSize}px;
    z-index: 1;
    cursor: col-resize;
    background-color: transparent;
    flex-grow: 0;
    flex-shrink: 0;
    
    position: relative;
    :before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: ${halfBarSize}px;
        border-left: 1px solid ${ice};    
    }
`;


class TwoPanelLayout extends Component {
    state = {
        hold: false,
    };

    constructor(props) {
        super(props);
        const {defaultLeftPanelWidth} = this.props;
        this.state.leftPanelWidth = defaultLeftPanelWidth;
        this.contentRef = React.createRef();
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        if (this.contentRef.current) {
            const containerWidth = this.contentRef.current.offsetWidth;
            const leftPanelWidth = this.state.leftPanelWidth.unit === '%' ? this.state.leftPanelWidth.value * containerWidth / 100 : this.state.leftPanelWidth.value;

            this.updateLeftPanelWidth(containerWidth, leftPanelWidth);
        }
    };

    move = (e) => {
        if (this.state.hold) {
            e.persist();

            const containerWidth = e.currentTarget.offsetWidth;
            const leftPanelWidth = e.clientX - margin - 1;
            this.updateLeftPanelWidth(containerWidth, leftPanelWidth);
        }
    };

    updateLeftPanelWidth(containerWidth, leftPanelWidth) {
        const MAX_COL_WIDTH = Math.max(0, containerWidth - MIN_COL_WIDTH);
        const actualLeftPanelWidth = Math.min(Math.max(MIN_COL_WIDTH, leftPanelWidth), MAX_COL_WIDTH);

        this.setState(state => ({
                ...state,
                leftPanelWidth: {value: actualLeftPanelWidth, unit: 'px'},
            }
        ));
    }

    mouseDown = () => this.setState(state => ({
        ...state,
        hold: true,
    }));

    mouseUp = () => {
        if (this.state.hold) {
            this.setState(state => ({
                ...state,
                hold: false,
            }));
        }
    };


    render() {
        const {LeftPanel, RightPanel} = this.props;

        const Layout = styled.div`
            margin: 0 ${spacingLarge} ${spacingNormal} ${spacingLarge};
            background-color: ${white};
            border: 1px solid ${ice};
            display: flex;
            flex: 1;
            align-items: stretch;
            overflow: hidden;
            ${this.state.hold ? `
                cursor: col-resize;
                user-select: none;
            ` : ''}
        `;

        const LeftPanelWrapper = styled.div`
            width: ${RightPanel ? `${this.state.leftPanelWidth.value}${this.state.leftPanelWidth.unit}` : '100%'};
            flex-grow: 0;
            flex-shrink: 0;
            display: flex;
            overflow: hidden;
        `;

        const RightPanelWrapper = styled.div`
            flex-grow: 1;
            display: flex;
            overflow: hidden;
        `;

        return (
            <Layout
                ref={this.contentRef}
                onMouseMove={this.move}
                onMouseUp={this.mouseUp}
            >
                <LeftPanelWrapper>
                    <LeftPanel />
                </LeftPanelWrapper>

                {RightPanel && (
                    <Fragment>
                        <div
                            onMouseDown={this.mouseDown}
                            className={verticalBar}
                        />
                        <RightPanelWrapper>
                            <RightPanel />
                        </RightPanelWrapper>
                    </Fragment>
                )
                }
            </Layout>
        );
    }
}

TwoPanelLayout.propTypes = {
    defaultLeftPanelWidth: PropTypes.shape({
        value: PropTypes.number,
        unit: PropTypes.string,
    }),
    LeftPanel: PropTypes.component.isRequired,
    RightPanel: PropTypes.component,
};

TwoPanelLayout.defaultProps = {
    defaultLeftPanelWidth: {value: 40, unit: '%'},
    RightPanel: null,
};

export default TwoPanelLayout;
