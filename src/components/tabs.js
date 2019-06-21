import React from 'react';
import {css} from 'emotion';
import {
    Tab as ReactTab, Tabs, TabList as ReactTabList, TabPanel,
} from 'react-tabs';
import PropTypes from 'prop-types';
import {
    blueGrey, ice, tealish, white,
} from '../variables/colors';
import {spacingNormal, spacingSmall} from '../variables/spacing';

const tabList = css`
    border-bottom: 1px solid ${ice};
    padding: 0;
    margin: ${spacingNormal} 0;
    display: flex;
    list-style: none;
`;

const tab = color => css`
    padding: ${spacingSmall} ${spacingNormal};
    border: 1px solid transparent;
    cursor: pointer;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    margin-bottom: -1px;

    &.selected {
        border-color: ${ice} ${ice} ${white} ${ice};
        color: ${color};
    }

    &.disabled {
        cursor: not-allowed;
        color: ${blueGrey};
    }
`;

const TabList = props => <ReactTabList className={tabList} {...props} />;

TabList.tabsRole = 'TabList';

const Tab = (props) => {
    console.log(props);
    return <ReactTab className={tab(props.color)} selectedClassName="selected" disabledClassName="disabled" {...props} />;
};

Tab.tabsRole = 'Tab';
Tab.propTypes = {
    color: PropTypes.node,
};
Tab.defaultProps = {
    color: tealish,
};

export {
    Tabs,
    TabList,
    Tab,
    TabPanel,
};
