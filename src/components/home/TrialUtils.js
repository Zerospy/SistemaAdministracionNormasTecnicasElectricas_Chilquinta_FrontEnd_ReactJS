import classNames from 'classnames';
import { toast } from 'react-toastify';
import Constantes from 'Constantes';
import * as Util from 'commons/Util.js';

const generateCustomID = () => parseInt(Math.random() * 10000, 10);

export function setActiveTrial(item) {
  const trials = this.state.columnDefs;
  const columnIdentifier = item.value;
  const rowData = this.state.rowData;
  const priceColumnID = `priceTrial${columnIdentifier}`;
  let trialName = '';
  let trialCode = '';
  let trialCost = 0;
  let trialExpense = '';
  let trialRequestID = '';
  let formulaName = '';
  let isValidIFRA = false;

  trials.forEach(trial => {
    if (trial.isTrial === true) {
      const isColumnToSelect = trial.columnIdentifier === columnIdentifier;
      trial.isSelected = isColumnToSelect;
      if (isColumnToSelect) {
        isValidIFRA = trial.isValidIFRA || false;
        trialName = trial.trialName || '';
        trialCost = trial.trialCost || 0;
        trialCode = trial.headerName || '';
        trialRequestID = trial.requestID || '';
        formulaName = trial.formulaName || '';
        trialExpense =
          Util.numberFormat(trial.trialExpense, Constantes.DECIMAL_FORMAT) ||
          '';
      }

      trial.headerClass = classNames({
        'green-dashboard': isColumnToSelect
      });

      trial.children.forEach(child => {
        child.editable = isColumnToSelect && child.isEditable;

        child.headerClass = classNames({
          'custom-grid-header': true,
          'green-dashboard': isColumnToSelect
        });
      });
    }
  });
  // SE RECALCULA EL PRECIO SEGÚN LA COLUMNA ACTIVA
  rowData.forEach(row => {
    row.priceFormula = row[priceColumnID];
  });
  this.setState(
    {
      trialName,
      trialCode,
      trialCost,
      trialExpense,
      formulaName,
      isValidIFRA,
      requestID: trialRequestID,
      rowData: rowData,
      selectedTrial: item,
      trialsToPrint: [item],
      columnDefs: trials,
      compareTo: null,
      isUpdate: trialRequestID ? true : false,
      isRequestSelected: trialRequestID !== null ? true : false
    },
    () => {
      this.calculateTotal();
    }
  );
}

export function getPositionActiveTrial() {
  const trials = this.state.columnDefs;

  let trialPos = null;

  if (trials && trials.length > 0) {
    trials.some((trial, index) => {
      if (
        trial.isTrial &&
        trial.columnIdentifier === this.state.selectedTrial.value
      ) {
        trialPos = index;
        return true;
      }
      return false;
    });
  }

  return trialPos;
}

export function getTrialID() {
  const trials = this.state.columnDefs;

  const position = this.getPositionActiveTrial();
  let idTrial = null;

  if (position !== null) {
    idTrial = trials[position].idTrial;
  }

  return idTrial && !isNaN(idTrial) ? idTrial : null;
}

export function getTrialByID(trialID) {
  const trials = this.state.columnDefs;
  let trialDetail = {};

  if (trials.length > 0) {
    trials.some(trial => {
      if (trial.isTrial && trial.columnIdentifier === trialID) {
        trialDetail = trial;
        return true;
      }
      return false;
    });
  }

  return trialDetail;
}

export function getCommentsActiveTrial() {
  const trials = this.state.columnDefs;

  const position = this.getPositionActiveTrial();

  const comments =
    trials[position] && trials[position].comments
      ? trials[position].comments
      : null;

  return comments;
}

export function quantityFormatter(params) {
  return Util.numberFormat(params.value, Constantes.DECIMAL_FORMAT);
}

