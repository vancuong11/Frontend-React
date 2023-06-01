import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import './BookingModal.scss';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';

class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    render() {
        let { isOpenModal, closeBookingModal, dataTime } = this.props;
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId;
        }
        console.log(dataTime);

        return (
            <>
                <Modal isOpen={isOpenModal} className="booking-modal-container" centered size="lg">
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">Thông tin đặt lịch khám bệnh</span>
                            <span className="right" onClick={closeBookingModal}>
                                <i className="fas fa-times"></i>
                            </span>
                        </div>
                        <div className="booking-modal-body">
                            {/* {JSON.stringify(dataTime)} */}
                            <ProfileDoctor doctorId={doctorId} />
                            <div className="doctor-infor"></div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Họ tên</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Số điện thoại</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ email</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ liên hệ</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Lí do khám</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Đặt cho ai</label>
                                    <input className="form-control" />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Giới tính</label>
                                    <input className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className="btn-booking-confirm">Xác nhận</button>
                            <button className="btn-booking-cancel" onClick={closeBookingModal}>
                                Hủy
                            </button>
                        </div>
                    </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
