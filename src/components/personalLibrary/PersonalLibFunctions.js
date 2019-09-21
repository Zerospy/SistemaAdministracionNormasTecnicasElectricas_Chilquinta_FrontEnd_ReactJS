import * as Util from 'commons/Util.js';
import { toast } from 'react-toastify';
import Constantes from 'Constantes';

export function getTrialID() {
  return this.trialID;
}

export function toggleModalPersonalLibDetail() {
  this.setState({
    modalSelectedFormula: !this.state.modalSelectedFormula
  });
}

export function onClickAddFormula(node) {
  let rowSelected = this.state.selectedFormula;
  if (node.isSelected === true) {
    node.isSelected = false;
    rowSelected = rowSelected.filter(item => item.IdTrial !== node.IdTrial);
  } else {
    if (rowSelected.length === Constantes.DASHBOARD_MAX_NUMBER_OF_TRIALS) {
      toast.info(
        `${this.props.intl.formatMessage(
          {
            id: 'personalLib.messages.maxTrialsReached'
          },
          { maxTrials: Constantes.DASHBOARD_MAX_NUMBER_OF_TRIALS }
        )}`
      );
      return;
    } else {
      node.isSelected = true;
      rowSelected.push(node);
    }
  }
  this.setState({
    selectedFormula: rowSelected
  });
  // Se refresca la tabla para visualizar el cambio
  this.forceUpdate();
}

export function onClickDetailTrial(rowData) {
  const { IdTrial } = rowData;
  this.setState(
    {
      modalDetFormula: !this.state.modalDetFormula
    },
    () => {
      this.setState({
        loadingFormulaInformation: true
      });
      this.trialService.getById(IdTrial).then(
        response => {
          const data =
            response.data && response.data[0].Materials
              ? response.data[0].Materials
              : [];
          if (data) {
            const formulaData = this.state.formulaData;
            formulaData.rows = data;

            this.setState({
              formulaData: formulaData,
              loadingFormulaInformation: false
            });
          } else {
            this.setState({
              loadingFormulaInformation: false,
              modalDetFormula: !this.state.modalDetFormula
            });
          }
        },
        () => {
          this.setState({
            loadingFormulaInformation: false,
            modalDetFormula: !this.state.modalDetFormula
          });
        }
      );
    }
  );
}

export function onClickValidateIFRA(rowData) {
  const { IdTrial } = rowData;
  this.trialID = IdTrial;

  this.toggleModalValidateIFRA();
}

export function onClickGenExp(rowData) {
  const { IdTrial } = rowData;
  this.trialID = IdTrial;

  this.toggleModalOfficialize();
}

export function onClickAddComments(rowData) {
  const { IdTrial } = rowData;
  this.trialID = IdTrial;

  this.toggleModalComments();
}

export function onClickDeleteTrial(node) {
  const trialID = node.data.IdTrial;

  this.setState({
    dialogBoxDeleteTrial: true,
    trialIdToDelete: trialID
  });
}

export function onShareTrial(node) {
  const trialID = node.data.IdTrial;

  this.setState({
    modalShareTrial: true,
    trialIdToShare: trialID
  });
}

export function toggleModalShareTrial() {
  this.setState({
    modalShareTrial: false
  });
}

