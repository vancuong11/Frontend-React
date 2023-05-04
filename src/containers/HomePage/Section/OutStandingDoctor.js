import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

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

    render() {
        let { settings, language } = this.props;
        let { arrDoctors } = this.state;
        arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
        return (
            <>
                <div className="section-share section-outstanding-doctor">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">Bác sĩ nổi bật tuần qua</span>
                            <button className="btn-section">Xem thêm</button>
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
                                        let nameVi = `${item.positionData.valueVi},${item.lastName} ${item.firstName} `;
                                        let nameEn = `${item.positionData.valueEn},${item.lastName} ${item.firstName} `;
                                        return (
                                            <div className="section-customize" key={index}>
                                                <div className="custom-border">
                                                    <div className="outer-bg">
                                                        <div
                                                            className="bg-image section-outstanding-doctor"
                                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                                        ></div>
                                                    </div>
                                                    <div className="position text-center">
                                                        <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
