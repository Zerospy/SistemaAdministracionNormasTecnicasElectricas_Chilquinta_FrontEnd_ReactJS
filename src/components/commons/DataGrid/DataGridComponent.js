import {AgGridReact} from 'ag-grid-react';
import classNames from 'classnames';
import {Container, Fa} from 'mdbreact';
import PropTypes from 'prop-types';
import React from 'react';
import HeaderGroupComponent from 'components/commons/DataGrid/HeaderGroupComponent';
import DetailButtonGridRenderer from 'components/commons/DataGrid/DetailButtonGridRenderer';
import DetailButtonGridEdit from 'components/commons/DataGrid/DetailButtonGridEdit';
import DetailAlergenButtonGridRenderer from 'components/commons/DataGrid/DetailAlergenButtonGridRenderer';
import CustomCheckboxRenderer from 'components/commons/DataGrid/CustomCheckboxRenderer';
import GenerateExpButtonGridRenderer from 'components/commons/DataGrid/GenerateExpButtonGridRenderer';
import ValidateIfraButtonGridRenderer from 'components/commons/DataGrid/ValidateIfraButtonGridRenderer';
import CommentsButtonGridRenderer from 'components/commons/DataGrid/CommentsButtonGridRenderer';
import RemoveIconGridRenderer from 'components/commons/DataGrid/RemoveIconGridRenderer';
import RemoveButtonGridRenderer from 'components/commons/DataGrid/RemoveButtonGridRenderer';
import ShareButtonGridRenderer from 'components/commons/DataGrid/ShareButtonGridRenderer';
import AddMaterialButtonRenderer from 'components/commons/DataGrid/AddMaterialButtonRenderer';
import MaterialBannedComponent from 'components/commons/DataGrid/MaterialBannedComponent';
import LoadingComponent from 'components/commons/base/LoadingComponent';
import {FormattedMessage, injectIntl} from 'react-intl';
import * as Util from 'commons/Util.js';
import moment from 'moment';
import Constantes from 'Constantes';

class DataGridComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: `grid-id-${parseInt(Math.random() * 1000000, 10)}`,
            frameworkComponents: {
                customHeaderGroupComponent: HeaderGroupComponent,
                DetailButtonGridRenderer: DetailButtonGridRenderer,
                DetailButtonGridEdit: DetailButtonGridEdit,
                DetailAlergenButtonGridRenderer: DetailAlergenButtonGridRenderer,
                CustomCheckboxRenderer: CustomCheckboxRenderer,
                GenerateExpButtonGridRenderer: GenerateExpButtonGridRenderer,
                ValidateIfraButtonGridRenderer: ValidateIfraButtonGridRenderer,
                CommentsButtonGridRenderer: CommentsButtonGridRenderer,
                RemoveIconGridRenderer: RemoveIconGridRenderer,
                ShareButtonGridRenderer: ShareButtonGridRenderer,
                RemoveButtonGridRenderer: RemoveButtonGridRenderer,
                AddMaterialButtonRenderer: AddMaterialButtonRenderer,
                MaterialBannedComponent: MaterialBannedComponent
            },
            selectedRowsPerPage: [],
            selectedRows: []
        };

        this.defaultGridProps = {
            overlayLoadingTemplate: `<span class="ag-overlay-loading-center custom-overlay-grid rounded">
      <i class="fas fa-spinner fa-spin"/></i>
      ${props.intl.formatMessage({id: 'component.dataGrid.loading'})}
          </span>`,
            overlayNoRowsTemplate: `<span class="custom-overlay-grid p-3 rounded">${props.intl.formatMessage(
                {id: 'component.dataGrid.noRows'}
            )}</span>`,
            columnDefs: [],
            rowData: [],
            suppressRowClickSelection: true,
            rowSelection: 'single',
            animateRows: true,
            enableColResize: false,
            enableSorting: true,
            suppressMovable: true,
            enableFilter: true,
            groupHeaders: true,
            suppressMovableColumns: true,
            stopEditingWhenGridLosesFocus: true,
            columnTypes: {
                nonEditableColumn: {editable: false},
                numeric: {
                    headerClass: 'ag-numeric-header',
                    cellClass: 'ag-numeric-cell',
                    comparator: this.numericComparator
                },
                date: {
                    filter: 'agDateColumnFilter',
                    defaultFormat: Constantes.DATETIME_FORMAT,
                    comparator: this.dateComparator,
                    filterParams: {comparator: this.dateComparator}
                }
            }
        };
    }

  onGridReady = params => {
      const {onGridLoad} = this.props;
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      this.displayOverlay();

      if (onGridLoad && typeof onGridLoad === 'function') {
          onGridLoad(params);
      }
  };

  componentDidMount() {}

  componentDidUpdate() {
      const {
          columnDefs,
          forceLoadColumns,
          pagination,
          quickFilter
      } = this.props;

      if (this.gridApi) {
          this.displayOverlay();

          if (quickFilter !== null && quickFilter !== '') {
              this.gridApi.setQuickFilter(quickFilter);
          }

          if (forceLoadColumns) {
              this.gridApi.setColumnDefs(columnDefs);
          } else {
              this.gridApi.redrawRows();
          }

          if (pagination && pagination.PageIndex && pagination.PageIndex > 0) {
              const selectedRowsPerPage = this.state.selectedRowsPerPage;
              const {PageIndex} = pagination;

              // SET SELECTED NODES
              this.gridApi.forEachNodeAfterFilter(node => {
                  const selectedRowsCurrentPage =
            selectedRowsPerPage[`page_${PageIndex}`];
                  if (selectedRowsCurrentPage && selectedRowsCurrentPage.length > 0) {
                      const nodeString = JSON.stringify(node.data);
                      selectedRowsCurrentPage.some(item => {
                          if (nodeString === JSON.stringify(item)) {
                              node.setSelected(true);
                              return true;
                          }
                          return false;
                      });
                  }
              });
          }
      }
  }

  changePage = type => {
      const onPaginationChange =
      this.props.onPaginationChange &&
      typeof this.props.onPaginationChange === 'function'
          ? this.props.onPaginationChange
          : null;
      const pagination = this.props.pagination ? this.props.pagination : null;

      if (onPaginationChange !== null) {
          if (!pagination) {
              console.error('Objeto paginación null');
          } else {
              if (type === 'first-page') {
                  pagination.PageIndex = 1;
              } else if (type === 'next-page') {
                  const nextPage = pagination.PageIndex + 1;

                  if (pagination.TotalPages >= nextPage) {
                      pagination.PageIndex = nextPage;
                  }
              } else if (type === 'prev-page') {
                  const prevPage = pagination.PageIndex - 1;

                  if (prevPage >= 1) {
                      pagination.PageIndex = prevPage;
                  }
              } else if (type === 'last-page') {
                  pagination.PageIndex = pagination.TotalPages || 1;
              }

              onPaginationChange(pagination);
          }
      }
  };

  onSelectionChanged(onRowSelection, gridApi) {
      const selectedRows = this.gridApi.getSelectedRows();

      if (onRowSelection && typeof onRowSelection === 'function') {
          const resultRows = [];
          const selectedRowsPerPage = this.state.selectedRowsPerPage;

          const {PageIndex} = this.props.pagination;

          selectedRowsPerPage[`page_${PageIndex}`] = selectedRows;

          for (const key in selectedRowsPerPage) {
              if (
                  key !== null &&
          selectedRowsPerPage[key] &&
          selectedRowsPerPage[key].length > 0
              ) {
                  resultRows.push(...selectedRowsPerPage[key]);
              }
          }

          this.setState({
              selectedRowsPerPage,
              selectedRows
          });

          onRowSelection(resultRows, gridApi);
      }
  }

  displayOverlay = () => {
      const {rowData} = this.props;

      if (this.gridApi) {
          if ((!rowData || rowData.length === 0) && !this.props.isLoading) {
              this.gridApi.showNoRowsOverlay();
          } else {
              this.gridApi.hideOverlay();
          }
      }
  };

  // COMPARATORS

  numericComparator = (num1, num2) => {
      if (num1 === null && num2 === null) {
          return 0;
      }
      if (num1 === null) {
          return -1;
      }
      if (num2 === null) {
          return 1;
      }

      const num1Parsed = isNaN(num1)
          ? Util.removeNumberFormat(num1)
          : parseFloat(num1, 10);
      const num2Parsed = isNaN(num2)
          ? Util.removeNumberFormat(num2)
          : parseFloat(num2, 10);

      return num1Parsed - num2Parsed;
  };

  dateComparator = (date1, date2) => {
      const dateObj1 = moment(
          date1,
          this.defaultGridProps.columnTypes.date.defaultFormat
      );
      const dateObj2 = moment(
          date2,
          this.defaultGridProps.columnTypes.date.defaultFormat
      );
      if (
          (dateObj1 === null || !dateObj1.isValid()) &&
      (dateObj2 === null || !dateObj2.isValid())
      ) {
          return 0;
      }
      if (dateObj1 === null || !dateObj1.isValid()) {
          return -1;
      }
      if (dateObj2 === null || !dateObj2.isValid()) {
          return 1;
      }
      return dateObj2.diff(dateObj1);
  };

  render = () => {
      const {pagination, rowData} = this.props;

      let firstRowOnPage = 0;
      let lastRowOnPage = 0;
      let pageIndex = 0;
      let totalRows = 0;
      let totalPages = 0;

      if (pagination !== null && pagination && rowData !== null && rowData) {
          if (pagination.PageIndex === 1) {
              firstRowOnPage = 1;
          } else if (pagination.PageIndex > 1) {
              firstRowOnPage =
          parseInt(pagination.PageIndex - 1, 10) *
            parseInt(pagination.RowsPerPage, 10) +
          1;
          }

          pageIndex = pagination.PageIndex;
          totalRows = pagination.TotalRows;
          totalPages = pagination.TotalPages;

          if (rowData.length === pagination.RowsPerPage) {
              lastRowOnPage = pagination.RowsPerPage * pagination.PageIndex;
          } else {
              lastRowOnPage = totalRows;
          }
      }

      const gridOptions = {
          ...this.defaultGridProps,
          ...this.props.gridOptions,
          ...this.props
      };

      const onRowSelection =
      this.props.onRowSelection &&
      typeof this.props.onRowSelection === 'function'
          ? this.props.onRowSelection
          : null;

      return (
          <Container fluid={true}>
              <LoadingComponent loading={this.props.isLoading} noBackground={this.props.loadingNoBackground} />
              <div className={this.props.classContainer}>
                  <div id={this.state.id} className={'ag-theme-balham h-100'}>
                      <AgGridReact
                          onGridReady={this.onGridReady}
                          suppressScrollOnNewData={true}
                          suppressPaginationPanel={
                              pagination && typeof pagination === 'object'
                          }
                          paginationPageSize={
                              pagination && typeof pagination === 'boolean'
                                  ? Constantes.DEFAULT_PAGE_SIZE
                                  : null
                          }
                          rowDragManaged={true}
                          onSelectionChanged={this.onSelectionChanged.bind(
                              this,
                              onRowSelection
                          )}
                          {...gridOptions}
                          frameworkComponents={this.state.frameworkComponents}
                      />
                  </div>
              </div>
              <div>
                  {pagination && typeof pagination === 'object' ? (
                      <div className="ag-theme-bootstrap">
                          <div className="ag-paging-panel ag-font-style">
                              <div className="ag-paging-panel ag-font-style">
                                  <span className="ag-paging-row-summary-panel">
                                      <span>[{firstRowOnPage}]</span> a{' '}
                                      <span>[{lastRowOnPage}]</span> de <span>{totalRows}</span>
                                  </span>
                                  <span className="ag-paging-page-summary-panel">
                                      <Fa
                                          icon="fast-backward"
                                          className={classNames({
                                              'p-1 ml-1 rounded border ': true,
                                              'cursor-pointer border-dark':
                          totalRows > 0 &&
                          pageIndex > 1 &&
                          !this.props.isLoading
                                          })}
                                          onClick={
                                              totalRows > 0 && pageIndex > 1 && !this.props.isLoading
                                                  ? this.changePage.bind(this, 'first-page')
                                                  : null
                                          }
                                      />
                                      <Fa
                                          icon="step-backward"
                                          className={classNames({
                                              'p-1 ml-1 rounded border ': true,
                                              'cursor-pointer border-dark':
                          totalRows > 0 &&
                          pageIndex > 1 &&
                          !this.props.isLoading
                                          })}
                                          onClick={
                                              totalRows > 0 && !this.props.isLoading
                                                  ? this.changePage.bind(this, 'prev-page')
                                                  : null
                                          }
                                      />{' '}
                                      <FormattedMessage id="component.dataGrid.page.from" />
                                      <span> {pageIndex} </span>
                                      <FormattedMessage id="component.dataGrid.page.to" />
                                      <span> {totalPages} </span>
                                      <Fa
                                          icon="step-forward"
                                          className={classNames({
                                              'p-1 ml-1 rounded border ': true,
                                              'cursor-pointer border-dark':
                          totalRows > 0 &&
                          pageIndex < totalPages &&
                          !this.props.isLoading
                                          })}
                                          onClick={
                                              totalRows > 0 &&
                        pageIndex < totalPages &&
                        !this.props.isLoading
                                                  ? this.changePage.bind(this, 'next-page')
                                                  : null
                                          }
                                      />
                                      <Fa
                                          icon="fast-forward"
                                          className={classNames({
                                              'p-1 ml-1 rounded border ': true,
                                              'cursor-pointer border-dark':
                          totalRows > 0 &&
                          pageIndex < totalPages &&
                          !this.props.isLoading
                                          })}
                                          onClick={
                                              totalRows > 0 &&
                        pageIndex < totalPages &&
                        !this.props.isLoading
                                                  ? this.changePage.bind(this, 'last-page')
                                                  : null
                                          }
                                      />
                                  </span>
                              </div>
                          </div>
                      </div>
                  ) : null}
              </div>
          </Container>
      );
  };
}

export default injectIntl(DataGridComponent);

DataGridComponent.propTypes = {
    children: PropTypes.any,
    isCollapsable: PropTypes.bool,
    title: PropTypes.any,
    classContainer: PropTypes.string,
    className: PropTypes.string,
    intl: PropTypes.any,
    gridOptions: PropTypes.any,
    rowData: PropTypes.array,
    isLoading: PropTypes.bool,
    loadingNoBackground: PropTypes.bool,
    forceLoadColumns: PropTypes.bool,
    onGridLoad: PropTypes.func,
    onRowSelection: PropTypes.func,
    columnDefs: PropTypes.array,
    pagination: PropTypes.any,
    onPaginationChange: PropTypes.func,
    quickFilter: PropTypes.string
};
