import {Col, Container, Input, Row, Button, Fa} from 'mdbreact';
import React from 'react';
import FormulaService from 'services/FormulaService';
import TrialService from 'services/TrialService';
import {toast} from 'react-toastify';
import Select from 'react-select';
import {DashboardContext} from 'components/home/DashboardContext';
import LoadingComponent from 'components/commons/base/LoadingComponent';
import PropTypes from 'prop-types';
import {FormattedMessage, injectIntl} from 'react-intl';

class OfficializeFormulaComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            triangleTop: '',
            triangleMiddle: '',
            triangleBottom: '',
            categoryFamily: null,
            subCategoryFamily: null,
            subsubCategoryFamily: null,
            observations: '',
            categoryFamilyList: [],
            categorySubFamilyList: [],
            loadingInformation: false,
            loadingFormulaInformation: false
        };

        this.formulaService = new FormulaService();
        this.trialService = new TrialService();

        this.trialID = this.props.trialID;
    }

  checkZero = () =>{
      this.formulaService.checkZero({
        trialID: this.trialID
      }).then(
          response => {
            const data = response.data;
          
            if(data){
                this.officializeFormula();
            }else{
                toast.error(
                    `${this.props.intl.formatMessage({
                        id: 'modal.trial.officialize.messages.ZeroFound'
                    })}`
                )
            }

          },error => {

                
                toast.error(
                    `${this.props.intl.formatMessage({
                        id: 'modal.trial.officialize.messages.error'
                    })}`
                );
            
          }
      )
  }  

  officializeFormula = () => {
      this.setState({
          loadingInformation: true
      });

      this.formulaService
          .officializeFormula({
              trialID: this.trialID,
              TrianguloCabeza: this.state.triangleTop,
              TrianguloCorazon: this.state.triangleMiddle,
              TrianguloBase: this.state.triangleBottom,
              FamiliaCategoria: this.state.categoryFamily.value,
              FamiliaSubCategoria:
          this.state.subCategoryFamily && this.state.subCategoryFamily.value
              ? this.state.subCategoryFamily.value
              : null,
              FamiliaSubSubCategoria: this.state.subsubCategoryFamily
                  ? this.state.subsubCategoryFamily
                  : null,
              Observacion: this.state.observations ? this.state.observations : ''
          })
          .then(
              response => {
                  const data = response.data;

                  if (data) {
                      this.setState(
                          {
                              triangleTop: '',
                              triangleMiddle: '',
                              triangleBottom: '',
                              categoryFamily: null,
                              subCategoryFamily: null,
                              subsubCategoryFamily: null,
                              observations: '',
                              loadingInformation: false
                          },
                          () => {
                              toast.success(
                                  `${this.props.intl.formatMessage(
                                      {
                                          id: 'modal.trial.officialize.messages.success'
                                      },
                                      {codFormula: data.CodigoFormula}
                                  )}`,
                                  {
                                      autoClose: 120000
                                  }
                              );
                              if (this.toggleModalOfficialize) {
                                  this.toggleModalOfficialize();
                              }
                          }
                      );
                  }
              },
              error => {
                  const {response} = error;

                  if (response && response.status === 409) {
                      toast.error(
                          `${this.props.intl.formatMessage({
                              id: 'modal.trial.officialize.messages.alreadyExp'
                          })}`
                      );
                  } else {
                      toast.error(
                          `${this.props.intl.formatMessage({
                              id: 'modal.trial.officialize.messages.error'
                          })}`
                      );
                  }

                  this.setState(
                      {
                          loadingInformation: false
                      },
                      () => {
                          if (this.toggleModalOfficialize) {
                              this.toggleModalOfficialize();
                          }
                      }
                  );
              }
          );
  };

  getItemByKey = (list, key) => {
      let result = null;

      list.some(item => {
          if (item.value === key) {
              result = item;
              return true;
          }
          return false;
      });

      return result;
  };

  componentDidMount() {
      if (this.trialID !== null) {
          this.setState({
              loadingFormulaInformation: true
          });

          this.trialService.getById(this.trialID).then(
              response => {
                  const data = response.data[0];
                  const categoryFamilyList = this.state.categoryFamilyList;

                  const detFamilyCategory =
            data.FamiliaCategoria && data.FamiliaCategoria !== '0'
                ? this.getItemByKey(categoryFamilyList, data.FamiliaCategoria)
                : '';
                  const detFamilySubCategory =
            data.FamiliaSubCategoria && data.FamiliaSubCategoria !== '0'
                ? this.getItemByKey(categoryFamilyList, data.FamiliaSubCategoria)
                : '';
                  const detFamilySubSubCategory = data.FamiliaSubSubCategoria
                      ? data.FamiliaSubSubCategoria
                      : '';

                  this.setState({
                      triangleTop: data.TrianguloCabeza,
                      triangleMiddle: data.TrianguloCorazon,
                      triangleBottom: data.TrianguloFondo,
                      categoryFamily: detFamilyCategory,
                      subCategoryFamily: detFamilySubCategory,
                      subsubCategoryFamily: detFamilySubSubCategory,
                      observations: '',
                      loadingFormulaInformation: false,
                      loadingInformation: false
                  });
              },
              () => {
                  this.setState({
                      loadingInformation: false,
                      loadingFormulaInformation: true
                  });

                  console.error('Error al recuperar los datos del trial');
              }
          );
      }

      this.formulaService.getFamily().then(
          response => {
              const data = response.data;

              if (data !== null && data.length > 0) {
                  const categoryFamilyList = [];

                  data.forEach(item => {
                      categoryFamilyList.push({
                          label: item.Descripcion,
                          value: item.Codigo
                      });
                  });

                  this.setState({
                      categoryFamilyList
                  });
              }
          },
          response => {
              console.error(response);
          }
      );

      this.formulaService.getSubFamily().then(
          response => {
              const data = response.data;

              if (data !== null && data.length > 0) {
                  const categorySubFamilyList = [];

                  data.forEach(item => {
                      categorySubFamilyList.push({
                          label: item.Descripcion,
                          value: item.Codigo
                      });
                  });

                  this.setState({
                      categorySubFamilyList
                  });
              }
          },
          response => {
              console.error(response);
          }
      );
  }

  render() {
      let invalidForm = false;

      const toDefine =
      this.state.categoryFamily && this.state.categoryFamily.value === '-1';

      if (!toDefine) {
          invalidForm =
        !this.state.categoryFamily ||
        !this.state.subCategoryFamily ||
        !this.state.triangleTop ||
        !this.state.triangleMiddle ||
        !this.state.triangleBottom;
      }

      return (
          <DashboardContext.Consumer>
              {dashboardContext => {
                  this.toggleModalOfficialize = dashboardContext.toggleModalOfficialize;

                  return (
                      <Container fluid={true}>
                          <LoadingComponent
                              loading={this.state.loadingFormulaInformation}
                              noBackground
                          />
                          <Row>
                              <Col>
                                  <label>
                                      <FormattedMessage id="trial.trialDetail.catFamily.title" />
                                  </label>
                                  <Select
                                      placeholder={`${this.props.intl.formatMessage({
                                          id: 'trial.trialDetail.catFamily.placeholder'
                                      })}`}
                                      value={this.state.categoryFamily}
                                      onChange={item => {
                                          let subCategoryToDefine = null;

                                          if (item && item.value === '-1') {
                                              this.state.categorySubFamilyList.some(itemSubCat => {
                                                  if (itemSubCat.value === '-1') {
                                                      subCategoryToDefine = itemSubCat;
                                                      return true;
                                                  }
                                                  return false;
                                              });
                                          }

                                          this.setState({
                                              categoryFamily: item,
                                              subCategoryFamily: subCategoryToDefine
                                          });
                                      }}
                                      options={this.state.categoryFamilyList}
                                  />
                              </Col>
                              <Col>
                                  <label>
                                      <FormattedMessage id="trial.trialDetail.subCatFamily.title" />
                                  </label>
                                  <Select
                                      isDisabled={this.state.categoryFamily === null || toDefine}
                                      placeholder={`${this.props.intl.formatMessage({
                                          id: 'trial.trialDetail.subCatFamily.placeholder'
                                      })}`}
                                      value={this.state.subCategoryFamily}
                                      onChange={item => {
                                          this.setState({
                                              subCategoryFamily: item
                                          });
                                      }}
                                      options={this.state.categorySubFamilyList}
                                  />
                              </Col>
                              <Col>
                                  <Input
                                      type="text"
                                      disabled={
                                          this.state.categoryFamily === null ||
                      this.state.subCategoryFamily === null ||
                      toDefine
                                      }
                                      label={`${this.props.intl.formatMessage({
                                          id: 'trial.trialDetail.subSubCatFamily'
                                      })}`}
                                      value={this.state.subsubCategoryFamily}
                                      onChange={item => {
                                          this.setState({
                                              subsubCategoryFamily: item.target.value
                                          });
                                      }}
                                  />
                              </Col>
                          </Row>

                          <Row>
                              <Col>
                                  <Input
                                      type="textarea"
                                      maxLength={255}
                                      disabled={toDefine}
                                      label={`${this.props.intl.formatMessage({
                                          id: 'trial.trialDetail.triangle.top'
                                      })}`}
                                      value={this.state.triangleTop}
                                      onChange={item => {
                                          this.setState({
                                              triangleTop: item.target.value
                                          });
                                      }}
                                  />
                              </Col>
                          </Row>

                          <Row>
                              <Col>
                                  <Input
                                      type="textarea"
                                      maxLength={255}
                                      label={`${this.props.intl.formatMessage({
                                          id: 'trial.trialDetail.triangle.middle'
                                      })}`}
                                      disabled={toDefine}
                                      value={this.state.triangleMiddle}
                                      onChange={item => {
                                          this.setState({
                                              triangleMiddle: item.target.value
                                          });
                                      }}
                                  />
                              </Col>
                          </Row>

                          <Row>
                              <Col>
                                  <Input
                                      type="textarea"
                                      maxLength={255}
                                      label={`${this.props.intl.formatMessage({
                                          id: 'trial.trialDetail.triangle.bottom'
                                      })}`}
                                      disabled={toDefine}
                                      value={this.state.triangleBottom}
                                      onChange={item => {
                                          this.setState({
                                              triangleBottom: item.target.value
                                          });
                                      }}
                                  />
                              </Col>
                          </Row>

                          <Row>
                              <Col>
                                  <Input
                                      type="textarea"
                                      icon="comment"
                                      maxLength={70}
                                      label={`${this.props.intl.formatMessage({
                                          id: 'modal.trial.officialize.input.obs'
                                      })}`}
                                      onChange={item => {
                                          this.setState({
                                              observations: item.target.value
                                          });
                                      }}
                                      value={this.state.observations}
                                  />
                              </Col>
                          </Row>
                          <Row className="d-flex justify-content-end">

                          <Button
                                  color="cancel"
                                  onClick={dashboardContext.toggleModalOfficialize}
                              >
                                  <FormattedMessage id="modal.trial.officialize.button.cancel" />
                              </Button>
                              <span
                                  title={
                                      invalidForm
                                          ? `${this.props.intl.formatMessage({
                                              id: 'modal.trial.officialize.button.accept.title'
                                          })}`
                                          : null
                                  }
                              >
                                  <Button
                                      color="info"
                                      disabled={invalidForm || this.state.loadingInformation}
                                      onClick={this.checkZero}
                                  >
                                      {!this.state.loadingInformation ? (
                                          `${this.props.intl.formatMessage({
                                              id: 'modal.trial.officialize.button.accept'
                                          })}`
                                      ) : (
                                          <Fa icon="spinner" className="fa-spin" />
                                      )}
                                  </Button>
                              </span>
                          </Row>
                      </Container>
                  );
              }}
          </DashboardContext.Consumer>
      );
  }
}

export default injectIntl(OfficializeFormulaComponent);

OfficializeFormulaComponent.propTypes = {
    intl: PropTypes.any,
    trialID: PropTypes.any
};