export function validateInputTrial(params) {
  if (params.data.isDataSummary) {
    return;
  }

  const rowIndex = params.node.rowIndex;
  const columnIdentifier = params.colDef.columnIdentifier;
  const columnModified = params.colDef.field;
  const priceTrialColumnID = `priceTrial${columnIdentifier}`;
  const quantityColumnID = `quantity${columnIdentifier}`;
  const rowData = this.state.rowData;
  let newVal = params.newValue;

  if (newVal === null || isNaN(newVal)) {
    newVal = 0;
  }

  newVal = parseFloat(
    parseFloat(newVal, 10).toFixed(Constantes.TOTAL_TRIAL_DECIMALS)
  );

  if (columnModified === priceTrialColumnID) {
    params.data[priceTrialColumnID] = newVal;
    rowData[rowIndex][priceTrialColumnID] = newVal;
  } else if (columnModified === quantityColumnID) {
    params.data[quantityColumnID] = newVal;
    rowData[rowIndex][quantityColumnID] = newVal;
  }
}

export function handleCellCss(params) {
  const compareToColumn = this.state.compareTo;
  const colID = params.colDef.columnIdentifier;
  let comparisonResult = false;
  let isComparing = false;
  const isSelected =
    this.state.selectedTrial && colID === this.state.selectedTrial.value;

  if (compareToColumn && compareToColumn.value === colID) {
    comparisonResult = params.data.comparisonResult;
    isComparing = true;
  }

  return classNames({
    'text-right': true,
    'cell-higher': comparisonResult === 'higher',
    'cell-minor': comparisonResult === 'minor',
    'green-dashboard': isSelected && params.data.isDataSummary,
    'blue text-white': isComparing && params.data.isDataSummary
  });
}

export function handleAddTrial(
  customID,
  idTrial,
  requestID,
  copyTrial,
  fromImport
) {
  const trials = this.getAllTrials();
  if (
    trials !== null &&
    trials.length === Constantes.DASHBOARD_MAX_NUMBER_OF_TRIALS
  ) {
    toast.warn(
      `${this.props.intl.formatMessage({
        id: 'dashboard.messages.maxTrialsReached'
      })}`
    );
    return;
  }
  const columnID =
    customID !== null && customID > 0 ? customID : generateCustomID();
  const priceTrialColumnID = `priceTrial${columnID}`;
  const quantityColumnID = `quantity${columnID}`;
  const trialName = copyTrial ? this.state.trialName : '';
  const trialCost = copyTrial ? this.state.trialCost : 0;
  const headerName = copyTrial
    ? this.state.trialCode
    : `Trial-${this.trialCounter++}`;
  const nombreFormula = copyTrial
    ? this.state.formulaName
    : `Fórmula-${parseInt(Math.random() * 10000, 10)}`;
  const newTrial = {
    columnIdentifier: columnID,
    isTrial: true,
    idTrial: idTrial ? idTrial : null,
    requestID: requestID
      ? requestID
      : this.state.requestID
      ? this.state.requestID
      : null,
    headerName,
    trialName,
    trialCost,
    formulaName: nombreFormula,
    unsaved: false,
    headerGroupComponent: 'customHeaderGroupComponent',
    savingInformation: false,
    onSave: columnIdentifier => {
      this.handleSaveFormula(columnIdentifier);
    },
    onEdit: columnIdentifier => {
      this.setState({
        dialogBoxTrialName: true,
        trialIdToEdit: columnIdentifier
      });
    },
    onClose: columnIdentifier => {
      if (
        !this.state.selectedTrial ||
        columnIdentifier === this.state.selectedTrial.value
      ) {
        toast.info(
          `${this.props.intl.formatMessage({
            id: 'dashboard.messages.cantCloseActiveTrial'
          })}`
        );
        return;
      }

      this.setState({
        dialogBoxDeleteTrial: true,
        trialIdToDelete: columnIdentifier
      });
    },
    children: [
      {
        columnIdentifier: columnID,
        headerName: `${this.props.intl.formatMessage({
          id: 'dashboard.dataGrid.col.priceTrial'
        })}`,
        field: priceTrialColumnID,
        width: 85,
        cellClass: 'green-cell-lighter',
        editable: false
      },
      {
        columnIdentifier: columnID,
        headerName: `${this.props.intl.formatMessage({
          id: 'dashboard.dataGrid.col.quantity'
        })}`,
        field: quantityColumnID,
        width: 85,
        editable: true,
        isEditable: true,
        cellClass: this.handleCellCss,
        valueSetter: this.validateInputTrial,
        valueFormatter: quantityFormatter
      }
    ]
  };

  const rowData = this.state.rowData;

  if (rowData !== null && rowData.length > 0) {
    rowData.forEach(row => {
      row[`priceTrial${columnID}`] = Util.numberFormat(
        0,
        Constantes.DECIMAL_FORMAT
      );
      row[`quantity${columnID}`] = 0;
    });
  }

  const columnDefs = this.state.columnDefs;
  columnDefs.push(newTrial);
  const trial = this.getTrialsForSelect(columnID);

  if (trial !== null && !fromImport) {
    this.setActiveTrial(trial[0]);
  }
}

