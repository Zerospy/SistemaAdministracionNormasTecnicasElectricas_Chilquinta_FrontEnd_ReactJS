import React from 'react';
import {Container, Input, Button, Col, Row} from 'mdbreact';
import DataGridComponent from 'components/commons/DataGrid/DataGridComponent';
import TrialService from 'services/TrialService';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

class CommentsTrialComponent extends React.Component {
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
                    onClick: this.onClickDeleteObs,
                    width: 85,
                    suppressFilter: true
                }
            ],
            rowData: [],
            comment: '',
            maxLength: 140,
            getTrialID: this.props.getTrialID,
            isLoading: false
        };
        this.getCommentsActiveTrial = this.props.getCommentsActiveTrial;

        this.trialService = new TrialService();
    }

    onClickDeleteObs = (node) => {
        const rowData = this.state.rowData;
       // const {data} = node;
        let result = [];

        result = rowData.filter((item, index)=> index !== node.rowIndex);

        this.setState({
            rowData: result
        },
        () => {
            if (typeof this.props.onChange === 'function') {
                this.props.onChange(this.state.rowData);
            }
        }
        );
        
    }

    componentDidMount() {
        if (typeof this.getCommentsActiveTrial !== 'function') {
            return;
        }

        const commentsTrial = this.getCommentsActiveTrial();

        if (commentsTrial !== null) {
            const comments = [];

            commentsTrial.forEach(item => {
                comments.push({
                    id: item.id,
                    comment: item.comment
                });
            });

            this.setState({
                rowData: [...this.state.rowData, ...comments]
            });
        }
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

                                this.setState(
                                    {
                                        comment: '',
                                        rowData: [
                                            ...this.state.rowData,
                                            {
                                                comment: newComment
                                            }
                                        ]
                                    },
                                    () => {
                                        if (typeof this.props.onChange === 'function') {
                                            this.props.onChange(this.state.rowData);
                                        }
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

export default injectIntl(CommentsTrialComponent);

CommentsTrialComponent.propTypes = {
    trialID: PropTypes.any,
    comments: PropTypes.any,
    onChange: PropTypes.func,
    getTrialID: PropTypes.func,
    getCommentsActiveTrial: PropTypes.func,
    intl: PropTypes.any
};
