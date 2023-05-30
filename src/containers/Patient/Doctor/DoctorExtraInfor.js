import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LANGUAGES } from '../../../utils';
import './DoctorExtraInfor.scss';
import { getScheduleDoctorService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status,
        });
    };

    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <>
                <div className="doctor-extra-infor-container">
                    <div className="content-up">
                        <div className="text-address">ĐỊA CHỈ PHÒNG KHÁM</div>
                        <div className="name-clinic">Phòng khám Chuyên khoa da liễu</div>
                        <div className="detail-address">Hà Nội</div>
                    </div>
                    <div className="content-down">
                        {isShowDetailInfor === false && (
                            <div className="short-infor">
                                GIÁ KHÁM: 250.000đ.
                                <span onClick={() => this.showHideDetailInfor(true)}> Xem chi tiết</span>
                            </div>
                        )}
                        {isShowDetailInfor === true && (
                            <>
                                <div className="title-price">GIÁ KHÁM</div>
                                <div className="detail-infor">
                                    <div className="price">
                                        <span className="left">Giá khám</span>
                                        <span className="right">250000đ</span>
                                    </div>
                                    <div className="note">
                                        Đươc ưu tiên khám trước khi đặt quá BookingCare. Giá khám cho người nước ngoài
                                        30 USD sản phẩm BookingCare
                                    </div>
                                </div>
                                <div className="payment">
                                    Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻ
                                </div>
                                <div className="hide-price">
                                    <span onClick={() => this.showHideDetailInfor(false)}>Ẩn bảng giá</span>
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