export function closeTrial() {
  const { columnDefs, trialIdToDelete } = this.state;

  columnDefs.some((column, index) => {
    if (
      column.isTrial &&
      column.columnIdentifier === trialIdToDelete &&
      trialIdToDelete !== this.state.selectedTrial.value
    ) {
      columnDefs.splice(index, 1);
      this.setState({
        columnDefs: columnDefs,
        dialogBoxDeleteTrial: false,
        trialIdToDelete: null
      });
      return true;
    }
    return false;
  });

  this.setState({
    dialogBoxDeleteTrial: false,
    trialIdToDelete: null
  });
}

export function handleCopyTrial() {
  const trials = this.getAllTrials();

  if (trials === null || trials.length === 0) {
    toast.warn(
      `${this.props.intl.formatMessage({
        id: 'dashboard.messages.noTrials'
      })}`
    );
    return;
  }

  if (this.state.selectedTrial === null) {
    toast.warn(
      `${this.props.intl.formatMessage({
        id: 'dashboard.messages.noTrialSelected'
      })}`
    );
    return;
  }

  if (trials.length === Constantes.DASHBOARD_MAX_NUMBER_OF_TRIALS) {
    toast.warn(
      `${this.props.intl.formatMessage({
        id: 'dashboard.messages.maxTrialsReached'
      })}`
    );
    return;
  }

  const columnID = generateCustomID();
  const selectedTrial = this.state.selectedTrial.value;
  const rowData = this.state.rowData;
  const {
    trialName,
    formulaName,
    requestID,
    trialCode,
    trialCost
  } = this.state;

  const trial = this.getTrialByID(columnID);
  const oldTrial = this.getTrialByID(selectedTrial);

  this.handleAddTrial(columnID, null, null, true, false);
  trial.headerName = oldTrial.headerName;
  trial.trialName = oldTrial.trialName;
  trial.trialCost = oldTrial.trialCost;
  trial.comments = oldTrial.comments;
  trial.requestID = oldTrial.requestID;
  trial.formulaName = oldTrial.formulaName;
  if (oldTrial.unsaved) {
    this.getColumnModified(columnID);
  }

  this.setState({
    trialName,
    formulaName,
    trialCode,
    trialCost,
    requestID,
    isUpdate: requestID ? true : false,
    isRequestSelected: requestID !== null ? true : false
  });

  rowData.forEach(row => {
    row[`priceTrial${columnID}`] = row[`priceTrial${selectedTrial}`];
    row[`quantity${columnID}`] = row[`quantity${selectedTrial}`];
  });

  this.calculateTotal();
}

export function getAllTrials() {
  const trials = [];

  if (this.state.columnDefs !== null && this.state.columnDefs.length > 0) {
    this.state.columnDefs.forEach(row => {
      if (row.isTrial === true) {
        trials.push(row);
      }
    });
  }

  return trials;
}

