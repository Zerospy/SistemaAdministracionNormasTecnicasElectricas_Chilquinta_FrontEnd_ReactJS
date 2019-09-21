import { toast } from 'react-toastify';
import Constantes from 'Constantes';
import * as Util from 'commons/Util.js';

// MODAL NORMALIZE FORMULA
export function toggleModalNormalizeFormula() {
  this.setState({
    modalNormalizeFormula: !this.state.modalNormalizeFormula
  });
}

// MODAL OFFICIALIZE FORMULA
export function toggleModalOfficialize() {
  this.setState({
    modalOfficialize: !this.state.modalOfficialize
  });
}

export function handleNormalizeFormula() {
  const rowData = this.state.rowData;
  const columnID = this.state.selectedTrial;

  if (
    columnID !== null &&
    columnID.value > 0 &&
    rowData !== null &&
    rowData.length > 0
  ) {
    const quantityColumnID = `quantity${columnID.value}`;
    const normalizeValue = this.state.normalizeFormulaValue;

    let totalQuantity = 0;
    rowData.forEach(material => {
      totalQuantity += material[quantityColumnID];
    });

    if (totalQuantity > 0 && normalizeValue > 0) {
      rowData.forEach(material => {
        const quantity = material[quantityColumnID];
        if (this.state.normalizationUnit.value === 'percent') {
          material[quantityColumnID] = Util.crossMultiplication(
            quantity,
            normalizeValue,
            100
          );
          material[quantityColumnID] = parseFloat(
            parseFloat(material[quantityColumnID], 10).toFixed(
              Constantes.TOTAL_TRIAL_DECIMALS
            )
          );
        } else {
          material[quantityColumnID] = Util.crossMultiplication(
            quantity,
            normalizeValue,
            totalQuantity
          );
          material[quantityColumnID] = parseFloat(
            parseFloat(material[quantityColumnID], 10).toFixed(
              Constantes.TOTAL_TRIAL_DECIMALS
            )
          );
        }
      });
    }

    this.setState(
      {
        modalNormalizeFormula: !this.state.modalNormalizeFormula,
        normalizeFormulaValue: '',
        normalizationUnit: ''
      },
      () => {
        this.calculateTotal();
      }
    );
  } else {
    toast.info(
      `${this.props.intl.formatMessage({
        id: 'dashboard.messages.formulaZero'
      })}`
    );
  }
}

// MODAL TO IMPORT FORMULA
export function toggleModalImportFormula() {
  this.setState({
    modalImportFormula: !this.state.modalImportFormula
  });
}

