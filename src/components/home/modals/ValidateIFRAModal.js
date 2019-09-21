import React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Fa
} from 'mdbreact';
import {DashboardContext} from 'components/home/DashboardContext';
import ValidateIFRAComponent from 'components/home/ValidateIFRAComponent';
import {Treebeard} from 'react-treebeard';
import FormulaService from 'services/FormulaService';
import PanelComponent from 'components/commons/panels/PanelComponent';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';
import {DEFAULT_THEME} from 'components/home/constants/TreeTheme';

class ValidateIFRAModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validateIfraResult: [],
            jsTreeData: null
        };

        this.formulaService = new FormulaService();
    }

  onToggle = (node, toggled) => {
      const {cursor} = this.state;

      if (cursor) {
          cursor.active = false;
      }
      node.active = true;
      if (node.children) {
          node.toggled = toggled;
      }
      this.setState({cursor: node});
  };

  handleRenderResult(components) {
      const cihldrenComponents = [];

      let isValidGlobal = true;

      components.forEach(component => {
          let isValidComponent = true;

          const validationsDetail = [];

          component.DetalleValidacion.forEach(detVal => {
              const categoriesArray = [];
              let isValidDose = true;

              detVal.DetIfraCategoria.forEach(category => {
                  if (category.EsValido === false) {
                      isValidComponent = false;
                      isValidDose = false;
                      isValidGlobal = false;
                  }

                  const categoriesClasess = classNames({
                      'text-danger': !category.EsValido
                  });

                  categoriesArray.push({
                      name: (
                          <span className={categoriesClasess}>{`Categoria: ${
                              category.Categoria
                          } ${
                              category.EsValido === false
                                  ? `Mensaje: ${category.Mensaje}`
                                  : ''
                          }`}</span>
                      )
                  });
              });

              const dosesClasess = classNames({
                  'text-danger': !isValidDose
              });

              validationsDetail.push({
                  name: (
                      <span className={dosesClasess}>{`Dosis: ${detVal.Dosis}`}</span>
                  ),
                  children: categoriesArray
              });
          });

          const rootClasses = classNames({
              'text-danger': !isValidComponent,
              'text-success': isValidComponent
          });

          if (!isValidComponent) {
              cihldrenComponents.push({
                  name: (
                      <span>
                          <span className={rootClasses}>{component.CodComponente}</span>
                          {' | '}
                          {component.NombreArticulo} | {component.NumCAS}
                          {' | '}
                          {component.NumFEMA}
                          {' | '}
                          {component.Efecto}
                      </span>
                  ),
                  children: validationsDetail
              });
          }
      });

      if (!isValidGlobal) {
          const jsTreeData = {
              name: (
                  <span
                      className={classNames({
                          'text-danger': !isValidGlobal,
                          'text-success': isValidGlobal
                      })}
                  >
            Validación IFRA{' '}
                      {isValidGlobal ? (
                          <Fa icon="check-circle" />
                      ) : (
                          <Fa icon="times-circle" />
                      )}
                  </span>
              ),
              toggled: true,
              children: cihldrenComponents
          };

          this.setState({
              jsTreeData: jsTreeData
          });
      } else {
          this.props.setIsValidIFRA(true);
      }
  }

  componentDidMount() {}

  render() {
      const defaultTheme = DEFAULT_THEME;

      return (
          <DashboardContext.Consumer>
              {dashboardContext => (
                  <React.Fragment>
                      <Modal
                          isOpen={dashboardContext.state.modalValidateIFRA}
                          className="px-3"
                          size="lg"
                      >
                          <ModalHeader>
                              <FormattedMessage id="modal.trial.ifra.title" />
                          </ModalHeader>
                          <ModalBody>
                              <DashboardContext.Provider value={dashboardContext}>
                                  <ValidateIFRAComponent
                                      trialID={dashboardContext.getTrialID()}
                                      onResult={data => {
                                          this.handleRenderResult(data);
                                      }}
                                  />
                              </DashboardContext.Provider>
                          </ModalBody>
                      </Modal>

                      <Modal
                          isOpen={dashboardContext.state.modalValidateIFRAResult}
                          className="px-3"
                          size="lg"
                      >
                          <ModalHeader
                              toggle={dashboardContext.toggleModalValidateIFRAResult}
                          >
                              <FormattedMessage id="modal.trial.ifra.result.title" />
                          </ModalHeader>
                          <ModalBody>
                              <PanelComponent
                                  title={`${this.props.intl.formatMessage({
                                      id: 'modal.trial.ifra.result.panel.title'
                                  })}`}
                              >
                                  {this.state.jsTreeData !== null ? (
                                      <Treebeard
                                          data={this.state.jsTreeData}
                                          onToggle={this.onToggle}
                                          style={defaultTheme}
                                      />
                                  ) : (
                                      <div className="text-center">
                                          <span>
                                              <Fa
                                                  icon="check-circle"
                                                  size="5x"
                                                  className="text-success"
                                              />
                                              <p>
                                                  {' '}
                                                  <FormattedMessage id="modal.trial.ifra.result.success" />
                                              </p>
                                          </span>
                                      </div>
                                  )}
                              </PanelComponent>
                          </ModalBody>
                          <ModalFooter>
                              <Button
                                  color="info"
                                  onClick={() => {
                                      dashboardContext.toggleModalValidateIFRAResult();
                                      this.setState({jsTreeData: null});
                                  }}
                              >
                                  <FormattedMessage id="modal.trial.ifra.result.btn.cancel" />
                              </Button>
                          </ModalFooter>
                      </Modal>
                  </React.Fragment>
              )}
          </DashboardContext.Consumer>
      );
  }
}

export default injectIntl(ValidateIFRAModal);

ValidateIFRAModal.propTypes = {
    setIsValidIFRA: PropTypes.func,
    intl: PropTypes.any
};
