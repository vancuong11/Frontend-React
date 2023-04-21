import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
        };
    }

    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         });
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    render() {
        // let genders = this.state.genderArr;
        let { language, genderRedux } = this.props;
        return (
            <>
                <div className="user-redux-container">
                    <div className="title">Manage User Redux </div>
                    <div className="user-redux-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 my-4">
                                    <FormattedMessage id="manage-user.add" />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.email" />
                                    </label>
                                    <input type="email" className="form-control" />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.password" />
                                    </label>
                                    <input type="password" className="form-control" />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.firstName" />
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.lastName" />
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-9">
                                    <label>
                                        <FormattedMessage id="manage-user.address" />
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.phoneNumber" />
                                    </label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.gender" />
                                    </label>
                                    <select className="form-control">
                                        {genderRedux &&
                                            genderRedux.length > 0 &&
                                            genderRedux.map((item, index) => {
                                                return (
                                                    <option key={index}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.position" />
                                    </label>
                                    <select className="form-control">
                                        <option>--- Choose ---</option>
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.role" />
                                    </label>
                                    <select className="form-control">
                                        <option>--- Choose ---</option>
                                        <option>1</option>
                                        <option>2</option>
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label>
                                        <FormattedMessage id="manage-user.image" />
                                    </label>
                                    <input className="form-control" type="text" />
                                </div>
                                <div className="col-12 mt-4">
                                    <button className="btn btn-primary">
                                        <FormattedMessage id="manage-user.save" />
                                    </button>
                                </div>
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
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