export function handleImportFormula() {
  const formulaToImport = this.state.formulaToImport;
  const rowData = this.state.rowData;
  let trials = this.getAllTrials();

  if (!trials || trials.length === 0) {
    this.handleAddTrial();

    trials = this.getAllTrials();
  }

  this.setState({
    loadingFormulaInformation: true
  });

  // IMPORT LVL 0
  if (formulaToImport !== null && this.state.formulaToImportLvl === '0') {
    formulaToImport.CodSun = formulaToImport.CodFormula;
    formulaToImport.Materia = formulaToImport.NombreFormula;
    formulaToImport.materialType = this.state.materialTypeToImport.value;

    const exists = rowData.some(material => {
      if (material.CodSun === formulaToImport.CodSun) {
        return true;
      }
      return false;
    });

    if (exists) {
      this.setState(
        {
          loadingFormulaInformation: false
        },
        () => {
          this.toggleModalImportFormula();
        }
      );
      return;
    }

    trials.forEach(trial => {
      const columnID = trial.columnIdentifier;

      formulaToImport[`priceTrial${columnID}`] = Util.numberFormat(
        0,
        Constantes.DECIMAL_FORMAT
      );

      formulaToImport[`quantity${columnID}`] = 0;
    });

    this.setState(
      {
        rowData: [...rowData, formulaToImport],
        loadingFormulaInformation: false
      },
      () => {
        this.toggleModalImportFormula();
        this.calculateTotal();
      }
    );
  } else if (formulaToImport && this.state.formulaToImportLvl === '1') {
    // IMPORT LVL 1
    this.formulaService
      .getFormulaById({
        codformula: formulaToImport.CodFormula,
        numversion: formulaToImport.NumVersion
      })
      .then(
        response => {
          const data = response.data;

          if (data.length > 0) {
            const materialsToImport = [];
            data.forEach(row => {
              const codComponente = row.CodComponente;

              const CostoUSD = Util.numberFormat(
                row.CostoUSDKilo,
                Constantes.DECIMAL_FORMAT
              );

              row.CantidadUtilizada = !row.CantidadUtilizada
                ? 0
                : parseFloat(
                    parseFloat(row.CantidadUtilizada, 10).toFixed(
                      Constantes.TOTAL_TRIAL_DECIMALS
                    )
                  );

              let materialPosition = 0;
              const exists = rowData.some((material, index) => {
                if (material.CodSun === codComponente) {
                  materialPosition = index;
                  return true;
                }
                return false;
              });
              const material = {
                CodSun: codComponente,
                Prohibido: row.Prohibido,
                AlergenoIFRA: row.AlergenoIFRA,
                Materia: row.NombreComponente,
                CostoUSD: CostoUSD,
                materialType:
                  row.TipoComponente === 'MATERIAS PRIMAS'
                    ? 'MATERIAL'
                    : 'FORMULA'
              };

              trials.forEach(trial => {
                const columnID = trial.columnIdentifier;

                if (!exists) {
                  material[`priceTrial${columnID}`] = Util.numberFormat(
                    0,
                    Constantes.DECIMAL_FORMAT
                  );

                  material[`quantity${columnID}`] =
                    isNaN(row.CantidadUtilizada) || !trial.isSelected
                      ? 0
                      : parseFloat(row.CantidadUtilizada, '10');
                } else {
                  const originalQuantity =
                    rowData[materialPosition][`quantity${columnID}`];

                  const totalQuantity = trial.isSelected
                    ? parseFloat(originalQuantity, '10') +
                      parseFloat(row.CantidadUtilizada, '10')
                    : parseFloat(originalQuantity, '10');

                  rowData[materialPosition][
                    `quantity${columnID}`
                  ] = totalQuantity;
                }
              });

              if (!exists) {
                materialsToImport.push(material);
              }
            });

            this.setState(
              {
                rowData: [...rowData, ...materialsToImport],
                loadingFormulaInformation: false,
                formulaToImport: null,
                formulaToImportLvl: '1'
              },
              () => {
                this.toggleModalImportFormula();
                this.calculateTotal();
              }
            );
          } else {
            this.setState(
              {
                loadingFormulaInformation: false
              },
              () => {
                this.toggleModalImportFormula();
              }
            );
          }
        },
        response => {
          console.error('Error', response);
          toast.error(
            `${this.props.intl.formatMessage({
              id: 'dashboard.messages.errorGetDetFormulaInfo'
            })}`
          );
          this.setState(
            {
              loadingFormulaInformation: false
            },
            () => {
              this.toggleModalImportFormula();
            }
          );
        }
      );
  } else if (formulaToImport && this.state.formulaToImportLvl === 'N') {
    // IMPORT LVL N

    this.formulaService
      .explodeFormulaById({
        codformula: formulaToImport.CodFormula
      })
      .then(
        response => {
          const data = response.data;

          if (data.length > 0) {
            const materialsToImport = [];
            data.forEach(material => {
              material.materialType = 'MATERIAL';

              material.CostoUSD = Util.numberFormat(
                material.CostoUSD,
                Constantes.DECIMAL_FORMAT
              );

              material.CantUtilizado = !material.CantUtilizado
                ? 0
                : parseFloat(
                    parseFloat(material.CantUtilizado, 10).toFixed(
                      Constantes.TOTAL_TRIAL_DECIMALS
                    )
                  );

              let materialPosition = 0;
              const exists = rowData.some((row, index) => {
                if (material.CodSun === row.CodSun) {
                  materialPosition = index;
                  return true;
                }
                return false;
              });

              trials.forEach(trial => {
                const columnID = trial.columnIdentifier;

                if (!exists) {
                  material[`priceTrial${columnID}`] = Util.numberFormat(
                    0,
                    Constantes.DECIMAL_FORMAT
                  );

                  const totalQuantity = trial.isSelected
                    ? parseFloat(material.CantUtilizado, '10')
                    : 0;

                  material[`quantity${columnID}`] = totalQuantity;
                } else {
                  let cantTotal = 0;
                  const originalNumber =
                    rowData[materialPosition][`quantity${columnID}`];

                  if (trial.isSelected) {
                    cantTotal =
                      originalNumber + parseFloat(material.CantUtilizado, '10');
                  } else {
                    cantTotal = originalNumber;
                  }

                  rowData[materialPosition][`quantity${columnID}`] = cantTotal;
                }
              });

              if (!exists) {
                materialsToImport.push(material);
              }
            });

            this.setState(
              {
                rowData: [...rowData, ...materialsToImport],
                loadingFormulaInformation: false,
                formulaToImport: null,
                formulaToImportLvl: '1'
              },
              () => {
                this.toggleModalImportFormula();
                this.calculateTotal();
              }
            );
          } else {
            this.setState(
              {
                loadingFormulaInformation: false
              },
              () => {
                this.toggleModalImportFormula();

                toast.warn(
                  `${this.props.intl.formatMessage({
                    id: 'dashboard.messages.errorExplodeFormulaNotAvailable'
                  })}`
                );
              }
            );
          }
        },
        () => {
          toast.error(
            `${this.props.intl.formatMessage({
              id: 'dashboard.messages.errorGetExplodeMaterials'
            })}`
          );
        }
      );
  }
}

