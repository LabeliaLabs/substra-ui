import React, {Fragment} from 'react';
import {storiesOf} from '@storybook/react';
import {withKnobs, color} from '@storybook/addon-knobs/react';

import styled from '@emotion/styled';
import {
    Alert,
    Algo,
    Book,
    Check,
    ClearIcon,
    Clipboard,
    Collapse,
    CopyDrop,
    CopySimple,
    Dataset,
    DownloadDrop,
    DownloadSimple,
    Expand,
    FilterUp,
    Folder,
    Model,
    MoreVertical,
    OwkestraLogo,
    Permission,
    Search,
    SubstraLogo,
} from './index';
import {slate, tealish} from '../variables/colors';
import {spacingSmall} from '../variables/spacing';

const Dl = styled.dl`
    display: grid;
    grid-template-columns: 50px auto;
    grid-gap: ${spacingSmall};
`;

const Dt = styled.dt`
    grid-column: 1;
    width: 50px;
`;

const Dd = styled.dd`
    grid-column: 2;
    margin: 0;
`;

storiesOf('Icons', module)
    .addDecorator(withKnobs)
    .add('default', () => {
        const colorKnob = color('color', slate);
        const secondaryColorKnob = color('secondaryColor', tealish);
        return (
            <Fragment>
                <Dl>
                    <Dt>
                        <Alert color={colorKnob} />
                    </Dt>
                    <Dd>
                        Alert
                    </Dd>
                    <Dt>
                        <Algo color={colorKnob} />
                    </Dt>
                    <Dd>
                        Algo
                    </Dd>
                    <Dt>
                        <Book color={colorKnob} />
                    </Dt>
                    <Dd>
                        Book
                    </Dd>
                    <Dt>
                        <Check color={colorKnob} />
                    </Dt>
                    <Dd>
                        Check
                    </Dd>
                    <Dt>
                        <ClearIcon color={colorKnob} />
                    </Dt>
                    <Dd>
                        ClearIcon
                    </Dd>
                    <Dt>
                        <Clipboard color={colorKnob} />
                    </Dt>
                    <Dd>
                        Clipboard
                    </Dd>
                    <Dt>
                        <Collapse color={colorKnob} />
                    </Dt>
                    <Dd>
                        Collapse
                    </Dd>
                    <Dt>
                        <CopyDrop color={colorKnob} secondaryColor={secondaryColorKnob} />
                    </Dt>
                    <Dd>
                        CopyDrop
                    </Dd>
                    <Dt>
                        <CopySimple color={colorKnob} />
                    </Dt>
                    <Dd>
                        CopySimple
                    </Dd>
                    <Dt>
                        <Dataset color={colorKnob} />
                    </Dt>
                    <Dd>
                        Dataset
                    </Dd>
                    <Dt>
                        <DownloadDrop color={colorKnob} secondaryColor={secondaryColorKnob} />
                    </Dt>
                    <Dd>
                        DownloadDrop
                    </Dd>
                    <Dt>
                        <DownloadSimple color={colorKnob} />
                    </Dt>
                    <Dd>
                        DownloadSimple
                    </Dd>
                    <Dt>
                        <Expand color={colorKnob} />
                    </Dt>
                    <Dd>
                        Expand
                    </Dd>
                    <Dt>
                        <FilterUp color={colorKnob} secondaryColor={secondaryColorKnob} />
                    </Dt>
                    <Dd>
                        FilterUp
                    </Dd>
                    <Dt>
                        <Folder color={colorKnob} />
                    </Dt>
                    <Dd>
                        Folder
                    </Dd>
                    <Dt>
                        <Model color={colorKnob} />
                    </Dt>
                    <Dd>
                        Model
                    </Dd>
                    <Dt>
                        <MoreVertical color={colorKnob} />
                    </Dt>
                    <Dd>
                        MoreVertical
                    </Dd>
                    <Dt>
                        <Permission color={colorKnob} />
                    </Dt>
                    <Dd>
                        Permission
                    </Dd>
                    <Dt>
                        <Search color={colorKnob} />
                    </Dt>
                    <Dd>
                        Search
                    </Dd>
                </Dl>
            </Fragment>
        );
    })
    .add('logos', () => (
        <Fragment>
            <div>
                <OwkestraLogo width={200} />
            </div>
            <div>
                <SubstraLogo width={200} />
            </div>
        </Fragment>
    ));
