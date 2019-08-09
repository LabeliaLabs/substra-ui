import React, {Component} from 'react';
import keycode from 'keycode';
import Downshift from 'downshift';
import uuidv4 from 'uuid/v4';
import decodeUriComponent from 'decode-uri-component';
import {isEqual, noop} from 'lodash';
import styled from '@emotion/styled';
import {css} from 'emotion';

import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from '../../utils/propTypes';

import {IconButton} from '../iconButton';
import SearchInput from './overrides/searchInput';

import {ice, white} from '../../variables/colors';

const InputWrapper = styled('div')`
    border: 1px solid ${ice};
    background-color: ${white};
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 40px;
    border-radius: 20px;
    padding: 3px;
`;

const searchInputWrapper = css`
    flex-grow: 1;
`;

const clearButton = css`
    border: none;
    z-index: 1;
`;

// use getRootProps https://github.com/paypal/downshift#getrootprops
const SearchInputWrapper = ({innerRef, ...rest}) => (
    <div
        className={searchInputWrapper}
        ref={innerRef}
        {...rest}
    />
);

SearchInputWrapper.propTypes = {
    innerRef: PropTypes.func.isRequired,
};

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.input = React.createRef();
    }

    componentDidMount() {
        // init suggestions
        const {location, setState, selectedItem} = this.props;

        let newSelectedItem = [];
        // fill search from state.location
        if (location && location.query && location.query.search) {
            // get groups separated by -OR-
            const groups = location.query.search.split('-OR-');

            newSelectedItem = groups.reduce((p, group) => {
                // create related chips
                const chips = group.split(',').map((o) => {
                    const el = decodeUriComponent(o).split(':');

                    return {
                        parent: el[0],
                        child: el.splice(1).join(':'),
                        uuid: uuidv4(),
                        isLogic: false,
                    };
                });

                // do not hoist it, uuid need to be different
                const logic = {
                    parent: '-OR-',
                    child: '',
                    uuid: uuidv4(),
                    isLogic: true,
                };

                return [
                    ...p,
                    ...(group ? chips : []),
                    logic, // will add an extra logic el on the last iteration
                ];
            }, []).slice(0, -1); // remove last added `-OR-`
        }

        if (!isEqual(selectedItem, newSelectedItem)) {
            setState({
                selectedItem: newSelectedItem,
                toUpdate: false,
            });
        }
    }

    handleKeyDown = (event) => {
        const {setState, inputValue, selectedItem} = this.props;

        if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
            const l = selectedItem.length;

            if (l) {
                const newSelectedItems = selectedItem.slice(0, l - 1);
                const last = selectedItem[l - 1];

                setState({
                    selectedItem: newSelectedItems,
                    isParent: true,
                    item: '',
                    toUpdate: !(last.isLogic || !last.child),
                });
            }
        }
    };

    handleInputChange = (event) => {
        const {setState} = this.props;

        setState({
            inputValue: event.target.value,
            toUpdate: false,
        });
    };

    handleChange = (item) => {
        const {
            parentSuggestions, isParent, selectedItem,
            setState,
        } = this.props;

        let newSelectedItem,
            toUpdate = false;

        if (!isParent) { // remove precedent parent and add child
            const prev = selectedItem.pop();
            newSelectedItem = [...selectedItem, {...prev, child: item.label}];
            toUpdate = true;
        }
        // if is parent, simply add
        else {
            newSelectedItem = [
                ...selectedItem, {
                    parent: item.label,
                    child: '',
                    uuid: uuidv4(),
                    isLogic: item.isLogic,
                }];
        }

        // calculate if previous in parent menu
        const selectedParent = parentSuggestions.map(o => o.label).includes(item.label);

        // set item in redux, and launch related sagas for fetching list if needed
        setState({
            isParent: item.isLogic || !selectedParent,
            inputValue: '',
            selectedItem: newSelectedItem,
            item: selectedParent || item.isLogic ? item.label : '',
            toUpdate,
        });
    };

    handleDelete = item => () => {
        const {setState, selectedItem} = this.props;

        // remove empty parent, the item we want to delete
        let newSelectedItems = selectedItem.filter(o => !(
            (o.child === '' && !o.isLogic) // remove parent without child
            || o.uuid === item.uuid), // remove item clicked

        );

        // remove -OR- item if not a chip before (i.e nothing or another -OR-)
        newSelectedItems = newSelectedItems.filter((o, i) => !(
            o.isLogic && i === 0 // remove first item if isLogic
            || o.isLogic && i > 0 && newSelectedItems[i - 1].isLogic), // remove isLogic if precedent isLogic

        );

        // need to setItem correctly after deleting
        const l = newSelectedItems.length,
            last = l ? newSelectedItems[l - 1] : undefined;

        setState({
            selectedItem: newSelectedItems,
            isParent: true,
            item: last && last.isLogic ? '-OR-' : '',
            toUpdate: true,
        });

        this.clickInput();
    };

    handleOuterClick = () => {
        const {setState, inputValue} = this.props;

        if (inputValue) {
            setState({
                inputValue: '',
            });
        }
    };

    clear = () => {
        const {setState} = this.props;

        setState({
            selectedItem: [],
            isParent: true,
            item: '',
            toUpdate: true,
        });

        this.clickInput();
    };

    clickInput = () => {
        setTimeout(() => {
            // should appear after blur of input (need to call setTimeout as downshift does)
            // stay on focus
            this.input.current.focus();
        }, 0);
    };

    searchInput = (props) => {
        const {suggestions, placeholder} = this.props;

        // due to ugly render props philosophy of Downshift, we have to extract the declaration in a function...
        return (
            <SearchInputWrapper {...props.getRootProps({refKey: 'innerRef'})}>
                <SearchInput
                    handleKeyDown={this.handleKeyDown}
                    handleInputChange={this.handleInputChange}
                    handleDelete={this.handleDelete}
                    suggestions={suggestions}
                    clickInput={this.clickInput}
                    input={this.input}
                    placeholder={placeholder}
                    {...props}
                />
            </SearchInputWrapper>
        );
    };

    itemToString = item => item === null ? '' : item.label;

    render() {
        const {inputValue, selectedItem} = this.props;

        return (
            <InputWrapper>
                <Downshift
                    {/* ids need to be explicitely set to avoid SSR issue */}
                    id="searchbar-autocomplete"
                    labelId="searchbar-autocomplete-label"
                    inputId="searchbar-autocomplete-input"
                    menuId="searchbar-autocomplete-menu"
                    inputValue={inputValue}
                    onChange={this.handleChange}
                    onOuterClick={this.handleOuterClick}
                    selectedItem={selectedItem}
                    itemToString={this.itemToString}
                >
                    {this.searchInput}
                </Downshift>

                <IconButton
                    Icon={ClearIcon}
                    iconSize={18}
                    onClick={this.clear}
                    className={clearButton}
                />
            </InputWrapper>
        );
    }
}

SearchBar.propTypes = {
    location: PropTypes.shape({
        query: PropTypes.shape({
            search: PropTypes.string,
        }),
    }),
    suggestions: PropTypes.arrayOf(PropTypes.shape({})),
    parentSuggestions: PropTypes.arrayOf(PropTypes.shape({})),
    setState: PropTypes.func,
    inputValue: PropTypes.string,
    selectedItem: PropTypes.arrayOf(PropTypes.shape({
        isLogic: PropTypes.bool,
        child: PropTypes.string,
    })),
    isParent: PropTypes.bool,
    placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
    location: null,
    suggestions: [],
    parentSuggestions: [],
    setState: noop,
    inputValue: '',
    selectedItem: [],
    isParent: true,
    placeholder: '',
};

export default SearchBar;
