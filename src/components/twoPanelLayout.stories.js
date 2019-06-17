import React from 'react';
import {storiesOf} from '@storybook/react';

import TwoPanelLayout from './twoPanelLayout';
import {PanelContent, PanelTop, PanelWrapper} from './panel';

const LeftPanel = props => <div {...props}>Left panel</div>;
const RightPanel = props => <div {...props}>Right panel</div>;

storiesOf('TwoPanelsLayout', module)
    .add('single panel', () => (
        <TwoPanelLayout
            LeftPanel={LeftPanel}
        />
    ))
    .add('two panels', () => (
        <TwoPanelLayout
            LeftPanel={LeftPanel}
            RightPanel={RightPanel}
        />
    ))
    .add('two panels with proper style', () => {
        const PanelWithStyle = () => (
            <PanelWrapper>
                <PanelTop>Panel top</PanelTop>
                <PanelContent>Panel content</PanelContent>
            </PanelWrapper>
        );
        return (
            <TwoPanelLayout
                LeftPanel={PanelWithStyle}
                RightPanel={PanelWithStyle}
            />
        );
    });
