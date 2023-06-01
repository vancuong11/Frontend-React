import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';

import { getProfileDoctorByIdService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import './ProfileDoctor.scss';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }

    getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorByIdService(id);
            result = res.data;
        }
        return result;
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }

        if (this.props.doctorId !== prevProps.doctorId) {
        }
    }

    render() {
        let { language } = this.props;
        let { dataProfile } = this.state;
        let nameVi = '',
            nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName} `;
        }
        return (
            <>
                <div className="profile-doctor-container">
                    <div className="intro-doctor">
                        <div
                            className="content-left"
                            style={{
                                backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`,
                            }}
                        ></div>
                        <div className="content-right">
                            <div className="up">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                            <div className="down">
                                {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                                    <span>{dataProfile.Markdown.description}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="price">
                        Giá khám:{' '}
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI && (
                            <NumberFormat
                                className="currency"
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VND'}
                            />
                        )}
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN && (
                            <NumberFormat
                                className="currency"
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'$'}
                            />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
