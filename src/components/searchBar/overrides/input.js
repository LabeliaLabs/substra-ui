import React, {Component} from 'react';
import styled from '@emotion/styled';
import {css} from 'emotion';
import {noop} from 'lodash';

import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from '../../../utils/propTypes';

import {match, parse} from './utils/autosuggest-highlight';

import {theme} from '../../../utils/muiTheme';

const Logic = styled('span')`
    color: #1935a7;
    margin: 0 auto;
    font-weight: bold;
`;

// Supports determination of isControlled().
// Controlled input accepts its current value as a prop.
//
// @see https://facebook.github.io/react/docs/forms.html#controlled-components
// @param value
// @returns {boolean} true if string (including '') or number (including zero)
export function hasValue(value) {
    return value != null && !(Array.isArray(value) && value.length === 0);
}

// Determine if field is empty or filled.
// Response determines if label is presented above field or as placeholder.
//
// @param obj
// @param SSR
// @returns {boolean} False when not present or empty string.
//                    True when any number or string with length.
export function isFilled(obj, SSR = false) {
    return (
        obj
        && ((hasValue(obj.value) && obj.value !== '')
            || (SSR && hasValue(obj.defaultValue) && obj.defaultValue !== ''))
    );
}

// Determine if an Input is adorned on start.
// It's corresponding to the left with LTR.
//
// @param obj
// @returns {boolean} False when no adornments.
//                    True when adorned at the start.
export function isAdornedStart(obj) {
    return obj.startAdornment;
}

const light = theme.palette.type === 'light';
const placeholder = `
        color: 'currentColor';
        opacity: ${light ? 0.42 : 0.5};
        transition: ${theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
})};
    `;

const styles = {
    /* Styles applied to the root element. */
    root: disabled => css`
        // Mimics the default input display property used by browsers for an input.
        display: block;
        position: relative;
        cursor: text;
        font-family: ${theme.typography.fontFamily};
        color: ${light ? 'rgba(0, 0, 0, 0.87)' : theme.palette.common.white};
        font-size: ${theme.typography.pxToRem(16)};
        line-height: 1.1875em; // Reset (19px), match the native input line-height
        ${disabled ? `
            color: ${theme.palette.text.disabled};
        ` : ''}
    `,
    /* Styles applied to the root element if `fullWidth={true}`. */
    fullWidth: css`
        width: 100%;
    `,
    /* Styles applied to the `input` Wrapper element. */
    inputWrapper: css`
        width: 200px;
        display: inline-block;
    `,
    /* Styles applied to the `input` element. */
    input: disabled => css`
        font: inherit;
        color: currentColor;
        padding: 0;
        border: 0;
        box-sizing: content-box;
        vertical-align: middle;
        background: none;
        margin: 0; // Reset for Safari
        // Remove grey highlight
        -webkit-tap-highlight-color: transparent;
        display: block;
        // Make the flex item shrink with Firefox
        min-width: 0;
        flex-grow: 1;
        &::-webkit-input-placeholder {${placeholder}};
        &::-moz-placeholder {${placeholder}}; // Firefox 19+
        &:-ms-input-placeholder {${placeholder}}; // IE 11
        &::-ms-input-placeholder {${placeholder}}; // Edge
        &:focus {
            outline: 0;
        }
        // Reset Firefox invalid required input style
        &:invalid {
            box-shadow: none;
        }
        &::-webkit-search-decoration {
            // Remove the padding when type=search.
            -webkit-appearance: none;
        },
        
        ${disabled ? 'opacity: 1;' : ''} // Reset iOS opacity
    `,
    /* Styles applied to the `input` element if `margin="dense"`. */
    inputMarginDense: css`
        padding-top: ${4 - 1}px;
    `,
    /* Styles applied to the `input` element if `type` is not "text"`. */
    inputType: css`
        // type="date" or type="time", etc. have specific styles we need to reset.
        height: 1.1875em; // Reset (19px), match the native input line-height
    `,
    /* Styles applied to the `input` element if `type="search"`. */
    inputTypeSearch: css`
        // Improve type search style.
        -moz-appearance: textfield;
        -webkit-appearance: textfield;
    `,
    paper: css`
        //max-width: 200px;
    `,
    popper: css`
        z-index: 2;
    `,
    highligthed: css`
        font-weight: bold;
    `,
};

function formControlState(props, context) {
    let disabled = props.disabled;
    let error = props.error;
    let margin = props.margin;
    let required = props.required;

    if (context && context.muiFormControl) {
        if (typeof disabled === 'undefined') {
            disabled = context.muiFormControl.disabled;
        }
        if (typeof error === 'undefined') {
            error = context.muiFormControl.error;
        }
        if (typeof margin === 'undefined') {
            margin = context.muiFormControl.margin;
        }
        if (typeof required === 'undefined') {
            required = context.muiFormControl.required;
        }
    }

    return {
        disabled,
        error,
        margin,
        required,
    };
}