export function searchTrials() {
  const IdSolicitud = this.state.filter.IdSolicitud;
  const FechaCreacion = this.state.filter.FechaCreacion;
  const nombreFormula = this.state.filter.nombreFormula;
  const codTrial = this.state.filter.codTrial;
  const nombreTrial = this.state.filter.nombreTrial;
  const nombreDelegado = this.state.filter.nombreDelegado;
  const myFormulas = this.state.filter.myFormulas;

  this.setState({
    isLoading: true
  });

  this.trialService
    .get({
      PageIndex: this.state.pagination.PageIndex,
      RowsPerPage: this.state.pagination.RowsPerPage,
      IdSolicitud:
        IdSolicitud !== null && IdSolicitud !== '' ? IdSolicitud : null,
      FechaCreacion:
        FechaCreacion !== null && FechaCreacion !== '' ? FechaCreacion : null,
      NombreFormula:
        nombreFormula !== null && nombreFormula !== '' ? nombreFormula : null,
      NombreTrial:
        nombreTrial !== null && nombreTrial !== '' ? nombreTrial : null,
      CodTrial: codTrial !== null && codTrial !== '' ? codTrial : null,
      NombreDelegado:
        nombreDelegado !== null && nombreDelegado !== ''
          ? nombreDelegado
          : null,
      UserFlag: myFormulas
    })
    .then(
      response => {
        if (response && response.status === 200 && response.data) {
          const Trials = response.data ? response.data.Trials : [];
          const pagination = response.data.Pagination;
          const formulaSelected = this.state.selectedFormula;
          if (Trials && Trials.length > 0) {
            Trials.forEach(trial => {
              formulaSelected.filter(item => item.IdTrial === trial.IdTrial)
                .length
                ? (trial.isSelected = true)
                : (trial.isSelected = false);
              trial.FechaCreacion = trial.FechaCreacion
                ? Util.formatDateWithPattern(
                    trial.FechaCreacion,
                    Constantes.DATETIME_CRAMER_FORMAT,
                    Constantes.DATE_FORMAT
                  )
                : '---';
              trial.FechaActualizacion = trial.FechaActualizacion
                ? Util.formatDateWithPattern(
                    trial.FechaActualizacion,
                    Constantes.DATETIME_CRAMER_FORMAT,
                    Constantes.DATE_FORMAT
                  )
                : '---';

              trial.CostoUSD = trial.CostoUSD
                ? Util.numberFormat(trial.CostoUSD, Constantes.DECIMAL_FORMAT)
                : Util.numberFormat(0, Constantes.DECIMAL_FORMAT);

              trial.GastoTrial = trial.GastoTrial
                ? Util.numberFormat(trial.GastoTrial, Constantes.DECIMAL_FORMAT)
                : Util.numberFormat(0, Constantes.DECIMAL_FORMAT);

              trial.CodigoExperimental = !trial.CodigoExperimental
                ? '---'
                : trial.CodigoExperimental;

              trial.IdSolicitud = !trial.IdSolicitud
                ? '---'
                : trial.IdSolicitud;
              trial.NombreDelegado = !trial.NombreDelegado
                ? '---'
                : Util.firstLetterString(trial.NombreDelegado);
              trial.EstadoStr = trial.Estado === 'V' ? 'VIGENTE' : 'NO VIGENTE';
              trial.AprobacionStr =
                trial.NumVersion === '0' ? 'EXPERIMENTAL' : 'OFICIAL';
            });
          }

          this.setState({
            detIdTrial: '',
            detCodFormula: '',
            detNameFormula: '',
            detNameTrial: '',
            detVersionFormula: '',
            detTriangleTop: '',
            detTriangleMiddle: '',
            detTriangleBottom: '',
            detFamilyCategory: '',
            detFamilySubCategory: '',
            detFamilySubSubCategory: '',
            loadingDetFormulaInformation: false,
            isLoading: false,
            pagination: {
              PageIndex: pagination.PageIndex,
              RowsPerPage: pagination.RowsPerPage,
              TotalPages: pagination.TotalPages,
              TotalRows: pagination.TotalRows
            },
            rowData: Trials
          });
        } else {
          this.setState({
            isLoading: false
          });
          console.error('Ocurrió un error al obtener los datos');
        }
      },
      () => {
        this.setState({
          isLoading: false
        });
      }
    );
}

export function handleClickBtnSearch() {
  if (this.gridApi) {
    this.gridApi.showLoadingOverlay();
  }

  this.setState(
    {
      pagination: {
        ...this.state.pagination,
        PageIndex: 1,
        RowsPerPage: Constantes.DEFAULT_PAGE_SIZE
      },
      filter: {
        IdSolicitud: this.state.IdSolicitud,
        nombreFormula: this.state.nombreFormula,
        nombreDelegado: this.state.nombreDelegado,
        nombreTrial: this.state.nombreTrial,
        codTrial: this.state.codTrial,
        FechaCreacion: this.state.FechaCreacion,
        myFormulas: this.state.myFormulas
      }
    },
    () => {
      this.searchTrials();
    }
  );
}