export function getTrialsForSelect(columnID) {
  const trials = this.getAllTrials();
  const trialsOptions = [];

  if (columnID === null) {
    trials.forEach(trial => {
      trialsOptions.push({
        value: trial.columnIdentifier,
        label: trial.headerName
      });
    });
  } else {
    trials.some(trial => {
      if (trial.columnIdentifier === columnID) {
        trialsOptions.push({
          value: trial.columnIdentifier,
          label: trial.headerName
        });
        return true;
      }

      return false;
    });
  }

  return trialsOptions;
}

export function setCompareToTrial(item) {
  const trials = this.state.columnDefs;
  const columnIdentifier = item.value;
  const selectedTrialID = this.state.selectedTrial.value;
  const rowData = this.state.rowData;
  const quantityColumnToCompareID = `quantity${columnIdentifier}`;
  const quantityColumnSelectedID = `quantity${selectedTrialID}`;

  trials.forEach(trial => {
    if (trial.isTrial === true) {
      const isColumnToCompare = trial.columnIdentifier === columnIdentifier;

      if (!trial.isSelected) {
        trial.headerClass = classNames({
          'blue text-white': isColumnToCompare
        });

        trial.children.forEach(child => {
          child.headerClass = classNames({
            'blue text-white': isColumnToCompare
          });
        });
      }
    }
  });

  // SE COMPARA SEGÚN LA COLUMNA ACTIVA
  rowData.forEach(row => {
    const quantityColSel = parseFloat(row[quantityColumnSelectedID], 10);
    const quantityColToComp = parseFloat(row[quantityColumnToCompareID], 10);
    if (quantityColSel === quantityColToComp) {
      row.comparisonResult = 'same';
    } else if (quantityColSel < quantityColToComp) {
      row.comparisonResult = 'higher';
    } else {
      row.comparisonResult = 'minor';
    }
  });

  this.setState(
    {
      columnDefs: trials,
      compareTo: item,
      rowData: rowData
    },
    () => {}
  );
}

