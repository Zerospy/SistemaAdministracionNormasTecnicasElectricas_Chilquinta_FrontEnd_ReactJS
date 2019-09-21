import { Button, Col, Container, Input, Fa, Row, Modal, ModalHeader, ModalBody } from "mdbreact";
import React from "react";
import DataGridComponent from "components/commons/DataGrid/DataGridComponent";
import PanelComponent from "components/commons/panels/PanelComponent";
import * as Util from "commons/Util.js";
import Constantes from "Constantes";
import HeaderComponent from "components/commons/HeaderComponent";
import MaterialService from "services/MaterialService";
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from "prop-types";
import MaterialsDetail from "components/materials/MaterialsDetail";
import LegendComponent from 'components/commons/base/LegendComponent';
import { onClickDetailMaterial, toggleModalDetFormula } from './MaterialsFunctions';
import MaterialBannedComponent from 'components/commons/DataGrid/MaterialBannedComponent';
import TrialService from 'services/TrialService';

class MaterialComponent extends React.Component {
  constructor(props) {
    super(props);

    const columnDefs = [];

    if (this.props.isMaterialSelector) {
      columnDefs.push({
        headerName: `${props.intl.formatMessage({
          id: "trial.panel.datagrid.col.addMaterial"
        })}`,
        field: "CodFormula",
        cellRenderer: "AddMaterialButtonRenderer",
        onClick: this.onSelectMaterial,
        width: 90,
        suppressFilter: true
      });
    }

    columnDefs.push(
      { 
        headerName:'',
        field: "MpBanned",
        cellRenderer: "MaterialBannedComponent",
        cellRendererParams: {
          type: 1
        },
        width: 50,
        suppressFilter: true
      },
      {
        headerName: `${props.intl.formatMessage({
          id: "materials.panel.materialList.datagrid.allergen"
        })}`,
        field: "Alergeno",
        width: 100
      },
      {
        headerName: `${props.intl.formatMessage({
          id: "materials.panel.materialList.datagrid.sun"
        })}`,
        field: "CodSun",
        type: "numeric",
        width: 70
      },
      {
        headerName: `${props.intl.formatMessage({
          id: "materials.panel.materialList.datagrid.material"
        })}`,
        field: "Materia",
        width: 380
      },
      {
        headerName: `${props.intl.formatMessage({
          id: "materials.panel.materialList.datagrid.cost"
        })}`,
        field: "CostoUSD",
        type: "numeric",
        width: 120
      },
      {
        headerName: `${props.intl.formatMessage({
          id: "materials.panel.materialList.datagrid.casNum"
        })}`,
        field: "NumCas",
        width: 120
      },
      {
        headerName: `${props.intl.formatMessage({
          id: "materials.panel.materialList.datagrid.lastPurchase"
        })}`,
        field: "UltimaCompra",
        width: 140,
        type: "date"
      },
      {
        headerName: `${props.intl.formatMessage({
          id: "materials.panel.materialList.datagrid.stock"
        })}`,
        field: "KGSun",
        type: "numeric",
        width: 120
      },
      {
        headerName: `${props.intl.formatMessage({
          id: "materials.panel.materialList.datagrid.group"
        })}`,
        field: "DescGrupo",
        width: 180
      },
      {
        headerName: `${props.intl.formatMessage({
          id: "materials.panel.materialList.datagrid.family"
        })}`,
        field: "DescFamilia",
        width: 350
      },
      {
        headerName: `${props.intl.formatMessage({
          id: 'trial.panel.datagrid.col.detail'
        })}`,
        cellRenderer: 'DetailAlergenButtonGridRenderer',
        onClick: onClickDetailMaterial.bind(this),
        width: 90,
        suppressFilter: true
      }
    );

    this.state = {
      codigoMaterial: "",
      nombreMaterial: "",
      familiaMaterial: "",
      id: parseInt(Math.random() * 1000000, 10),
      pagination: {
        PageIndex: 1,
        RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
      },
      columnDefs: columnDefs,
      rowData: [],
      filter: {
        codigoMaterial: "",
        nombreMaterial: "",
        familiaMaterial: ""
      },
      selectedMaterials: [],
      loadingInformation: false,
      modalSelectedMaterials: false,
      modalDetFormula: false,
      formulaData: {
        columns: [
          '',
          `${this.props.intl.formatMessage({
            id: 'modal.trial.detail.material.number'
          })}`,
          `${this.props.intl.formatMessage({
            id: 'modal.trial.detail.material.desc'
          })}`,
          `${this.props.intl.formatMessage({
            id: 'modal.trial.detail.material.numberCas'
          })}`,
          `${this.props.intl.formatMessage({
            id: 'modal.trial.detail.material.quantity'
          })}`
        ],
        rows: []
      }
    };
    this.trialService = new TrialService();

    this.toggleModalDetFormula = toggleModalDetFormula.bind(this);

  }

