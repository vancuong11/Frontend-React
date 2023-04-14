import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };
    }

    componentDidMount() {}

    toggle = () => {
        this.props.toggleFromParent();
    };

    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;
        this.setState({
            ...copyState,
        });
    };

    checkValidate = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('missing parameter: ' + arrInput[i]);
                break;
            }
        }

        return isValid;
    };

    handleAddNewUsers = () => {
        let idValid = this.checkValidate();
        if (idValid === true) {
            // call api create modal
            this.props.createNewUser(this.state);
        }
    };

    render() {
        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    size={'lg'}
                    className={'modal-user-container'}
                >
                    <ModalHeader toggle={() => this.toggle()}>Modal title</ModalHeader>
                    <ModalBody>
                        <div className="modal-user-body">
                            <div className="input-container">
                                <label>Email</label>
                                <input
                                    type="text"
                                    onChange={(e) => this.handleOnchangeInput(e, 'email')}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input
                                    type="password"
                                    onChange={(e) => this.handleOnchangeInput(e, 'password')}
                                    value={this.state.password}
                                />
                            </div>
                            <div className="input-container">
                                <label>First name</label>
                                <input
                                    type="text"
                                    onChange={(e) => this.handleOnchangeInput(e, 'firstName')}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className="input-container">
                                <label>Last name</label>
                                <input
                                    type="text"
                                    onChange={(e) => this.handleOnchangeInput(e, 'lastName')}
                                    value={this.state.lastName}
                                />
                            </div>
                            <div className="input-container max-width-input">
                                <label>Address</label>
                                <input
                                    type="text"
                                    onChange={(e) => this.handleOnchangeInput(e, 'address')}
                                    value={this.state.address}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="px-3" color="primary" onClick={() => this.handleAddNewUsers()}>
                            Save changes
                        </Button>{' '}
                        <Button className="px-3" color="secondary" onClick={() => this.toggle()}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                ;
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