class Input extends Component {
    isControlled = this.props.value != null;

    input = null; // Holds the input reference

    constructor(props, context) {
        super(props, context);

        if (this.isControlled) {
            this.checkDirty(props);
        }

        const componentWillReceiveProps = (nextProps, nextContext) => {
            // The blur won't fire when the disabled state is set on a focused input.
            // We need to book keep the focused state manually.
            if (
                !formControlState(this.props, this.context).disabled
                && formControlState(nextProps, nextContext).disabled
            ) {
                this.setState({
                    focused: false,
                });
            }
        };

        const componentWillUpdate = (nextProps, nextState, nextContext) => {
            // Book keep the focused state.
            if (
                !formControlState(this.props, this.context).disabled
                && formControlState(nextProps, nextContext).disabled
            ) {
                const {muiFormControl} = this.context;
                if (muiFormControl && muiFormControl.onBlur) {
                    muiFormControl.onBlur();
                }
            }
        };

        // Support for react >= 16.3.0 && < 17.0.0
        /* istanbul ignore else */
        if (React.createContext) {
            this.UNSAFE_componentWillReceiveProps = componentWillReceiveProps;
            this.UNSAFE_componentWillUpdate = componentWillUpdate;
        }
        else {
            this.componentWillReceiveProps = componentWillReceiveProps;
            this.componentWillUpdate = componentWillUpdate;
        }
    }

    state = {
        focused: false,
    };

    getChildContext() {
        // We are consuming the parent muiFormControl context.
        // We don't want a child to consume it a second time.
        return {
            muiFormControl: null,
        };
    }

    componentDidMount() {
        if (!this.isControlled) {
            this.checkDirty(this.inputRef);
        }
    }

    componentDidUpdate() {
        if (this.isControlled) {
            this.checkDirty(this.props);
        } // else performed in the onChange
    }

    handleFocus = event => {
        // Fix a bug with IE11 where the focus/blur events are triggered
        // while the input is disabled.
        if (formControlState(this.props, this.context).disabled) {
            event.stopPropagation();
            return;
        }

        this.setState({focused: true});
        if (this.props.onFocus) {
            this.props.onFocus(event);
        }

        const {muiFormControl} = this.context;
        if (muiFormControl && muiFormControl.onFocus) {
            muiFormControl.onFocus(event);
        }
    };

    handleBlur = event => {
        this.setState({focused: false});
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }

        const {muiFormControl} = this.context;
        if (muiFormControl && muiFormControl.onBlur) {
            muiFormControl.onBlur(event);
        }
    };

    handleChange = event => {
        if (!this.isControlled) {
            this.checkDirty(this.inputRef);
        }

        // Perform in the willUpdate
        if (this.props.onChange) {
            this.props.onChange(event);
        }
    };

    handleRefInputWrapper = ref => {
        this.inputWrapperRef = ref;

        let refProp;

        if (this.props.inputWrapperRef) {
            refProp = this.props.inputWrapperRef;
        }
        else if (this.props.inputWrapperProps && this.props.inputWrapperProps.ref) {
            refProp = this.props.inputWrapperProps.ref;
        }

        if (refProp) {
            if (typeof refProp === 'function') {
                refProp(ref);
            }
            else {
                refProp.current = ref;
            }
        }
    };

    handleRefInput = ref => {
        this.inputRef = ref;

        let refProp;

        if (this.props.inputRef) {
            refProp = this.props.inputRef;
        }
        else if (this.props.inputProps && this.props.inputProps.ref) {
            refProp = this.props.inputProps.ref;
        }

        if (refProp) {
            if (typeof refProp === 'function') {
                refProp(ref);
            }
            else {
                refProp.current = ref;
            }
        }
    };

    checkDirty(obj) {
        const {muiFormControl} = this.context;

        if (isFilled(obj)) {
            if (muiFormControl && muiFormControl.onFilled) {
                muiFormControl.onFilled();
            }
            if (this.props.onFilled) {
                this.props.onFilled();
            }
            return;
        }

        if (muiFormControl && muiFormControl.onEmpty) {
            muiFormControl.onEmpty();
        }
        if (this.props.onEmpty) {
            this.props.onEmpty();
        }
    }

    applyReactStyle = data => data;

    modifiers = {
        applyStyle: {fn: this.applyReactStyle}, // force positioning
    };

    menuItem = isLogic => isLogic ? css`
            border-bottom: 1px solid #dcdcdc;
            padding: 4px 0;
        ` : '';

    render() {
        const {
            autoComplete,
            autoFocus,
            className: classNameProp, // eslint-disable-line no-unused-vars
            classes,
            defaultValue,
            disableUnderline,
            endAdornment,
            fullWidth,
            id,
            inputComponent,
            inputProps: {className: inputPropsClassName, ...inputPropsProp} = {}, // eslint-disable-line no-unused-vars
            inputWrapperProps: {className: inputWrapperPropsClassName, ...inputWrapperPropsProp} = {}, // eslint-disable-line no-unused-vars
            name,
            onKeyDown,
            onKeyUp,
            placeholder,
            readOnly,
            startAdornment,
            type,
            value,
            isOpen,
            getItemProps,
            inputValue,
            highlightedIndex,
            suggestions,
            inputRef, // eslint-disable-line no-unused-vars
            inputWrapperRef, // eslint-disable-line no-unused-vars
            error: errorProp, // eslint-disable-line no-unused-vars
            onEmpty, // eslint-disable-line no-unused-vars
            onFilled, // eslint-disable-line no-unused-vars
            ...other
        } = this.props;

        const {muiFormControl} = this.context;
        const {
            disabled, error, margin, required,
        } = formControlState(this.props, this.context);

        const className = css`
            ${styles.root(disabled)};
            ${fullWidth ? styles.fullWidth : ''};
            ${muiFormControl ? styles.formControl : ''};
            ${!disableUnderline ? styles.underline(disabled, this.state.focused, error) : ''};            
        `;
        const inputClassName = css`
            ${styles.input(disabled)};
            ${type !== 'text' ? styles.inputType : ''};
            ${type === 'search' ? styles.inputTypeSearch : ''};
            ${margin === 'dense' ? styles.inputMarginDense : ''};
            ${classes.input}
        `;

        const inputwrapperClassName = css`
            ${styles.inputWrapper};
            ${classes.inputWrapper}
        `;

        const inputWrapperProps = {
            ...inputWrapperPropsProp,
            ref: this.handleRefInputWrapper,
        };

        let InputComponent = 'input';
        let inputProps = {
            ...inputPropsProp,
            ref: this.handleRefInput,
        };

        if (inputComponent) {
            InputComponent = inputComponent;
            inputProps = {
                // Rename ref to inputRef as we don't know the
                // provided `inputComponent` structure.
                inputRef: this.handleRefInput,
                ...inputProps,
                ref: null,
            };
        }

        return (
            <div className={className} {...other}>
                {startAdornment}
                <div className={inputwrapperClassName} {...inputWrapperProps}>
                    <InputComponent
                        aria-invalid={error}
                        autoComplete={autoComplete}
                        autoFocus={autoFocus}
                        className={inputClassName}
                        defaultValue={defaultValue}
                        disabled={disabled}
                        id={id}
                        name={name}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        required={required}
                        type={type}
                        value={value}
                        {...inputProps}
                    />
                    <Popper
                        open={isOpen}
                        className={styles.popper}
                        anchorEl={this.inputRef}
                        container={this.inputWrapperRef}
                        placement="bottom-start"
                        modifiers={this.modifiers}
                    >
                        <Paper square className={styles.paper}>
                            {suggestions(inputValue).map((suggestion, index) => {
                                const isHighlighted = highlightedIndex === index;
                                const itemProps = getItemProps({item: suggestion});

                                const highlighted = parse(suggestion.label, match(suggestion.label, inputValue, {insideWords: true}));

                                return (
                                    <MenuItem
                                        {...itemProps}
                                        key={suggestion.uuid || suggestion.label}
                                        selected={isHighlighted}
                                        component="div"
                                        className={this.menuItem(suggestion.isLogic)}
                                    >
                                        {
                                            suggestion.isLogic
                                            ? (
                                                <Logic>
                                                    {suggestion.label}
                                                </Logic>
)

                                            : highlighted.map((o, i) => o.highlight
                                                ? (
                                                    <span key={i} className={styles.highligthed}>
                                                        {decodeURIComponent(o.text)}
                                                    </span>
)
                                                : decodeURIComponent(o.text))
                                        }
                                    </MenuItem>
                                );
                            })}
                        </Paper>
                    </Popper>
                </div>
                {endAdornment}
            </div>
        );
    }
}