  onSelectMaterial = node => {
    const onRowSelection =
      this.props.onRowSelection &&
      typeof this.props.onRowSelection === "function"
        ? this.props.onRowSelection
        : null;

    let { selectedMaterials } = this.state;

    if (node.isSelected === true) {
      node.isSelected = false;
      selectedMaterials = selectedMaterials.filter(
        item => item.CodSun !== node.CodSun
      );
    } else {
      node.isSelected = true;
      selectedMaterials.push(node);
    }

    const { rowData } = this.state;

    rowData.some(item => {
      if (item.CodSun === node.CodSun) {
        item.isSelected = node.isSelected;
        return true;
      }

      return false;
    });

    this.setState(
      {
        rowData: rowData,
        selectedMaterials
      },
      () => {
        onRowSelection(selectedMaterials);
      }
    );
  };

  searchMaterials() {
    const codigoMaterial = this.state.filter.codigoMaterial;
    const nombreMaterial = this.state.filter.nombreMaterial;
    const familiaMaterial = this.state.filter.familiaMaterial;

    this.setState({
      loadingInformation: true
    });

    new MaterialService()
      .get({
        PageIndex: this.state.pagination.PageIndex,
        RowsPerPage: this.state.pagination.RowsPerPage,
        CodMaterial: codigoMaterial ? codigoMaterial : null,
        NomMaterial: nombreMaterial ? nombreMaterial : null,
        NomFamilia: familiaMaterial ? familiaMaterial : null
      })
      .then(
        response => {
          if (response && response.status === 200) {
            const materials = response.data.Materiales;
            const pagination = response.data.Pagination;
            const { selectedMaterials } = this.state;

            materials.forEach(material => {
              const exists = selectedMaterials.some(mat => {
                if (mat.CodSun === material.CodSun) {
                  return true;
                }
                return false;
              });

              if (exists) {
                material.isSelected = true;
              }

              material.CostoUSD = material.CostoUSD
                ? Util.numberFormat(
                    material.CostoUSD,
                    Constantes.DECIMAL_FORMAT
                  )
                : Util.numberFormat(0, Constantes.DECIMAL_FORMAT);
            });

            this.setState({
              loadingInformation: false,
              pagination: {
                PageIndex: pagination.PageIndex,
                RowsPerPage: pagination.RowsPerPage,
                TotalPages: pagination.TotalPages,
                TotalRows: pagination.TotalRows
              },
              rowData: materials
            });
          }
        },
        () => {
          console.error("Ocurrió un problema al cargar la lista de materiales");
          this.setState({
            loadingInformation: false
          });
        }
      );
  }

  handleClickBtnSearch = () => {
    this.setState(
      {
        pagination: {
          ...this.state.pagination,
          PageIndex: 1,
          RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
        },
        filter: {
          nombreMaterial: this.state.nombreMaterial,
          familiaMaterial: this.state.familiaMaterial,
          codigoMaterial: this.state.codigoMaterial
        }
      },
      () => {
        this.searchMaterials();
      }
    );
  };

  toggleModal = () => {
    this.setState({
      modalSelectedMaterials: !this.state.modalSelectedMaterials
    });
  };

  componentDidMount() {
    this.searchMaterials();
  }

