import React from 'react';
import {storiesOf} from '@storybook/react';
import {StateDecorator, Store} from '@sambego/storybook-state';
import {uniqBy} from 'lodash';

import SearchBar from './searchBar';
import {withMuiTheme} from '../../utils/muiTheme';

const defaultState = {
    inputValue: '',
    isParent: true,
    selectedItem: [],
    suggestions: [],
    parentSuggestions: [],
};
let previousState = {...defaultState};
const store = new Store(defaultState);

const setState = (state) => {
    store.set(state);
};


const suggestions = [
    'AAAA:1',
    'AAAA:2',
    'BBBB:1',
    'BBBB:3',
];

const getSuggestions = (isParent, selectedItem, item) => {
    const isLogic = item === '-OR-';
    const level_1 = uniqBy(suggestions.map(s => ({label: s.split(':')[0]})), 'label');

    if (isParent) {
        return {
            suggestions: [
                ...(selectedItem.length && !isLogic ? [{label: '-OR-', isLogic: true}] : []),
                ...level_1,
            ],
            parentSuggestions: level_1,
            item: isLogic ? '' : item,
        };
    }

    const s = suggestions.reduce((p, c) => {
        const [parent, child] = c.split(':');
        return [
            ...p,
            ...(parent === selectedItem[0].parent ? [{label: child}] : []),
        ];
    }, []);
    const level_2 = uniqBy(s, 'label');

    return {
        suggestions: level_2,
        parentSuggestions: level_1,
    };
};


setState({...defaultState, ...getSuggestions(defaultState.isParent, [])});

store.subscribe((state) => {
    if (previousState.isParent !== state.isParent || state.item === '-OR-' || (
        !state.selectedItem.length && state.suggestions[0].label === '-OR-'
    )) {
        previousState = {...state};
        store.set({
            ...state,
            ...getSuggestions(state.isParent, state.selectedItem, state.item),
        });
    }

    previousState = {...state};
});


storiesOf('SearchBar', module)
    .addDecorator(StateDecorator(store))
    .add('default', () => (
        <SearchBar
            inputValue={store.get('inputValue')}
            setState={setState}
            suggestions={store.get('suggestions')}
            parentSuggestions={store.get('parentSuggestions')}
            isParent={store.get('isParent')}
            selectedItem={store.get('selectedItem')}
            placeholder="Custom placeholder"
        />
    ))
    .add('withMuiTheme', () => {
        const ThemedSearchBar = withMuiTheme(SearchBar);
        return (
            <ThemedSearchBar
                inputValue={store.get('inputValue')}
                setState={setState}
                suggestions={store.get('suggestions')}
                parentSuggestions={store.get('parentSuggestions')}
                isParent={store.get('isParent')}
                selectedItem={store.get('selectedItem')}
                placeholder="Custom placeholder"
            />
        );
    });
