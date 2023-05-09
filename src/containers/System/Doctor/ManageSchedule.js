import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import moment from 'moment';

import DatePicker from '../../../components/Input/DatePicker';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';
import './ManageSchedule.scss';
import * as actions from '../../../store/actions';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.fetchScheduleTimeRedux();
    }

    buildDataInputSelect = (data) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }

        return result;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                arrDoctors: dataSelect,
            });
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            this.setState({
                rangeTime: this.props.allScheduleTime,
            });
        }
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };

    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="manage-schedule-container">
                    <div className="m-s-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="manage-schedule.choose-doctor" />
                                </label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.arrDoctors}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>
                                    <FormattedMessage id="manage-schedule.choose-date" />
                                </label>
                                <DatePicker
                                    onChange={() => this.handleOnChangeDatePicker}
                                    className="form-control"
                                    value={this.state.currentDate}
                                    minDate={new Date()}
                                />
                            </div>
                            <div className="col-12 pick-hour-container">
                                {rangeTime &&
                                    rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button className="btn btn-schedule" key={index}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </button>
                                        );
                                    })}
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary">
                                    <FormattedMessage id="manage-schedule.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchScheduleTimeRedux: () => dispatch(actions.fetchAllScheduleTime()),
        fetchAllDoctorRedux: () => dispatch(actions.fetchGetAllDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
