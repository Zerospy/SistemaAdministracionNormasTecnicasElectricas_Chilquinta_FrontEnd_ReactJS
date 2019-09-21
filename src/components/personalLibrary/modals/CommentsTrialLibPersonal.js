import React from 'react';
import { Container, Input, Button, Col, Row } from 'mdbreact';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import TrialService from 'services/TrialService';
import FormulaService from 'services/FormulaService';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

class CommentsTrialLibPersonal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columnDefs: [
                {
                    headerName: '#',
                    width: 60,
                    valueGetter: params => params.node.rowIndex + 1
                },
                {
                    headerName: `${props.intl.formatMessage({
                        id: 'modal.trial.comments.datagrid.col'
                    })}`,
                    field: 'comment',
                    autoHeight: true,
                    cellClass: 'cell-wrap-text',
                    width: 537
                },
                {
                    headerName: `${props.intl.formatMessage({
                        id: 'modal.trial.comments.datagrid.delete'
                    })}`,
                    cellRenderer: 'RemoveButtonGridRenderer',
                    onClick: this.onClickDeleteOneObs,
                    width: 85,
                    suppressFilter: true
                }
            ],
            rowData: [],
            comment: '',
            maxLength: 140,
            isLoading: false,
            getTrialID: this.props.getTrialID,
            getObservacionID: this.props.getObservacionlID
        };

        this.trialService = new TrialService();
        this.formulaService = new FormulaService();
    }


    onClickDeleteOneObs = (node) => {

        const obs = node.data;
        const IdTrial = this.state.getTrialID();
        this.setState({
            isLoading: true
        });

        this.formulaService
            .delComment({
                IdTrial: IdTrial,
                Observacion: obs.id
            })
            .then(
                response => {
                    this.setState(
                        {
                            comment: '',
                            isLoading: false
                        },
                        () => {
                            this.searchComments();
                        }
                    );

                    console.log(response);
                },
                errorResponse => {
                    this.setState(
                        {
                            comment: '',
                            isLoading: false
                        },
                        () => { }
                    );
                    console.error(errorResponse);
                }
            );


    }

    searchComments = () => {
        const trialID = this.state.getTrialID();

        if (trialID !== null) {
            this.setState({
                isLoading: true
            });

            this.trialService.getById(trialID).then(
                response => {
                    const data = response.data[0].TrialObs;
                    if (data && data.length > 0) {
                        const comments = [];

                        data.forEach(item => {
                            comments.push({
                                id: item.IdObservacionTrial,
                                comment: item.Observacion,
                            });
                        });

                        this.setState({
                            rowData: comments,
                            isLoading: false
                        });
                    } else {
                        this.setState({
                            isLoading: false
                        });
                    }
                },
                () => {
                    this.setState({
                        isLoading: false
                    });
                }
            );
        }
    };

    componentDidMount() {
        this.searchComments();
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col className="col-10">
                        <Input
                            label={`${this.props.intl.formatMessage({
                                id: 'modal.trial.comments.input.placeHolder'
                            })}`}
                            icon="comment"
                            type="textarea"
                            value={this.state.comment}
                            maxLength={this.state.maxLength}
                            onChange={event => {
                                this.setState({
                                    comment: event.target.value
                                });
                            }}
                        />
                    </Col>
                    <Col className="col-2">
                        <Button
                            disabled={!this.state.comment}
                            className="mt-5"
                            color="primary"
                            size="sm"
                            onClick={() => {
                                const newComment = this.state.comment;
                                const trialID = this.state.getTrialID();

                                this.setState({
                                    isLoading: true
                                });

                                this.trialService
                                    .addComment({
                                        IdTrial: trialID,
                                        Observacion: newComment
                                    })
                                    .then(
                                        response => {
                                            this.setState(
                                                {
                                                    comment: '',
                                                    isLoading: false
                                                },
                                                () => {
                                                    this.searchComments();
                                                }
                                            );

                                            console.log(response);
                                        },
                                        errorResponse => {
                                            this.setState(
                                                {
                                                    comment: '',
                                                    isLoading: false
                                                },
                                                () => { }
                                            );
                                            console.error(errorResponse);
                                        }
                                    );
                            }}
                        >
                            <FormattedMessage id="modal.trial.comments.add" />
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DataGridComponent
                            isLoading={this.state.isLoading}
                            classContainer="grid-container"
                            columnDefs={this.state.columnDefs}
                            rowData={this.state.rowData}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default injectIntl(CommentsTrialLibPersonal);

CommentsTrialLibPersonal.propTypes = {
    trialID: PropTypes.any,
    comments: PropTypes.any,
    onChange: PropTypes.func,
    getTrialID: PropTypes.func,
    getCommentsActiveTrial: PropTypes.func,
    intl: PropTypes.any
};
