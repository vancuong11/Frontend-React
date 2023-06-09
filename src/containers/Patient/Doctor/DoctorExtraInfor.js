import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LANGUAGES } from '../../../utils';
import './DoctorExtraInfor.scss';
import { getExtraInfoDoctorByIdService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            exrtraInfor: {},
        };
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInfoDoctorByIdService(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    exrtraInfor: res.data,
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInfoDoctorByIdService(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    exrtraInfor: res.data,
                });
            }
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status,
        });
    };

    render() {
        let { isShowDetailInfor, exrtraInfor } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="doctor-extra-infor-container">
                    <div className="content-up">
                        <div className="text-address">
                            <FormattedMessage id="patient.extra-infor-doctor.text-address" />
                        </div>
                        <div className="name-clinic">
                            {exrtraInfor && exrtraInfor.nameClinic ? exrtraInfor.nameClinic : ''}
                        </div>
                        <div className="detail-address">
                            {exrtraInfor && exrtraInfor.addressClinic ? exrtraInfor.addressClinic : ''}
                        </div>
                    </div>
                    <div className="content-down">
                        {isShowDetailInfor === false && (
                            <div className="short-infor">
                                <FormattedMessage id="patient.extra-infor-doctor.price" />
                                {exrtraInfor && exrtraInfor.priceTypeData && language === LANGUAGES.VI && (
                                    <NumberFormat
                                        className="currency"
                                        value={exrtraInfor.priceTypeData.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                    />
                                )}
                                {exrtraInfor && exrtraInfor.priceTypeData && language === LANGUAGES.EN && (
                                    <NumberFormat
                                        className="currency"
                                        value={exrtraInfor.priceTypeData.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'$'}
                                    />
                                )}
                                <span className="detail" onClick={() => this.showHideDetailInfor(true)}>
                                    <FormattedMessage id="patient.extra-infor-doctor.detail" />
                                </span>
                            </div>
                        )}
                        {isShowDetailInfor === true && (
                            <>
                                <div className="title-price">
                                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                                </div>
                                <div className="detail-infor">
                                    <div className="price">
                                        <span className="left">
                                            <FormattedMessage id="patient.extra-infor-doctor.price" />
                                        </span>
                                        <span className="right">
                                            {exrtraInfor && exrtraInfor.priceTypeData && language === LANGUAGES.VI && (
                                                <NumberFormat
                                                    className="currency"
                                                    value={exrtraInfor.priceTypeData.valueVi}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                />
                                            )}
                                            {exrtraInfor && exrtraInfor.priceTypeData && language === LANGUAGES.EN && (
                                                <NumberFormat
                                                    className="currency"
                                                    value={exrtraInfor.priceTypeData.valueEn}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'$'}
                                                />
                                            )}
                                        </span>
                                    </div>
                                    <div className="note">
                                        {exrtraInfor && exrtraInfor.note ? exrtraInfor.note : ''}
                                    </div>
                                </div>
                                <div className="payment">
                                    <FormattedMessage id="patient.extra-infor-doctor.payment" />{' '}
                                    {exrtraInfor && exrtraInfor.paymentTypeData && language === LANGUAGES.VI
                                        ? exrtraInfor.paymentTypeData.valueVi
                                        : ''}
                                    {exrtraInfor && exrtraInfor.paymentTypeData && language === LANGUAGES.EN
                                        ? exrtraInfor.paymentTypeData.valueEn
                                        : ''}
                                </div>
                                <div className="hide-price">
                                    <span onClick={() => this.showHideDetailInfor(false)}>
                                        <FormattedMessage id="patient.extra-infor-doctor.hide-price" />
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
