import React from 'react';
import ProductInfoComponent from './ProductInfoComponent';
import { toast } from 'react-toastify';
import FormulaService from 'services/FormulaService';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

class ClientDataComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: '',
      section: '',
      clientName: '',
      clientType: '',
      country: '',
      seller: '',
      labDate: '',
      delegate: '',
      productCode: '',
      productName: '',
      cost: '',
      quantity: '',
      dosisMinor: '',
      dosisHigher: '',
      unidosif: '',
      aplication: '',
      sellerObs: ''
    };

    this.formulaService = new FormulaService();
  }

  getRequest() {
    const { isReady } = this.props;
    if (this.props.isRequestSelected && this.props.requestID) {
      this.formulaService.getRequestsById(this.props.requestID).then(
        response => {
          const data = response.data;
          this.setState({
            project: data.Resumen.NroMuestra,
            section: data.Resumen.NombreSeccion,
            clientName: data.Resumen.NombreCliente,
            clientType: data.Resumen.TipoCliente,
            country: data.Resumen.NombrePais,
            seller: data.Resumen.NombreVendedor,
            labDate: data.Resumen.FechaEntrega,
            delegate: data.Resumen.NombreDelegado,
            productCode: data.Detalle.CodVenta,
            productName: data.Detalle.Nombre,
            cost: data.Detalle.CostoSaborizacion,
            quantity: data.Detalle.CantidadGramos,
            dosisMinor: data.Detalle.DosificacionMenor,
            dosisHigher: data.Detalle.DosificacionMayor,
            unidosif: data.Detalle.Unidad,
            aplication: data.Detalle.Aplicacion,
            sellerObs: data.Detalle.ObsVendedor
          });
          if (typeof isReady === 'function') {
          isReady();
          }
        },
        response => {
          toast.error(
            `${this.props.intl.formatMessage({
              id: 'dashboard.messages.errorGetRequestInfo'
            })}`
          );
          console.error(response);
        }
      );
    }
  }

  componentDidMount() {
    this.getRequest();
  }
  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.isUpdate) !==
      JSON.stringify(prevProps.isUpdate)
    ) {
      this.getRequest();
    }
  }

  render() {
    return (
      <div className="d-flex align-content-start flex-wrap">
        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.sample'
          })}`}
        >
          {this.state.project}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.section'
          })}`}
        >
          {this.state.section}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.clientName'
          })}`}
        >
          {this.state.clientName}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.clientType'
          })}`}
        >
          {this.state.clientType}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.country'
          })}`}
        >
          {this.state.country}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.seller'
          })}`}
        >
          {this.state.seller}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.deliverDate'
          })}`}
        >
          {this.state.labDate}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.delegate'
          })}`}
        >
          {this.state.delegate}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.productCode'
          })}`}
        >
          {this.state.productCode}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.productName'
          })}`}
        >
          {this.state.productName}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.cost'
          })}`}
        >
          {this.state.cost}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.quantity'
          })}`}
        >
          {this.state.quantity}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.lowerDosage'
          })}`}
        >
          {this.state.dosisMinor !== null
            ? `${this.state.dosisMinor} ${this.state.unidosif}`
            : null}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.higherDosage'
          })}`}
        >
          {this.state.dosisHigher !== null
            ? `${this.state.dosisHigher} ${this.state.unidosif}`
            : null}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.application'
          })}`}
        >
          {this.state.aplication}
        </ProductInfoComponent>

        <ProductInfoComponent
          title={`${this.props.intl.formatMessage({
            id: 'dashboard.clientData.observations'
          })}`}
        >
          {this.state.sellerObs}
        </ProductInfoComponent>
      </div>
    );
  }
}

export default injectIntl(ClientDataComponent);

ClientDataComponent.propTypes = {
  data: PropTypes.any,
  isRequestSelected: PropTypes.any,
  requestID: PropTypes.any,
  isReady: PropTypes.func,
  intl: PropTypes.any,
  isUpdate: PropTypes.any
};
