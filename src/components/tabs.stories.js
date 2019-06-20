import {storiesOf} from '@storybook/react';
import React from 'react';
import {color, withKnobs} from '@storybook/addon-knobs';
import {
    Tabs,
    TabList,
    Tab,
    TabPanel,
} from './tabs';
import {darkSkyBlue} from '../variables/colors';

storiesOf('Tabs', module)
    .addDecorator(withKnobs)
    .add('default', () => (
        <Tabs>
            <TabList>
                <Tab>Description</Tab>
                <Tab>Metrics</Tab>
            </TabList>
            <TabPanel>
                <p>First tab's content</p>
            </TabPanel>
            <TabPanel>
                <p>Second tab's content</p>
            </TabPanel>
        </Tabs>
    ))
    .add('color override', () => {
        const checkColor = color('Color: ', darkSkyBlue);
        return (
            <Tabs>
                <TabList>
                    <Tab color={checkColor}>Description</Tab>
                    <Tab color={checkColor}>Metrics</Tab>
                </TabList>
                <TabPanel>
                    <p>First tab's content</p>
                </TabPanel>
                <TabPanel>
                    <p>Second tab's content</p>
                </TabPanel>
            </Tabs>
        );
    })
    .add('disabled', () => (
        <Tabs>
            <TabList>
                <Tab>Description</Tab>
                <Tab disabled>Metrics</Tab>
            </TabList>
            <TabPanel>
                <p>First tab's content</p>
            </TabPanel>
            <TabPanel>
                <p>Second tab's content</p>
            </TabPanel>
        </Tabs>
    ));
