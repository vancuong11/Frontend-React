import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class HankBook extends Component {
    render() {
        let settings = this.props.settings;
        return (
            <>
                <div className="section-share section-handbook">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section">Cẩm nang</span>
                            <button className="btn-section">Xem thêm</button>
                        </div>
                        <div className="section-body">
                            <Slider {...settings}>
                                <div className="section-customize">
                                    <div className="bg-image section-handbook"></div>
                                    <div>Cơ xương khớp 1</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-handbook"></div>
                                    <div>Cơ xương khớp 1</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-handbook"></div>
                                    <div>Cơ xương khớp 1</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-handbook"></div>
                                    <div>Cơ xương khớp 1</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-handbook"></div>
                                    <div>Cơ xương khớp 1</div>
                                </div>
                                <div className="section-customize">
                                    <div className="bg-image section-handbook"></div>
                                    <div>Cơ xương khớp 1</div>
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
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HankBook);
