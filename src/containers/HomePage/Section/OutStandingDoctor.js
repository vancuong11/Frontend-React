import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import * as action from '../../../store/actions';
import { LANGUAGES } from '../../../utils';

class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        };
    }

    componentDidMount() {
        this.props.loadTopDoctor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux,
            });
        }
    }

    handleDetailDoctor = (doctor) => {
        // redirect
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    };

    render() {
        let { settings, language } = this.props;
        let { arrDoctors } = this.state;
        return (
            <>
                <div className="section-share section-outstanding-doctor">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">
                                <FormattedMessage id="home-page.outstanding-doctor" />
                            </span>
                            <button className="btn-section">
                                <FormattedMessage id="home-page.more-info" />
                            </button>
                        </div>
                        <div className="section-body">
                            <Slider {...settings}>
                                {arrDoctors &&
                                    arrDoctors.length > 0 &&
                                    arrDoctors.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                        }
                                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                                        let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName} `;
                                        return (
                                            <div
                                                className="section-customize"
                                                key={index}
                                                onClick={() => this.handleDetailDoctor(item)}
                                            >
                                                <div className="custom-border">
                                                    <div className="outer-bg">
                                                        <div
                                                            className="bg-image section-outstanding-doctor"
                                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                                        ></div>
                                                    </div>
                                                    <div className="position text-center">
                                                        <div>{language === LANGUAGES.VI ? nameVi : nameEn} </div>
                                                        <div>Cơ xương khớp 1</div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

// redux
const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadTopDoctor: () => dispatch(action.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