export function calculateTotal(valChange) {
  const rowData = this.state.rowData;
  const rowDataSummary = this.state.rowDataSummary;

  const kiloGrm = 1000;

  let expense = 0;
  let totalExpense = 0;

  const trials = this.getAllTrials();

  if (trials !== null && trials.length > 0) {
    trials.forEach(trial => {
      let totalPriceFormula = 0;
      let totalQuantity = 0;
      const columnID = trial.columnIdentifier;
      const quantityColumnID = `quantity${columnID}`;
      const priceTrialColumnID = `priceTrial${columnID}`;

      rowData.forEach(material => {
        const quantity = material[quantityColumnID]
          ? parseFloat(material[quantityColumnID], 10)
          : 0;
        const CostoUSD = material.CostoUSD
          ? parseFloat(Util.removeNumberFormat(material.CostoUSD), 10)
          : 0;
        const price = CostoUSD * quantity;
        const priceKgr = price / kiloGrm;

        material[priceTrialColumnID] = Util.numberFormat(
          priceKgr,
          Constantes.DECIMAL_FORMAT
        );
        material.priceFormula = Util.numberFormat(
          priceKgr,
          Constantes.DECIMAL_FORMAT
        );

        totalPriceFormula += parseFloat(
          parseFloat(priceKgr.toFixed(Constantes.TOTAL_TRIAL_DECIMALS), 10)
        );
        totalQuantity += quantity;

        // SE COMPARA SEGÚN LA COLUMNA ACTIVA Y SI EXISTE UNA COMPARACIÓN ACTIVA
        const compareTo = this.state.compareTo;
        const selectedTrial = this.state.selectedTrial;
        if (
          selectedTrial &&
          selectedTrial.value > 0 &&
          compareTo &&
          compareTo.value > 0
        ) {
          const quantityColumnToCompareID = `quantity${compareTo.value}`;
          const quantitySelectedTrial =
            material[`quantity${selectedTrial.value}`];
          const quantityColSel = parseFloat(quantitySelectedTrial, 10);
          const quantityColToComp = parseFloat(
            material[quantityColumnToCompareID],
            10
          );
          if (quantityColSel === quantityColToComp) {
            material.comparisonResult = 'same';
          } else if (quantityColSel < quantityColToComp) {
            material.comparisonResult = 'higher';
          } else {
            material.comparisonResult = 'minor';
          }
        }
      });

      if (trial.isSelected) {
        expense = isNaN(trial.trialCost) ? 0 : parseFloat(trial.trialCost, 10);
        totalExpense = totalPriceFormula;
      }

      rowDataSummary[0].Materia = `${this.props.intl.formatMessage(
        {
          id: 'dashboard.dataGrid.col.expense'
        },
        {
          totalExpense: Util.numberFormat(
            totalExpense + expense,
            Constantes.DECIMAL_FORMAT
          ),
          expense: Util.numberFormat(expense, Constantes.DECIMAL_FORMAT)
        }
      )}`;

      rowDataSummary[0][priceTrialColumnID] = Util.numberFormat(
        totalPriceFormula,
        Constantes.DECIMAL_FORMAT
      );

      rowDataSummary[0][quantityColumnID] = totalQuantity;
    });
  }

  const currentFocus = this.gridApi.getFocusedCell();

  this.setState(
    {
      rowData: rowData,
      rowDataSummary: rowDataSummary,
      isLoading: false,
      currentFocusUnsaved: currentFocus,
      rowDataUnsaved: this.state.rowData
    },
    () => {
      if (currentFocus !== null) {
        const rowIndex =
          currentFocus.rowIndex === this.state.rowData.length - 1
            ? currentFocus.rowIndex
            : currentFocus.rowIndex + 1;

        this.gridApi.setFocusedCell(rowIndex, currentFocus.column.colId);
      }
      // eslint-disable-next-line
      valChange ? this.getColumnModified(valChange) : null;
    }
  );
}

/* SAVE FORMULA */

