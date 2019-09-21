export function onClickDetailMaterial(rowData) {
  const { CodSun } = rowData;
  this.setState(
    {
      modalDetFormula: !this.state.modalDetFormula
    },
    () => {
      this.setState({
        loadingFormulaInformation: true
      });
      this.trialService.getAlById(CodSun).then(
        response => {
          const data = response.data && response.data[0] ? response.data : [];
          if (data) {
            const formulaData = this.state.formulaData;
            formulaData.rows = [];
            
            data.forEach(detail => {
              formulaData.rows.push({
                CanResultado: detail.CanResultado,
                CodParametro: detail.CodParametro,
                DesParametro: detail.DesParametro,
                NumCas: detail.NumCas
              });
            });

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

export function toggleModalDetFormula() {
  if (!this.state.loadingFormulaInformation) {
    this.setState({
      modalDetFormula: !this.state.modalDetFormula
    });
  }
}
