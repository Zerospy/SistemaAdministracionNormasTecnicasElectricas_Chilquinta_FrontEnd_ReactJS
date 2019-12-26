import React from 'react';
import PropTypes from 'prop-types';

const CustomTableFoot = props => {
    const {columns} = props;

    return (
        <tr>
            {columns.map((col, index) => (
                <th key={`${col.field}_${index}`} className={'text-right'}>
                    {col.label}
                </th>
            ))}
        </tr>
    );
};

CustomTableFoot.propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.object),
    textWhite: PropTypes.bool
};

CustomTableFoot.defaultProps = {
    textWhite: false
};

export default CustomTableFoot;
