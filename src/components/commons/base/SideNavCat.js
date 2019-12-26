import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Collapse, Waves} from 'mdbreact';

class SideNavCat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursorPos: {},
            isOpenID: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        if (this.props.startOpen && this.props.onClick) {
            this.props.onClick(this.props.id);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isOpen !== this.props.isOpen) {
            this.setState({
                isOpenID: this.props.isOpen ? this.props.id : ''
            });
        }
    }

    handleClick(e, id) {
        if (!this.props.disabled) {
            // Waves - Get Cursor Position
            const cursorPos = {
                top: e.clientY,
                left: e.clientX,
                time: Date.now()
            };
            this.setState({cursorPos: cursorPos});
            // do the passed in callback:
            if (this.props.onClick) {
                this.props.onClick(id);
            }
            e.stopPropagation();
        }
    }

    render() {
        const {
            tag: Tag,
            children,
            className,
            name,
            icon,
            disabled,
            isOpen,
            id,
            ...attributes
        } = this.props;

        const classes = classNames(
            'collapsible-header',
            'Ripple-parent',
            'arrow-r',
            isOpen && 'active',
            disabled && 'disabled',
            className
        );

        return (
            <Tag>
                <a
                    className={classes}
                    onClick={e => this.handleClick(e, id)}
                    {...attributes}
                >
                    {icon && <i className={`fa fa-${icon}`}>&nbsp;</i>}
                    {name}
                    <i className="fa fa-angle-down rotate-icon" />
                    <Waves cursorPos={this.state.cursorPos} />
                </a>
                <Collapse id={id} isOpen={this.state.isOpenID}>
                    <div className="collapsible-body" style={{display: 'block'}}>
                        <ul>{children}</ul>
                    </div>
                </Collapse>
            </Tag>
        );
    }
}

SideNavCat.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    id: PropTypes.string,
    isOpen: PropTypes.bool,
    isOpenID: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
    tag: PropTypes.string,
    startOpen: PropTypes.bool
};

SideNavCat.defaultProps = {
    tag: 'li'
};

export default SideNavCat;
export {SideNavCat as MDBSideNavCat};