// MODAL TO IMPORT FORMULA
export function toggleModalImportFormulaPersonalLib() {
  this.setState({
    modalImportFormulaPersonalLib: !this.state.modalImportFormulaPersonalLib
  });
}

export function handleImportFormulaPersonalLib() {
  const formulaToImport = this.state.formulaPersonalLibToImport;
  const formulaLvlToImport = this.state.formulaPersonalLibToImportLvl;
  const rowData = this.state.rowData;
  let trials = this.getAllTrials();

  if (!trials || trials.length === 0) {
    this.handleAddTrial();

    trials = this.getAllTrials();
  }

  this.setState({
    loadingFormulaPersonalInformation: true
  });

  // IMPORT LVL 0
  if (formulaToImport !== null && formulaLvlToImport === '0') {
    formulaToImport.CodSun = formulaToImport.IdTrial;
    formulaToImport.Materia = formulaToImport.NombreTrial;
    formulaToImport.materialType = this.state.materialTypeToImport.value;
    formulaToImport.CostoUSD = formulaToImport.CostoUSD
      ? Util.numberFormat(formulaToImport.CostoUSD, Constantes.DECIMAL_FORMAT)
      : Util.numberFormat(0, Constantes.DECIMAL_FORMAT);

    const exists = rowData.some(material => {
      if (material.CodSun === formulaToImport.CodSun) {
        return true;
      }
      return false;
    });

    if (exists) {
      this.setState(
        {
          loadingFormulaPersonalInformation: false
        },
        () => {
          this.toggleModalImportFormulaPersonalLib();
        }
      );
      return;
    }

    trials.forEach(trial => {
      const columnID = trial.columnIdentifier;

      formulaToImport[`priceTrial${columnID}`] = Util.numberFormat(
        0,
        Constantes.DECIMAL_FORMAT
      );

      formulaToImport[`quantity${columnID}`] = 0;
    });

    this.setState(
      {
        rowData: [...rowData, formulaToImport],
        loadingFormulaPersonalInformation: false
      },
      () => {
        this.toggleModalImportFormulaPersonalLib();
        this.calculateTotal();
      }
    );
  } else if (formulaToImport !== null && formulaLvlToImport === '1') {
    // IMPORT LVL 1
    this.trialService.getById(formulaToImport.IdTrial).then(
      response => {
        const { data } = response;
        const { Materials } = data[0];

        if (Materials.length > 0) {
          const materialsToImport = [];
          Materials.forEach(row => {
            const codComponente = row.CodMaterial;

            let materialPosition = 0;
            const exists = rowData.some((material, index) => {
              if (material.CodSun === codComponente) {
                materialPosition = index;
                return true;
              }
              return false;
            });

            const CostoUSD = Util.numberFormat(row.CostoUSD);

            const material = {
              CodSun: codComponente,
              Prohibido: row.Prohibido,
              AlergenoIFRA: row.AlergenoIFRA,
              Materia: row.Material,
              CostoUSD: CostoUSD,
              materialType:
                row.TipoComponente === 'MATERIAL' ? 'MATERIAL' : 'FORMULA'
            };

            row.CantidadUtilizada = !row.CantidadUtilizada
              ? 0
              : parseFloat(
                  parseFloat(row.CantidadUtilizada, 10).toFixed(
                    Constantes.TOTAL_TRIAL_DECIMALS
                  )
                );

            trials.forEach(trial => {
              const columnID = trial.columnIdentifier;

              if (!exists) {
                material[`priceTrial${columnID}`] = Util.numberFormat(
                  0,
                  Constantes.DECIMAL_FORMAT
                );

                material[`quantity${columnID}`] =
                  isNaN(row.CantidadUtilizada) || !trial.isSelected
                    ? 0
                    : parseFloat(row.CantidadUtilizada, '10');
              } else {
                const originalNumber =
                  rowData[materialPosition][`quantity${columnID}`];

                const totalQuantity = trial.isSelected
                  ? parseFloat(originalNumber, '10') +
                    parseFloat(row.CantidadUtilizada, '10')
                  : parseFloat(originalNumber, '10');

                rowData[materialPosition][
                  `quantity${columnID}`
                ] = totalQuantity;
              }
            });

            if (!exists) {
              materialsToImport.push(material);
            }
          });

          this.setState(
            {
              rowData: [...rowData, ...materialsToImport],
              loadingFormulaPersonalInformation: false,
              formulaToImport: null,
              formulaToImportLvl: '0'
            },
            () => {
              this.toggleModalImportFormulaPersonalLib();
              this.calculateTotal();
            }
          );
        } else {
          this.setState(
            {
              loadingFormulaPersonalInformation: false
            },
            () => {
              this.toggleModalImportFormulaPersonalLib();
            }
          );
        }
      },
      response => {
        console.error('Error', response);
        toast.error(
          `${this.props.intl.formatMessage({
            id: 'dashboard.messages.errorGetDetFormulaInfo'
          })}`
        );
        this.setState(
          {
            loadingFormulaPersonalInformation: false
          },
          () => {
            this.toggleModalImportFormulaPersonalLib();
          }
        );
      }
    );
  }
}