export function handleSaveFormula(columnIdentifier) {
  const trials = this.getAllTrials();
  const components = this.state.rowData;

  if (
    !trials ||
    trials.length === 0 ||
    !components ||
    components.length === 0
  ) {
    toast.info(
      `${this.props.intl.formatMessage({
        id: 'dashboard.messages.errorEmptyInfo'
      })}`
    );
    return;
  }

  let trialToSave = [];
  let trialToSaveCero = [];
  let formulaID = null;
  let requestID = null;
  let flag = false;
  const detalleTrial = [];
  const detalleTrialCero = [];
  const selectedTrial = this.state.selectedTrial;
  const trial = this.getTrialByID(columnIdentifier);

  this.setState(
    {
      savingInformation: true,
      columnIdentifier
    },
    () => {
      updateColumnState(this, trial);
    }
  );

  const columnID = trial.columnIdentifier;

  requestID = trial.requestID ? trial.requestID : null;
  formulaID = trial.codFormula;

  components.forEach(component => {
    const quantity = component[`quantity${columnID}`];
    // eslint-disable-next-line
    !quantity ? (flag = true) : null;
    if (component.materialType === 'MATERIAL') {
      if (quantity) {
        detalleTrial.push({
          IndTipoComponente: 'MATERIAL',
          CodComponente: component.CodSun,
          CantidadUtilizada: quantity
        });
      }
      detalleTrialCero.push({
        IndTipoComponente: 'MATERIAL',
        CodComponente: component.CodSun,
        CantidadUtilizada: quantity
      });
    } else if (component.materialType === 'FORMULA') {
      if (quantity) {
        detalleTrial.push({
          IndTipoComponente: 'FORMULA',
          CodFormula: component.CodSun,
          VersionFormula: component.NumVersion,
          CantidadUtilizada: quantity
        });
      }
      detalleTrialCero.push({
        IndTipoComponente: 'FORMULA',
        CodFormula: component.CodSun,
        VersionFormula: component.NumVersion,
        CantidadUtilizada: quantity
      });
    } else if (component.materialType === 'FORMULA_LIB_PERSONAL') {
      if (quantity) {
        detalleTrial.push({
          IndTipoComponente: 'FORMULA_LIB_PERSONAL',
          CodFormula: component.CodSun,
          VersionFormula: component.NumVersion,
          CantidadUtilizada: quantity
        });
      }
      detalleTrialCero.push({
        IndTipoComponente: 'FORMULA_LIB_PERSONAL',
        CodFormula: component.CodSun,
        VersionFormula: component.NumVersion,
        CantidadUtilizada: quantity
      });
    }
  });

  const comments = [];

  if (trial.comments && trial.comments.length > 0) {
    trial.comments.forEach(comment => {
      comments.push(comment.comment);
    });
  }

  trialToSave = {
    TrialActivo: trial.columnIdentifier === selectedTrial.value,
    CodTrial: trial.headerName,
    NombreTrial: trial.trialName,
    GastoTrial: trial.trialCost,
    IdDisenoTrial: trial.idTrial && trial.idTrial > 0 ? trial.idTrial : null,
    Observaciones: comments,
    IdSolicitud: trial.requestID,
    DetalleTrial: detalleTrial
  };

  trialToSaveCero = {
    TrialActivo: trial.columnIdentifier === selectedTrial.value,
    CodTrial: trial.headerName,
    NombreTrial: trial.trialName,
    GastoTrial: trial.trialCost,
    IdDisenoTrial: trial.idTrial && trial.idTrial > 0 ? trial.idTrial : null,
    Observaciones: comments,
    IdSolicitud: trial.requestID,
    DetalleTrial: detalleTrialCero
  };

  const saveFormulaObj = {
    CodFormula: formulaID && formulaID > 0 ? formulaID : null,
    IdSolicitud: requestID,
    NombreFormula: trial.formulaName,
    Trial: trialToSave
  };
  const saveFormulaObjCero = {
    CodFormula: formulaID && formulaID > 0 ? formulaID : null,
    IdSolicitud: requestID,
    NombreFormula: trial.formulaName,
    Trial: trialToSaveCero
  };
  flag
    ? this.setState({
        dialogBoxMaterialsZero: true,
        trialsModalZero: {
          trial: trials,
          saveFormulaObjCero: saveFormulaObjCero,
          saveFormulaObj: saveFormulaObj,
          columnIdentifier: columnIdentifier
        }
      })
    : this.saveFormula(trials, saveFormulaObj);
}

function updateColumnState(_this, trial) {
  if (trial) {
    trial.savingInformation = _this.state.savingInformation;
    trial.unsaved = _this.state.unsaved;
    const columnDefs = _this.state.columnDefs;
    _this.setState({ columnDefs }, () => {
      const currentFocus = _this.state.currentFocusUnsaved;
      const rowData = _this.state.rowDataUnsaved;
      if (currentFocus !== null) {
        const rowIndex =
          currentFocus.rowIndex === rowData.length - 1
            ? currentFocus.rowIndex
            : currentFocus.rowIndex + 1;
        _this.gridApi.setFocusedCell(rowIndex, currentFocus.column.colId);
      }
    });
  }
}

export function handleCloseModalZero(trialInfo) {
  const trial = this.getTrialByID(trialInfo);
  this.setState(
    {
      dialogBoxMaterialsZero: false,
      savingInformation: false
    },
    () => {
      updateColumnState(this, trial);
    }
  );
}

export function getColumnModified(trialID) {
  const trial = this.getTrialByID(trialID);
  this.setState(
    {
      savingInformation: false,
      unsaved: true
    },
    () => {
      updateColumnState(this, trial);
    }
  );
}