  render() {
    return (
      <React.Fragment>
        <MaterialsDetail
          isOpen={this.state.modalSelectedMaterials}
          formulaData={this.state.selectedMaterials}
          toggleModal={this.toggleModal}
        />
        <Modal
          isOpen={this.state.modalDetFormula}
          toggle={this.toggleModalDetFormula}
          className="px-3"
          size="lg"
        >
          <ModalHeader
            toggle={
              !this.state.loadingFormulaInformation
                ? this.toggleModalDetFormula
                : null
            }
          >
            <FormattedMessage id="modal.material.detail.title" />
          </ModalHeader>
          <ModalBody>
            <Row className="d-flex justify-content-center">
              <Col className="col-12 text-center">
                {this.state.loadingFormulaInformation ? (
                  <span>
                    <Fa icon="spinner" className="fa-spin" />{' '}
                    <FormattedMessage id="component.messages.loading" />
                  </span>
                ) : (
                  <table className="table table-stripped">
                    <thead>
                      <tr>
                        {this.state.formulaData.columns.map(column => (
                          <th className="text-left" key={column}>
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.formulaData.rows.map(row => (
                        <tr key={row.CodParametro}>
                          <td className="text-left">
                            <MaterialBannedComponent data={row} />
                          </td>
                          <td className="text-left">{row.CodParametro}</td>
                          <td className="text-left">{row.DesParametro}</td>
                          <td className="text-left">{row.NumCas}</td>
                          <td className="text-left">
                            {Util.numberFormat(row.CanResultado)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Col>
            </Row>
          </ModalBody>
        </Modal>

        <Container fluid={true}>
          {!this.props.isMaterialSelector ? <HeaderComponent /> : null}
          <Row className="my-1">
            <Col>
              <PanelComponent
                title={`${this.props.intl.formatMessage({
                  id: "materials.panel.filter.title"
                })}`}
                isOpen={true}
              >
                <Row>
                  <Col className="col-1">
                    <Input
                      label={`${this.props.intl.formatMessage({
                        id: "materials.panel.filter.input.code"
                      })}`}
                      size="sm"
                      maxLength={8}
                      onChange={event => {
                        let value = event.target.value;
                        value = value.replace(/\D/gi, "");
                        this.setState({
                          codigoMaterial: value
                        });
                      }}
                      onKeyPress={event => {
                        const keyCode = event.which || event.keyCode;

                        if (keyCode === 13) {
                          this.handleClickBtnSearch();
                        }
                      }}
                      value={this.state.codigoMaterial}
                    />
                  </Col>
                  <Col className="col-3">
                    <Input
                      label={`${this.props.intl.formatMessage({
                        id: "materials.panel.filter.input.name"
                      })}`}
                      maxLength={200}
                      size="sm"
                      onChange={event => {
                        this.setState({
                          nombreMaterial: event.target.value
                        });
                      }}
                      onKeyPress={event => {
                        const keyCode = event.which || event.keyCode;

                        if (keyCode === 13) {
                          this.handleClickBtnSearch();
                        }
                      }}
                      value={this.state.nombreMaterial}
                    />
                  </Col>
                  <Col className="col-3">
                    <Input
                      label={`${this.props.intl.formatMessage({
                        id: "materials.panel.filter.input.family"
                      })}`}
                      size="sm"
                      maxLength={200}
                      onChange={event => {
                        this.setState({
                          familiaMaterial: event.target.value
                        });
                      }}
                      onKeyPress={event => {
                        const keyCode = event.which || event.keyCode;

                        if (keyCode === 13) {
                          this.handleClickBtnSearch();
                        }
                      }}
                      value={this.state.familiaMaterial}
                    />
                  </Col>
                  <Col className="col-5 d-flex justify-content-end">
                    {this.props.isMaterialSelector ? (
                      <Button
                        disabled={this.state.selectedMaterials.length === 0}
                        className="my-3 h3"
                        color="primary"
                        onClick={() => {
                          this.toggleModal();
                        }}
                      >
                        <FormattedMessage id="materials.panel.filter.button.selectedMats" />
                        {"  "}
                        <span className="badge badge-light">
                          {this.state.selectedMaterials.length}
                        </span>
                      </Button>
                    ) : null}

                    <Button
                      className="my-3"
                      size="sm"
                      color="primary"
                      onClick={this.handleClickBtnSearch}
                      disabled={this.state.loadingInformation}
                    >
                      <FormattedMessage id="materials.panel.filter.button.search" />
                    </Button>
                  </Col>
                </Row>
              </PanelComponent>
            </Col>
          </Row>

          <Row className="my-2">
            <Col>
              <PanelComponent
                title={`${this.props.intl.formatMessage({
                  id: "materials.panel.materialList.title"
                })}`}
              >
                <DataGridComponent
                  isLoading={this.state.loadingInformation}
                  classContainer="grid-container"
                  onPaginationChange={pagination => {
                    this.setState(
                      {
                        pagination: pagination
                      },
                      () => {
                        this.searchMaterials();
                      }
                    );
                  }}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}
                  pagination={this.state.pagination}
                  enableColResize={true}
                />
              <LegendComponent icon="fa-ban" legend={"legend.ban.mp"}/>
              <LegendComponent icon="fa-font" legend={"legend.alergen.mp"}/>
              </PanelComponent>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default injectIntl(MaterialComponent);

MaterialComponent.propTypes = {
  intl: PropTypes.any,
  onRowSelection: PropTypes.func,
  isMaterialSelector: PropTypes.bool
};
