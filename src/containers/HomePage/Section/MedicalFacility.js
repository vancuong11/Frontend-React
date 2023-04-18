import React, { Component } from 'react';
import { connect } from 'react-redux';

import Slider from 'react-slick';

class MedicalFacility extends Component {
    render() {
        let settings = this.props.settings;
        return (
            <>
                <div className="section-share section-medical-facility">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">Cơ sở y tế nổi bật</span>
                            <button className="btn-section">Xem thêm</button>
                        </div>
                        <div className="section-body">
                            <Slider {...settings}>
                                <div className="section-customize">
                                    <div className="bg-image section-medical-facility"></div>
                                    <div>Hệ thống Thu Cúc 1</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-medical-facility"></div>
                                    <div>Hệ thống Thu Cúc 1</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-medical-facility"></div>
                                    <div>Hệ thống Thu Cúc 1</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-medical-facility"></div>
                                    <div>Hệ thống Thu Cúc 1</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-medical-facility"></div>
                                    <div>Hệ thống Thu Cúc 1</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-medical-facility"></div>
                                    <div>Hệ thống Thu Cúc 1</div>
                                </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