Input.propTypes = {
    /**
     * This property helps users to fill forms faster, especially on mobile devices.
     * The name can be confusing, as it's more like an autofill.
     * You can learn more about it here:
     * https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
     */
    autoComplete: PropTypes.string,
    /**
     * If `
     true`, the input will be focused during the first mount.
     */
    autoFocus: PropTypes.bool,
    /**
     * Override or extend the styles applied to the component.
     * See [CSS API](#css-api) below for more details.
     */
    classes: PropTypes.shape({
        input: PropTypes.string,
        inputWrapper: PropTypes.string,
    }).isRequired,
    /**
     * The CSS class name of the wrapper element.
     */
    className: PropTypes.string,
    /**
     * The default input value, useful when not controlling the component.
     */
    // eslint-disable-next-line react/require-default-props
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * If `
     true`, the input will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * If `
     true`, the input will not have an underline.
     */
    disableUnderline: PropTypes.bool,
    /**
     * End `
     InputAdornment` for this component.
     */
    endAdornment: PropTypes.node,
    /**
     * If `
     true`, the input will indicate an error. This is normally obtained via context from
     * FormControl.
     */
    error: PropTypes.bool,
    /**
     * If `
     true`, the input will take up the full width of its container.
     */
    fullWidth: PropTypes.bool,
    /**
     * The id of the `
     input` element.
     */
    id: PropTypes.string,
    /**
     * The component used for the native input.
     * Either a string to use a DOM element or a component.
     */
    inputComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.shape({})]),
    /**
     * Attributes applied to the `
     input` element.
     */
    inputProps: PropTypes.shape({
        ref: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
    }),
    /**
     * Attributes applied to the wrapper of the `
     input` element.
     */
    inputWrapperProps: PropTypes.shape({
        ref: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
    }),
    /**
     * Use that property to pass a ref callback to the native input component.
     */
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
    /**
     * Use that property to pass a ref callback to wrapper of the native input component.
     */
    inputWrapperRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({})]),
    /**
     * If `
     dense`, will adjust vertical spacing. This is normally obtained via context from
     * FormControl.
     */
    margin: PropTypes.oneOf(['dense', 'none']),
    /**
     * Name attribute of the `
     input` element.
     */
    name: PropTypes.string,
    /**
     * @ignore
     */
    onBlur: PropTypes.func,
    /**
     * Callback fired when the value is changed.
     *
     * @param {object} event The event source of the callback.
     * You can pull out the new value by accessing `
     event.target.value`.
     */
    onChange: PropTypes.func,
    /**
     * @ignore
     */
    onEmpty: PropTypes.func,
    /**
     * @ignore
     */
    onFilled: PropTypes.func,
    /**
     * @ignore
     */
    onFocus: PropTypes.func,
    /**
     * @ignore
     */
    onKeyDown: PropTypes.func,
    /**
     * @ignore
     */
    onKeyUp: PropTypes.func,
    /**
     * The short hint displayed in the input before the user enters a value.
     */
    placeholder: PropTypes.string,
    /**
     * It prevents the user from changing the value of the field
     * (not from interacting with the field).
     */
    readOnly: PropTypes.bool,
    /**
     * If `
     true`, the input will be required.
     */
    required: PropTypes.bool,
    /**
     * Start `
     InputAdornment` for this component.
     */
    startAdornment: PropTypes.node,
    /**
     * Type of the input element. It should be a valid HTML5 input type.
     */
    type: PropTypes.string,
    /**
     * The input value, required for a controlled component.
     */
    // eslint-disable-next-line react/require-default-props
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ]),
    /**
     * Display the dropdown list
     */
    isOpen: PropTypes.bool,
    /**
     * Get item props for the dropdown list menu itens
     */
    getItemProps: PropTypes.func,
    /**
     * The input value given from the user for filtering on suggestions
     */
    inputValue: PropTypes.string,
    /**
     * The index to know which to highlight
     */
    highlightedIndex: PropTypes.number,
    /**
     * Function for getting suggestions
     */
    suggestions: PropTypes.func,
};

Input.muiName = 'Input';

Input.defaultProps = {
    disableUnderline: false,
    fullWidth: false,
    type: 'text',

    autoComplete: 'off',
    autoFocus: false,
    className: '',
    disabled: false,
    endAdornment: '',
    error: false,
    id: '',
    inputComponent: '',
    inputProps: {},
    inputWrapperProps: {},
    inputRef: noop,
    inputWrapperRef: noop,
    margin: 'none',
    name: '',
    onBlur: noop,
    onChange: noop,
    onEmpty: noop,
    onFilled: noop,
    onFocus: noop,
    onKeyDown: noop,
    onKeyUp: noop,
    placeholder: '',
    readOnly: false,
    required: false,
    startAdornment: '',

    isOpen: false,
    getItemProps: noop,
    inputValue: '',
    highlightedIndex: 0,
    suggestions: noop,
};

Input.contextTypes = {
    muiFormControl: PropTypes.shape({}),
};

Input.childContextTypes = {
    muiFormControl: PropTypes.shape({}),
};

export default Input;
