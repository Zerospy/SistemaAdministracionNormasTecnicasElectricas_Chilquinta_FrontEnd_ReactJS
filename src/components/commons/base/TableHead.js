import React from 'react';
import PropTypes from 'prop-types';

const CustomTableHead = props => {
    const {columns} = props;

    return (
        <tr>
            {columns.map(col => (
                <td key={col.field} className={col.minimal ? `th-${col.minimal}` : ''}>
                    {col.label}
                </td>
            ))}
        </tr>
    );
};

CustomTableHead.propTypes = {
    children: PropTypes.node,
    color: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.object),
    textWhite: PropTypes.bool
};

CustomTableHead.defaultProps = {
    textWhite: false
};

export default CustomTableHead;
