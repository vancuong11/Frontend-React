import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

import './RemedyModal.scss';
import * as actions from '../../../store/actions';

import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: '',
        };
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            });
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        });
    };

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    };

    render() {
        let { isOpenModal, dataModal, closeRemedyModal } = this.props;
        return (
            <>
                <Modal isOpen={isOpenModal} className="remedy-modal-container" centered size="lg">
                    <div className="modal-header">
                        <h5 className="modal-title">Gửi hóa đơn khám bệnh</h5>
                        <button type="button" className="close" aria-label="Close" onClick={closeRemedyModal}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className="row">
                            <div className="col-6 form-group">
                                <div>
                                    <label>Email bệnh nhân</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeEmail(event)}
                                    />
                                </div>
                            </div>
                            <div className="col-6 form-group">
                                <div>
                                    <label>Chọn file đơn thuốc</label>
                                    <input
                                        className="form-control-file"
                                        type="file"
                                        onChange={(event) => this.handleOnChangeImage(event)}
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={() => this.handleSendRemedy()}>
                            Send
                        </Button>
                        <Button color="danger" onClick={closeRemedyModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