export function onRowSelection(selectedRows) {
  const onSelect =
    this.props.onSelect && typeof this.props.onSelect === 'function'
      ? this.props.onSelect
      : null;

  this.setState({
    selectedRows
  });

  if (onSelect !== null) {
    onSelect(selectedRows);
  }
}

export function getItemByKey(list, key) {
  let result = null;

  list.some(item => {
    if (item.value === key) {
      result = item;
      return true;
    }
    return false;
  });

  return result;
}

export function onRowClicked(params) {
  if (params.event.target.localName !== 'div') {
    return;
  }

  const { data } = params;

  this.setState({
    detCodFormula: '',
    detNameFormula: '',
    detNameTrial: '',
    detVersionFormula: '',
    detFamilyCategory: null,
    detFamilySubCategory: null,
    detFamilySubSubCategory: null,
    detTriangleTop: '',
    detTriangleMiddle: '',
    detTriangleBottom: '',
    loadingDetFormulaInformation: true
  });

  const idTrial = data.IdTrial;
  const categoryFamilyList = this.state.categoryFamilyList;
  const categorySubFamilyList = this.state.categorySubFamilyList;
  this.trialService.getById(idTrial).then(
    response => {
      const responseData = response && response.data ? response.data[0] : null;
      if (responseData !== null) {
        const detFamilyCategory =
          responseData.FamiliaCategoria && responseData.FamiliaCategoria !== '0'
            ? this.getItemByKey(
                categoryFamilyList,
                responseData.FamiliaCategoria
              )
            : '';
        const detFamilySubCategory =
          responseData.FamiliaSubCategoria &&
          responseData.FamiliaSubCategoria !== '0'
            ? this.getItemByKey(
                categorySubFamilyList,
                responseData.FamiliaSubCategoria
              )
            : '';
        const detFamilySubSubCategory = responseData.FamiliaSubSubCategoria
          ? responseData.FamiliaSubSubCategoria
          : '';

        this.setState({
          detIdTrial: responseData.IdTrial,
          detCodFormula: responseData.CodigoTrial
            ? responseData.CodigoTrial
            : '',
          detNameFormula: responseData.NombreFormula
            ? responseData.NombreFormula
            : '',
          detNameTrial: responseData.NombreTrial
            ? responseData.NombreTrial
            : '',
          detVersionFormula: responseData.VersionFormula
            ? responseData.VersionFormula
            : '',
          detTriangleTop: responseData.TrianguloCabeza
            ? responseData.TrianguloCabeza
            : '',
          detTriangleMiddle: responseData.TrianguloCorazon
            ? responseData.TrianguloCorazon
            : '',
          detTriangleBottom: responseData.TrianguloFondo
            ? responseData.TrianguloFondo
            : '',
          detFamilyCategory: detFamilyCategory,
          detFamilySubCategory: detFamilySubCategory,
          detFamilySubSubCategory: detFamilySubSubCategory,
          detObservations: responseData.TrialObs,
          loadingDetFormulaInformation: false
        });
      } else {
        this.setState({
          loadingDetFormulaInformation: false
        });
      }
    },
    () => {
      this.setState({
        loadingDetFormulaInformation: false
      });
    }
  );
}

export function toggleModalDetFormula() {
  if (!this.state.loadingFormulaInformation) {
    this.setState({
      modalDetFormula: !this.state.modalDetFormula
    });
  }
}

/* MODAL VALIDATE IFRA */
export function toggleModalValidateIFRA() {
  this.setState({
    modalValidateIFRA: !this.state.modalValidateIFRA
  });
}

export function toggleModalOfficialize() {
  this.setState({
    modalOfficialize: !this.state.modalOfficialize
  });
}

export function toggleModalValidateIFRAResult() {
  this.setState({
    modalValidateIFRAResult: !this.state.modalValidateIFRAResult
  });
}

export function setIsValidIFRA(valid) {
  this.setState({
    isValidIFRA: valid
  });

  this.searchTrials();
}

export function toggleModalComments() {
  this.setState({
    modalComments: !this.state.modalComments
  });
}