export function saveFormula(trials, formulaObj) {
  this.formulaService.saveFormula(formulaObj).then(
    response => {
      if (response && response.status === 200) {
        const trialsSaved = response.data.Trials;
        const codFormulaSaved = response.data.FormulaID;

        let trialSaved = null;
        trials.forEach(trial => {
          if (
            trial &&
            trial.isTrial &&
            trial.columnIdentifier === this.state.columnIdentifier
          ) {
            trial.idTrial = trialsSaved[0].IdDisenoTrial;
            trial.codFormula = codFormulaSaved;
            trialSaved = trial;
          }
        });
        this.setState(
          {
            codFormula: codFormulaSaved,
            savingInformation: false,
            unsaved: false,
            dialogBoxMaterialsZero: false,
            columnIdentifier: null
          },
          () => {
            updateColumnState(this, trialSaved);
          }
        );
        toast.success(
          `${this.props.intl.formatMessage({
            id: 'dashboard.messages.saveSuccess'
          })}`
        );
      }
    },
    response => {
      console.error(response);
      let trialSaved = null;
      trials.forEach(trial => {
        if (
          trial &&
          trial.isTrial &&
          trial.columnIdentifier === this.state.columnIdentifier
        ) {
          trialSaved = trial;
        }
      });
      this.setState(
        {
          savingInformation: false,
          columnIdentifier: null
        },
        () => {
          updateColumnState(this, trialSaved);
        }
      );
      toast.error(
        `${this.props.intl.formatMessage({
          id: 'dashboard.messages.saveError'
        })}`
      );
    }
  );
}
export function importTrialFromPersonalLib() {
  if (!this.props.location.params) {
    return;
  }
  this.setState({ isLoading: true });
  const {
    trialToImport,
    codFormulaToImport,
    versionToImport,
    nombreFormulaToImport,
    oldVersion,
    idSolicitud,
    fromPersonalLib
  } = this.props.location.params;
  let counter = trialToImport.length - 1;
  this.trialService.getById(trialToImport).then(response => {
    const customIDSaved = [];
    trialToImport.forEach((idTrial, index) => {
      if (idTrial !== null && oldVersion === true) {
        const customID = generateCustomID();
        customIDSaved.push(customID);

        this.handleAddTrial(
          customID,
          idTrial,
          fromPersonalLib ? idSolicitud[index] : null,
          false,
          true
        );
      }
    });

    trialToImport.forEach((idTrial, index) => {
      if (idTrial !== null && oldVersion === true) {
        const data = response.data[index];
        const data2 = response.data[counter];
        const formulaName = data.NombreFormula;
        const trialCode = data.CodigoTrial;
        const codFormula = data2.CodigoFormula;
        const trialName = data.NombreTrial;
        const trialCost = data.GastoTrial;
        const isValidIFRA = data.IfraValido;
        const stateRowData = this.state.rowData;
        let selectedTrial = null;
        const trialsToPrint = [];
        const trial = this.getTrialByID(customIDSaved[index]);
        trial.headerName = trialCode;
        trial.trialName = trialName;
        trial.formulaName = formulaName;
        trial.codFormula = codFormula;
        trial.trialCost = trialCost;
        trial.requestID = idSolicitud[index];
        trial.comments = [];
        trial.isValidIFRA = isValidIFRA || false;
        if (data.TrialObs && data.TrialObs.length > 0) {
          data.TrialObs.forEach(obs => {
            trial.comments.push({
              id: obs.IdObservacionTrial,
              comment: obs.Observacion
            });
          });
        }

        const rowData = data2.Materials;
        const oldData = stateRowData;

        rowData.forEach(material => {
          const quantity = parseFloat(material.CantidadUtilizada, 10);
          material[`quantity${customIDSaved[counter]}`] = quantity;

          material.customID = customIDSaved[counter];
          material.CodSun = material.CodMaterial;
          material.Materia = material.Material;
          material.CostoUSD =
            material.CostoUSD && material.CostoUSD > 0
              ? Util.numberFormat(material.CostoUSD, Constantes.DECIMAL_FORMAT)
              : Util.numberFormat(0, Constantes.DECIMAL_FORMAT);
          material.materialType =
            material.TipoComponente === 'MATERIAL' ? 'MATERIAL' : 'FORMULA';
          stateRowData.forEach((oldMaterial, oldIndex) => {
            if (oldMaterial.CodSun === material.CodMaterial) {
              customIDSaved.forEach(savedID => {
                if (customIDSaved[counter] !== savedID) {
                  material[`quantity${savedID}`] =
                    oldMaterial[`quantity${savedID}`];
                }
              });
              oldData.splice(oldIndex, 1);
            }
          });
        });

        if (index === 0) {
          selectedTrial = {
            label: data.CodigoTrial,
            value: data.IdTrial
          };
          trialsToPrint.push(selectedTrial);

          this.setState({
            selectedTrial,
            trialsToPrint
          });
        }
        const trialSelected = this.getTrialsForSelect(customIDSaved[0]);
        this.setActiveTrial(trialSelected[0]);

        this.setState(
          {
            isValidIFRA: data2.IfraValido,
            isLoading: true,
            trialCode: data2.CodigoTrial,
            trialCost: data2.GastoTrial,
            trialName: data2.NombreTrial,
            formulaName: data2.NombreFormula,
            rowData: [...rowData, ...oldData]
          },
          () => {
            this.calculateTotal();
          }
        );
      } else {
        trialToImport.forEach((idTrial, index) => {
          const customID = generateCustomID();
          this.handleAddTrial(
            customID,
            idTrial,
            fromPersonalLib ? idSolicitud[index] : null,
            false,
            true
          );
          this.formulaService
            .getFormulaById({
              CodFormula: codFormulaToImport,
              NumVersion: versionToImport
            })
            .then(response => {
              const rowData = response.data;
              const formulaName = nombreFormulaToImport;

              if (rowData !== null && rowData.length > 0) {
                rowData.forEach(material => {
                  material.CodSun = material.CodComponente;
                  material.Materia = material.NombreComponente;

                  material.materialType =
                    material.TipoComponente === 'MATERIAS PRIMAS'
                      ? 'MATERIAL'
                      : 'FORMULA';
                  material.CostoUSD =
                    material.CostoUSDKilo && material.CostoUSDKilo > 0
                      ? Util.numberFormat(
                          material.CostoUSDKilo,
                          Constantes.DECIMAL_FORMAT
                        )
                      : Util.numberFormat(0, Constantes.DECIMAL_FORMAT);
                  const quantity = parseFloat(material.CantidadUtilizada, 10);

                  material[`quantity${customID}`] = quantity;
                });

                this.setState(
                  {
                    formulaName,
                    rowData
                  },
                  () => {
                    this.calculateTotal();
                  }
                );
              }
            });
        });
      }
      counter--;
    });
  });
}

export function toggleModalTrialName() {
  this.setState({ dialogBoxTrialName: !this.state.dialogBoxTrialName });
}

export function toggleModalMaterialsZero() {
  this.setState({ dialogBoxMaterialsZero: !this.state.dialogBoxMaterialsZero });
}

export function getTrialTrialInformationByID(trialID) {
  const trialDetail = this.getTrialByID(trialID);
  return trialDetail
    ? {
        trialCode: trialDetail.headerName,
        trialName: trialDetail.trialName,
        formulaName: trialDetail.formulaName,
        trialCost: trialDetail.trialCost,
        requestCode: trialDetail.requestID ? trialDetail.requestID : null
      }
    : {};
}

export function resetDashboard() {
  this.setState({
    rowData: [],
    dialogBoxResetMaterials: false
  });
}

export function toggleModalResetDashboard() {
  this.setState({
    dialogBoxResetMaterials: !this.state.dialogBoxResetMaterials
  });
}
