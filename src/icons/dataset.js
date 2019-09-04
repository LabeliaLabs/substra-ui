import React from 'react';
import PropTypes from 'prop-types';
import {slate} from '../variables/colors';

const Dataset = ({
                       className, width, height, color, ...props
                   }) => (
                       <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width={width}
                           height={height}
                           viewBox="0 0 23 25"
                           className={className}
                           {...props}
                       >
                           <g fill="none" fillRule="nonzero" stroke={color}>
                               <path d="M11.552 1c2.967 0 5.688.448 7.584 1.222.948.366 1.73.814 2.226 1.302.494.449.741.938.741 1.426 0 .489-.247.936-.741 1.425-.495.448-1.278.896-2.226 1.303-1.937.733-4.616 1.222-7.584 1.222S5.864 8.41 3.968 7.678c-.948-.366-1.731-.814-2.226-1.303C1.247 5.886 1 5.44 1 4.95c0-.488.248-.937.742-1.426.495-.447 1.278-.895 2.226-1.302C5.905 1.448 8.584 1 11.552 1z" />
                               <path d="M1 6c.083.117.206.195.289.311.577.506 1.442.974 2.431 1.362 2.02.74 4.782 1.207 7.832 1.207s5.812-.467 7.831-1.207c1.03-.388 1.855-.817 2.432-1.362.124-.077.206-.194.288-.311v4.125c0 .467-.247.895-.741 1.362-.495.428-1.278.857-2.226 1.245-1.937.701-4.616 1.168-7.584 1.168s-5.688-.467-7.584-1.168c-.948-.35-1.731-.778-2.226-1.245C1.247 11.02 1 10.592 1 10.125V6z" />
                               <path d="M1 11c.083.117.206.194.289.311.577.506 1.442.973 2.431 1.362 2.02.74 4.782 1.207 7.832 1.207s5.812-.467 7.831-1.207c1.03-.389 1.855-.817 2.432-1.362.124-.078.206-.194.288-.311v4.125c0 .467-.247.895-.741 1.362-.495.428-1.278.856-2.226 1.245-1.937.7-4.616 1.168-7.584 1.168s-5.688-.468-7.584-1.168c-.948-.35-1.731-.778-2.226-1.245C1.247 16.02 1 15.592 1 15.125V11z" />
                               <path d="M1 16c.083.117.206.195.289.311.577.506 1.442.973 2.431 1.362 2.02.74 4.782 1.207 7.832 1.207s5.812-.467 7.831-1.207c1.03-.389 1.855-.817 2.432-1.362.124-.077.206-.194.288-.311v4.125c0 .467-.247.895-.741 1.362-.495.428-1.278.856-2.226 1.245-1.937.701-4.616 1.168-7.584 1.168s-5.688-.467-7.584-1.168c-.948-.35-1.731-.778-2.226-1.245C1.247 21.02 1 20.592 1 20.125V16z" />
                           </g>
                       </svg>
);

Dataset.defaultProps = {
    className: '',
    width: 23,
    height: 25,
    color: slate,
};

Dataset.propTypes = {
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string,
};

export default Dataset;