export function saveTrialDetails() {
  this.setState({
    loadingDetFormulaInformation: true
  });

  this.trialService
    .saveTrialDetails({
      idTrial: this.state.detIdTrial,
      nombreFormula: this.state.detNameFormula,
      trianguloCabeza: this.state.detTriangleTop,
      trianguloCorazon: this.state.detTriangleMiddle,
      trianguloBase: this.state.detTriangleBottom,
      familiaCategoria: this.state.detFamilyCategory
        ? this.state.detFamilyCategory.value
        : null,
      familiaSubCategoria: this.state.detFamilySubCategory
        ? this.state.detFamilySubCategory.value
        : null,
      familiaSubSubCategoria: this.state.detFamilySubSubCategory
        ? this.state.detFamilySubSubCategory
        : null
    })
    .then(
      () => {
        this.setState({
          loadingDetFormulaInformation: false
        });

        toast.success(
          `${this.props.intl.formatMessage({
            id: 'personalLib.messages.saveTrial.success'
          })}`
        );
      },
      () => {
        this.setState({
          loadingDetFormulaInformation: false
        });

        toast.error(
          `${this.props.intl.formatMessage({
            id: 'personalLib.messages.saveTrial.error'
          })}`
        );
      }
    );
}

export function importOnDashboard() {
  const selectedRows = this.state.selectedFormula;
  const trialInformation = selectedRows[0];
  const idSolicitud = [];
  const nombreFormula = trialInformation.NombreFormula;
  const numVersion = trialInformation.NumeroVersion;
  const CodFormulaExp = trialInformation.CodigoTrialExperimental;
  let idTrial = [];
  if (selectedRows.length > 1) {
    selectedRows.forEach(trialInfo => {
      idTrial.push(trialInfo.IdTrial);
      trialInfo.IdSolicitud && trialInfo.IdSolicitud !== '---'
        ? idSolicitud.push(trialInfo.IdSolicitud)
        : idSolicitud.push(null);
    });
  } else {
    idTrial = trialInformation.IdTrial;
    trialInformation.IdSolicitud && trialInformation.IdSolicitud !== '---'
      ? idSolicitud.push(trialInformation.IdSolicitud)
      : idSolicitud.push(null);
  }

  this.setState({
    isImportingFormula: true
  });

  this.trialService.getById(idTrial).then(
    response => {
      this.setState({
        isImportingFormula: false
      });

      if (response && response.status === 200) {
        const data = response.data[0];
        const versionActual = data.VersionActual;
        if (versionActual === numVersion) {
          this.redirectToImport({
            idSolicitud,
            idTrial,
            numVersion,
            oldVersion: true
          });
        } else {
          this.setState(
            {
              importFormulaIdSolicitud: idSolicitud,
              importFormulaIdTrial: idTrial,
              importFormulaNombreFormula: nombreFormula,
              importFormulaIdCodFormula: CodFormulaExp,
              importFormulaLastVersion: versionActual
            },
            () => {
              this.toggleDialogBoxImportOldTrial();
            }
          );
        }
      }
    },
    () => {
      this.setState({
        isImportingFormula: false
      });
      console.log(
        'Ocurrió un problema al consultar la última versión de fórmula'
      );
    }
  );
}

export function toggleDialogBoxImportOldTrial() {
  this.setState({
    dialogBoxImportOldTrial: !this.state.dialogBoxImportOldTrial
  });
}

export function redirectToImport(params) {
  const {
    idSolicitud,
    idTrial,
    formulaNameToImport,
    codFormulaToImport,
    versionToImport,
    oldVersion
  } = params;
  let trialToImport = [];
  typeof idTrial === 'string'
    ? trialToImport.push(idTrial)
    : (trialToImport = idTrial);

  this.props.history.push({
    pathname: '/dashboard',
    params: {
      trialToImport: trialToImport,
      formulaNameToImport: formulaNameToImport,
      versionToImport: versionToImport,
      codFormulaToImport: codFormulaToImport,
      oldVersion: oldVersion === true ? true : false,
      idSolicitud: idSolicitud ? idSolicitud : null,
      fromPersonalLib: true
    }
  });
}
