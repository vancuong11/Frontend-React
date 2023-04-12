import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    toggle = () => {
        this.props.toggleFromParent();
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
                                <input type="text" />
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input type="text" />
                            </div>
                            <div className="input-container">
                                <label>First name</label>
                                <input type="text" />
                            </div>
                            <div className="input-container">
                                <label>Last name</label>
                                <input type="text" />
                            </div>
                            <div className="input-container max-width-input">
                                <label>Address</label>
                                <input type="text" />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="px-3" color="primary" onClick={() => this.toggle()}>
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