/* MODAL ADD MATERIAL */

export function toggleModalMaterials() {
  this.setState({
    modalMaterials: !this.state.modalMaterials
  });
}

export function handleAddMaterial() {
  const rowData = this.state.rowData;
  const materialsList = [];
  const materialsSelected = this.state.materialsSelected;
  let trials = this.getAllTrials();

  if (!trials || trials.length === 0) {
    this.handleAddTrial();

    trials = this.getAllTrials();
  }

  if (materialsSelected !== null && materialsSelected.length > 0) {
    materialsSelected.forEach(material => {
      if (!material.CostoUSD) {
        material.CostoUSD = Util.numberFormat(0, Constantes.DECIMAL_FORMAT);
      }

      const exists = rowData.some(materialOnGrid => {
        if (material.CodSun === materialOnGrid.CodSun) {
          return true;
        }

        return false;
      });

      if (!exists) {
        material.materialType = this.state.materialTypeToImport.value;

        materialsList.push(material);
      }
    });

    trials.forEach(trial => {
      const columnID = trial.columnIdentifier;

      materialsList.forEach(material => {
        material[`priceTrial${columnID}`] = Util.numberFormat(
          0,
          Constantes.DECIMAL_FORMAT
        );

        material[`quantity${columnID}`] = 0;

        if (!material.CostoUSD) {
          material.CostoUSD = 0;
        }
      });
    });
  }

  this.setState(
    {
      rowData: [...rowData, ...materialsList],
      materialsSelected: []
    },
    () => {
      this.calculateTotal();
    }
  );

  this.toggleModalMaterials();
}

export function handleDelMaterial() {
  const rowData = this.state.rowData;
  const position = this.state.matPositionToDelete;
  const node = this.state.nodeToDelete;
  const trials = this.getAllTrials();

  rowData.splice(position, 1);

  trials.forEach(trial => {
    this.getColumnModified(trial.columnIdentifier);
  });
  this.setState(
    {
      rowData: rowData,
      dialogBoxDeleteMaterial: false,
      matIdToDelete: null,
      nodeToDelete: null
    },
    () => {
      this.calculateTotal();
    }
  );

  this.gridApi.updateRowData({ remove: [node.data] });
}

/* MODAL ADD COMMENTS */

export function toggleModalComments() {
  this.setState({
    modalComments: !this.state.modalComments
  });
}

export function handleAddComments(comments) {
  const trials = this.state.columnDefs;

  const activeTrialPos = this.getPositionActiveTrial();

  if (activeTrialPos !== null) {
    trials[activeTrialPos].comments = [];

    if (comments !== null && comments.length > 0) {
      comments.forEach(comment => {
        trials[activeTrialPos].comments.push(comment);
      });
    }
  }
}

/* MODAL VALIDATE IFRA */
export function toggleModalValidateIFRA() {
  this.setState({
    modalValidateIFRA: !this.state.modalValidateIFRA
  });
}

export function toggleModalValidateIFRAResult() {
  this.setState({
    modalValidateIFRAResult: !this.state.modalValidateIFRAResult
  });
}

export function setIsValidIFRA(valid) {
  const trial = this.getTrialByID(this.state.selectedTrial.value);
  trial.isValidIFRA = trial.isValidIFRA ? trial.isValidIFRA : valid;
  this.setState({
    isValidIFRA: valid
  });
}
