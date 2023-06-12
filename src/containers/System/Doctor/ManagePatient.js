import React, { Component } from 'react';
import { connect } from 'react-redux';

import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        });
    };

    render() {
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        return (
            <div className="manage-patient-container">
                <div className="manage-patient-title">Quản lí bệnh nhận khám bệnh</div>
                <div className="manage-patient-boy row">
                    <div className="col-6 form-group">
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}
                            // minDate={yesterday}
                        />
                    </div>
                    <div className="col-12 ">
                        <table id="customers">
                            <tr>
                                <th>Company</th>
                                <th>Contact</th>
                                <th>Country</th>
                            </tr>
                            <tr>
                                <td>Alfreds Futterkiste</td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td>Berglunds snabbköp</td>
                                <td>Christina Berglund</td>
                                <td>Sweden</td>
                            </tr>
                            <tr>
                                <td>Centro comercial Moctezuma</td>
                                <td>Francisco Chang</td>
                                <td>Mexico</td>
                            </tr>
                            <tr>
                                <td>Ernst Handel</td>
                                <td>Roland Mendel</td>
                                <td>Austria</td>
                            </tr>
                            <tr>
                                <td>Island Trading</td>
                                <td>Helen Bennett</td>
                                <td>UK</td>
                            </tr>
                            <tr>
                                <td>Königlich Essen</td>
                                <td>Philip Cramer</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td>Laughing Bacchus Winecellars</td>
                                <td>Yoshi Tannamuri</td>
                                <td>Canada</td>
                            </tr>
                            <tr>
                                <td>Magazzini Alimentari Riuniti</td>
                                <td>Giovanni Rovelli</td>
                                <td>Italy</td>
                            </tr>
                            <tr>
                                <td>North/South</td>
                                <td>Simon Crowther</td>
                                <td>UK</td>
                            </tr>
                            <tr>
                                <td>Paris spécialités</td>
                                <td>Marie Bertrand</td>
                                <td>France</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
