import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';
import { getDetailInfoDoctorService } from '../../../services/userService';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // save to markdown
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',
            arrDoctors: [],
            hasOldData: false,

            // save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        };
    }

    componentDidMount() {
        this.props.fetchAllDoctorRedux();
        this.props.getRequireDoctorInfo();
    }

    buildDataInputSelect = (data, type) => {
        let result = [];
        let { language } = this.props;
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                let labelVi = type === 'USERS' ? `${item.lastName} ${item.firstName}` : item.valueVi;
                let labelEn = type === 'USERS' ? `${item.firstName} ${item.lastName}` : item.valueEn;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }

        return result;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
            this.setState({
                arrDoctors: dataSelect,
            });
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                arrDoctors: dataSelect,
            });
        }

        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, '');
            let dataSelectPayment = this.buildDataInputSelect(resPayment, '');
            let dataSelectProvince = this.buildDataInputSelect(resProvince, '');
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            });
        }
    }

    // Finish!
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };

    handleSaveContentMarkdown = () => {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        });
    };

    handleChangeSelect = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailInfoDoctorService(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
            });
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
            });
        }
    };

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value,
        });
    };

    render() {
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    <FormattedMessage id="admin.manage-doctor.title" />
                </div>
                <div className="more-info">
                    <div className="content-left">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.select-doctor" />
                        </label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.arrDoctors}
                            placeholder="Chọn bác sĩ..."
                        />
                    </div>
                    <div className="content-right">
                        <label>
                            <FormattedMessage id="admin.manage-doctor.introduction" />
                        </label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        ></textarea>
                    </div>
                </div>
                <div className="more-info-extra">
                    <div className="row">
                        <div className="col-4 form-group">
                            <label>Chọn giá</label>
                            <Select
                                // value={this.state.listPrice}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listPrice}
                                placeholder="Chọn giá..."
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Chọn phương thức thanh toán</label>
                            <Select
                                // value={this.state.listPayment}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listPayment}
                                placeholder="Chọn phương thức thanh toán..."
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Chọn tỉnh thành</label>
                            <Select
                                // value={this.state.listProvince}
                                // onChange={this.handleChangeSelect}
                                options={this.state.listProvince}
                                placeholder="Chọn tỉnh thành..."
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Tên phòng khám</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-4 form-group">
                            <label>Địa chỉ phòng khám</label>
                            <input className="form-control" />
                        </div>
                        <div className="col-4 form-group">
                            <label>Ghi chú</label>
                            <input className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <MdEditor
                        style={{ height: '420px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? 'save-content-doctor' : 'create-content-doctor'}
                >
                    {hasOldData === true ? (
                        <span>
                            <FormattedMessage id="admin.manage-doctor.save" />
                        </span>
                    ) : (
                        <span>
                            <FormattedMessage id="admin.manage-doctor.add" />
                        </span>
                    )}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctorRedux: () => dispatch(actions.fetchGetAllDoctor()),
        getRequireDoctorInfo: () => dispatch(actions.getRequireDoctorInfo()),

        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
