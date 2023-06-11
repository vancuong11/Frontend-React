import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import { CommonUtils, LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageClinic.scss';
import { postCreateNewClinic } from '../../../services/userService';
import { toast } from 'react-toastify';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            address: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    handleOnchangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleSubmitClinic = async () => {
        let res = await postCreateNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success('Create Clinic Succeed!');
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                address: '',
            });
        } else {
            toast.error('Create Clinic Error!');
        }
    };

    render() {
        return (
            <>
                <div className="manage-specialty-container">
                    <div className="ms-title">Quản lý Phòng khám</div>

                    <div className="add-new-specialty row">
                        <div className="col-6 form-group">
                            <label>Tên phòng khám</label>
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.name}
                                onChange={(event) => this.handleOnchangeInput(event, 'name')}
                            />
                        </div>

                        <div className="col-6 form-group">
                            <label>Chọn ảnh phòng khám</label>
                            <input
                                className="form-control-file"
                                type="file"
                                onChange={(event) => this.handleOnChangeImage(event)}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label>Địa chỉ phòng khám</label>
                            <input
                                className="form-control"
                                type="text"
                                value={this.state.address}
                                onChange={(event) => this.handleOnchangeInput(event, 'address')}
                            />
                        </div>
                        <div className="col-12 form-group">
                            <MdEditor
                                style={{ height: '420px' }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                        <div className="col-12">
                            <button className="btn-save-specialty" onClick={() => this.handleSubmitClinic()}>
                                Save
                            </button>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
