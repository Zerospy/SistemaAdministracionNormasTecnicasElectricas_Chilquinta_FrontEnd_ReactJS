import classNames from 'classnames';
import {Card, CardBody, Col, Collapse, Row} from 'mdbreact';
import React from 'react';
import PropTypes from 'prop-types';

class PanelComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            idComponent: parseInt(Math.random() * 99999999, 10),
            isOpen: props.isOpen ? this.props.isOpen : false,
            collapsable: true
        };
    }

  handleCollapse = () => {
      this.setState({
          isOpen: !this.state.isOpen
      });
  };

  render() {
      const children = this.props.children;
      const isOpen = this.state.isOpen;
      const isCollapsable = this.props.isCollapsable || true;
      const className = this.props.className ? this.props.className : null;
      const title = this.props.title;
      const titleID = this.props.titleID;
      const icon = classNames({
          'fas icon-panel': true,
          'fa-chevron-circle-up': isOpen,
          'fa-chevron-circle-down': !isOpen
      });

      return (
          <Card className={className}>
              <div className="card-header">
                  <Row>
                      <Col className="col-11">{title} {isOpen ? null : titleID}</Col>
                      <Col className="col-1 text-right m-0 noPrint">
                          {isCollapsable ? (
                              <i className={icon} onClick={this.handleCollapse} />
                          ) : null}
                      </Col>
                  </Row>
              </div>
              <Collapse isOpen={isOpen}>
                  <CardBody className="pt-1" id={this.state.idComponent}>
                      {children}
                  </CardBody>
              </Collapse>
          </Card>
      );
  }
}

export default PanelComponent;

PanelComponent.defaultProps = {
    isOpen: true,
  };

PanelComponent.propTypes = {
    children: PropTypes.any,
    isCollapsable: PropTypes.bool,
    title: PropTypes.any,
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    titleID: PropTypes.any
};
