import {
  Col,
  Container,
  Row,
  Button,
  Fa,
  Collapse,
  CollapseHeader
} from 'mdbreact';
import React from 'react';
import FormulaService from 'services/FormulaService';
import { DashboardContext } from 'components/home/DashboardContext';
import Select from 'react-select';
import * as Util from 'commons/Util.js';
import { toast } from 'react-toastify';
import { IFRA_CATEGORIES } from 'components/home/constants/IfraCategories';
import { IFRA_TRANSLATIONS } from 'components/home/constants/IfraTranslations';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

class ValidateIFRAComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      performanceAmount: '100',
      dose: '',
      listOfCategories: IFRA_CATEGORIES,
      listOfSelectedCategories: [],
      listOfValidations: [],
      loadingInformation: false,
      ifraTranslations: null
    };

    this.formulaService = new FormulaService();

    this.trialID = this.props.trialID;

    this.ifraTranslations = IFRA_TRANSLATIONS;
  }

  validateIFRA = () => {
    if (this.trialID && this.trialID > 0) {
      const detalleValidacion = [];

      const listOfValidations = this.state.listOfValidations;

      listOfValidations.forEach(validation => {
        const listOfCategoriesSelected = [];

        if (validation.categoriesObj.length > 0) {
          validation.categoriesObj.forEach(category => {
            listOfCategoriesSelected.push(category.value);
          });
        }

        detalleValidacion.push({
          Dosis: validation.dose,
          CodCategoriasValidar: listOfCategoriesSelected
        });
      });

      const params = {
        CodFormula: this.trialID,
        Rendimiento: this.state.performanceAmount,
        DetalleValidacion: detalleValidacion
      };

      this.setState({
        loadingInformation: true
      });

      this.formulaService.validateIFRA(params).then(
        response => {
          toast.info(
            `${this.props.intl.formatMessage({
              id: 'modal.trial.ifra.messages.success'
            })}`
          );
          this.setState(
            {
              loadingInformation: false
            },
            () => {
              const { onResult } = this.props;

              if (typeof onResult === 'function') {
                const data = response.data;
                onResult(data);
              }
            }
          );
          this.toggleModalValidateIFRA();
          setTimeout(() => {
            this.toggleModalValidateIFRAResult();
          }, '1000');
        },
        errorResponse => {
          console.error(errorResponse);
          this.toggleModalValidateIFRA();
          toast.error(
            `${this.props.intl.formatMessage({
              id: 'modal.trial.ifra.messages.error'
            })}`
          );
          this.setState({
            loadingInformation: false
          });
        }
      );
    }
  };

  checkSelectedItems = () => {
    const resultCategories = [];
    const listOfValidations = this.state.listOfValidations;
    const listOfCategoriesSelected = [];

    if (listOfValidations.length > 0) {
      listOfValidations.forEach(item => {
        if (item.categoriesObj.length > 0) {
          item.categoriesObj.forEach(category => {
            listOfCategoriesSelected.push(category);
          });
        }
      });
    }

    IFRA_CATEGORIES.forEach(category => {
      const exist = listOfCategoriesSelected.some(
        categorySelected =>
          JSON.stringify(categorySelected) === JSON.stringify(category)
      );

      if (!exist) {
        resultCategories.push(category);
      }
    });

    this.setState({
      listOfCategories: resultCategories
    });
  };

  componentDidMount() {
    this.setState({
      listOfValidations: []
    });
  }

  render() {
    const listOfCategories = [];

    this.state.listOfCategories.forEach(item => {
      if (!item.isSelected) {
        listOfCategories.push(item);
      }
    });

    return (
      <DashboardContext.Consumer>
        {dashboardContext => {
          this.toggleModalValidateIFRA =
            dashboardContext.toggleModalValidateIFRA;

          this.toggleModalValidateIFRAResult =
            dashboardContext.toggleModalValidateIFRAResult;

          return (
            <Container fluid={true}>
              <Row>
                <Col className="col-12">
                  <Row className="mb-3">
                    <Col className="col-3">
                      <label>
                        {' '}
                        <FormattedMessage id="modal.trial.ifra.label.performance" />
                      </label>
                    </Col>
                    <Col className="col-2">
                      <input
                        type="number"
                        className="form-control col-md-9"
                        maxLength={3}
                        min={1}
                        max={100}
                        value={this.state.performanceAmount}
                        onChange={event => {
                          let value = event.target.value;
                          value = value.replace(/\D/gi, '');
                          const valueInt = parseInt(value, 10);
                          value = valueInt > 0 ? value : '';
                          value = valueInt > 100 ? 100 : value;

                          this.setState({
                            performanceAmount: value
                          });
                        }}
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col className="col-3">
                      <label>
                        <FormattedMessage id="modal.trial.ifra.label.dose" />
                      </label>
                    </Col>
                    <Col className="col-2">
                      <input
                        type="number"
                        className="form-control"
                        maxLength={3}
                        min={0}
                        max={100}
                        value={this.state.dose}
                        onChange={event => {
                          let value = event.target.value;
                          const valueFloat = parseFloat(value, 10);
                          value = valueFloat >= 0 ? value : '';
                          value = valueFloat > 100 ? 100 : value;

                          this.setState({
                            dose: value
                          });
                        }}
                      />
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col className="col-3">
                      <label>
                        <FormattedMessage id="modal.trial.ifra.label.categories" />
                      </label>
                    </Col>
                    <Col className="col-7">
                      <Select
                        isMulti
                        placeholder={`${this.props.intl.formatMessage({
                          id: 'dashboard.select.importComponent.material'
                        })}`}
                        isClearable={true}
                        value={this.state.listOfSelectedCategories}
                        onChange={item => {
                          this.setState({
                            listOfSelectedCategories: item
                          });
                        }}
                        options={listOfCategories}
                      />
                    </Col>
                    <Col className="col-2">
                      <Button
                        className="m-0"
                        color="primary"
                        size="md"
                        disabled={
                          this.state.listOfSelectedCategories.length === 0 ||
                          !this.state.dose
                        }
                        onClick={() => {
                          const dose = this.state.dose;
                          const listOfSelectedCategories = this.state
                            .listOfSelectedCategories;
                          const listOfValidations = this.state
                            .listOfValidations;

                          const categories = [];

                          listOfSelectedCategories.forEach(item => {
                            categories.push(item.label);
                          });

                          listOfValidations.push({
                            dose,
                            categoriesObj: listOfSelectedCategories,
                            categories: categories.join(', ')
                          });

                          this.setState(
                            {
                              dose: '',
                              listOfSelectedCategories: [],
                              listOfValidations: listOfValidations
                            },
                            () => {}
                          );
                        }}
                      >
                        <FormattedMessage id="modal.trial.ifra.button.add" />
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="mb-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <FormattedMessage id="modal.trial.ifra.datagrid.dose" />
                      </th>
                      <th>
                        <FormattedMessage id="modal.trial.ifra.datagrid.categories" />
                      </th>
                      <th>
                        <FormattedMessage id="modal.trial.ifra.datagrid.delete" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.listOfValidations.map(
                      (itemValidation, index) => (
                        <tr key={index}>
                          <td>{Util.numberFormat(itemValidation.dose)}</td>
                          <td>{itemValidation.categories}</td>
                          <td>
                            <Button
                              className="m-0"
                              color="danger"
                              size="md"
                              onClick={() => {
                                let listOfValidations = [];

                                listOfValidations = this.state.listOfValidations.filter(
                                  elem =>
                                    JSON.stringify(elem) !==
                                    JSON.stringify(itemValidation)
                                );

                                this.setState(
                                  {
                                    listOfValidations: listOfValidations
                                  },
                                  () => {}
                                );
                              }}
                            >
                              <Fa icon="times" />
                            </Button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </Row>

              <Row className="d-flex justify-content-end">
                <Button
                  color="cancel"
                  onClick={dashboardContext.toggleModalValidateIFRA}
                >
                  <FormattedMessage id="modal.trial.ifra.button.cancel" />
                </Button>
                <Button
                  disabled={
                    this.state.loadingInformation ||
                    this.state.listOfValidations.length === 0
                  }
                  onClick={this.validateIFRA}
                >
                  {!this.state.loadingInformation ? (
                    `${this.props.intl.formatMessage({
                      id: 'modal.trial.ifra.button.validate'
                    })}`
                  ) : (
                    <Fa icon="spinner" className="fa-spin" />
                  )}
                </Button>
              </Row>
              <Row>
                <Col className="mt-3">
                  <CollapseHeader
                    onClick={() => {
                      if (this.state.ifraTranslations === null) {
                        this.setState({
                          ifraTranslations: 'ifraTranslations'
                        });
                      } else {
                        this.setState({
                          ifraTranslations: null
                        });
                      }
                    }}
                  >
                    <FormattedMessage id="modal.trial.ifra.label.categoriesDesc" />
                    <i
                      className={
                        this.state.ifraTranslations === 'ifraTranslations'
                          ? 'ml-3 fa fa-angle-up'
                          : 'ml-3 fa fa-angle-down'
                      }
                    />
                  </CollapseHeader>
                  <Collapse
                    id="ifraTranslations"
                    isOpen={this.state.ifraTranslations}
                    className="ifra-categories-desc"
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Código</th>
                          <th>Español</th>
                          <th>Portugués</th>
                          <th>Inglés</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.ifraTranslations.map((item, index) => (
                          <tr key={index}>
                            <td>{item.categoryCode}</td>
                            <td>{item.spanish}</td>
                            <td>{item.portuguese}</td>
                            <td>{item.english}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Collapse>
                </Col>
              </Row>
            </Container>
          );
        }}
      </DashboardContext.Consumer>
    );
  }
}

export default injectIntl(ValidateIFRAComponent);

ValidateIFRAComponent.propTypes = {
  trialID: PropTypes.any,
  intl: PropTypes.any,
  onResult: PropTypes.any
};
