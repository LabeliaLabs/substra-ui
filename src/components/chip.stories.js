import {storiesOf} from '@storybook/react';
import React from 'react';
import {withKnobs} from '@storybook/addon-knobs';
import {
ChipActions, ChipButton, ChipTitle, ChipWrapper,
} from './chip';
import Clear from '../icons/clear';

storiesOf('Chip', module)
    .addDecorator(withKnobs)
    .add('default', () => (
        <ChipWrapper>
            <ChipTitle>objective:key:1cdafbb018dd195690111d74916b76c9</ChipTitle>
            <ChipActions>
                <ChipButton Icon={Clear} iconSize={14} iconColor="#E0E0E0" />
            </ChipActions>
        </ChipWrapper>
        ));
