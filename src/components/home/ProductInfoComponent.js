import {Col, Tooltip} from 'mdbreact';
import React from 'react';
import PropTypes from 'prop-types';

class ProductInfoComponent extends React.Component {
    render() {
        const {title, children} = this.props;
        return (
        /* <div className="p-2">
        <div className="border-bottom">
          <small>
            <strong>{title}</strong>
          </small>
        </div>
        <div>
          <label>{children}</label>
        </div>
      </div>*/
            <Col md="2" className="p-2">
                <div className="border-bottom">
                    <small>
                        <strong>{title}</strong>
                    </small>
                </div>
                <div className="">
                    {children && children.length > 40 ? (
                        <Tooltip
                            placement="left"
                            tag="div"
                            component="div"
                            tooltipContent={children}
                            componentClass="text-truncate"
                        >
                            {children}
                        </Tooltip>
                    ) : (
                        children
                    )}
                </div>
            </Col>
        );
    }
}
export default ProductInfoComponent;

ProductInfoComponent.propTypes = {
    title: PropTypes.any,
    children: PropTypes.any
};
