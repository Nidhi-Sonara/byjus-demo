import React, { Component } from 'react';
import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, UncontrolledAlert } from 'reactstrap';

class Listing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            removeUserModal: false,
            userInfo: [
            ],
            userData: "",
            user_id: "",
            showToast: false,
            toastTeaxt: ""
        }
    }
    handleAdd = () => {
        if (this.state.userData) {
            let user = this.state.userData
            if (user?.name && user?.email && user?.address && user?.joining_date) {
                this.state.userInfo.push({
                    id: this.state.userInfo.length + 1,
                    name: user.name,
                    email: user.email,
                    address: user.address,
                    joining_date: user.joining_date,
                });
                this.removeUserData()
            } else {
                this.setState({
                    showToast: true, toastTeaxt: "Please enter complete user detail.", modal: false
                });

            }
        } else {
            this.setState({
                showToast: true, toastTeaxt: "Please enter user details.", modal: false
            });
        }
    }
    handleCancel = (id) => {
        if (id === "add") {
            this.removeUserData()
        } else {
            this.setState({
                removeUserModal: false, user_id: ""
            });
        }
    }
    handleChange = (e) => {
        let inputData = {};
        inputData[e.target.name] = e.target.value;
        this.setState({ userData: Object.assign({}, this.state.userData, inputData) });
    }
    handleModal = (id) => {
        if (id === "add") {
            this.setState({
                modal: true, showToast: false
            });
        } else {
            if (this.state.userInfo.length === 0) {
                this.setState({
                    showToast: true, toastTeaxt: "No user found."
                });
            } else {
                this.setState({
                    removeUserModal: true, showToast: false
                });
            }
        }
    }
    handleUserID = (e) => {
        this.setState({ user_id: e.target.value })
    }
    handleRemove = () => {
        let isFound = false;
        if (this.state.user_id) {
            this.state.userInfo.forEach((data, index) => {
                if (parseInt(data.id) === parseInt(this.state.user_id)) {
                    isFound = true
                    this.state.userInfo.splice(index, 1)
                }
            })
        } else {
            this.setState({
                showToast: true, toastTeaxt: "Please enter user id."
            });
        }
        if (!isFound) {
            this.setState({
                showToast: true, toastTeaxt: "User id not found."
            });
        }
        this.handleCancel("remove")
    }
    toggle = () => {
        this.setState({ showToast: !this.state.showToast }, () => {
            if (this.state.toastTeaxt) {
                this.setState({ toastTeaxt: "" })
            }
        })
    }

    removeUserData = () => {
        this.setState((state) => {
            state.userData = ""
            state.modal = false;
            return state;
        })
    }

    render() {
        const { userInfo, userData, user_id, showToast, toastTeaxt } = this.state
        return (

            <div className='m-5'>
                <Button className='my-2'
                    color="primary"
                    onClick={() => this.handleModal("add")}
                >
                    Add User
                </Button>
                <Button className='float-end my-2'
                    color="primary"
                    onClick={() => this.handleModal("remove")}
                >
                    Remove User
                </Button>
                {showToast &&
                    <UncontrolledAlert color="info" toggle={() => this.toggle()}>
                        {toastTeaxt}
                    </UncontrolledAlert>
                }
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th >User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Joining Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userInfo.length > 0 ?
                            userInfo.map((data, key) => (
                                <tr key={key}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.email}</td>
                                    <td>{data.address}</td>
                                    <td>{data.joining_date}</td>
                                </tr>
                            )) :
                            <tr>
                                <td colSpan="5">
                                    <div className='text-center my-5 fw-bold'>No user available.</div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </Table>

                <Modal isOpen={this.state.modal} className={this.props.className}>
                    <ModalHeader >Add User</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleName">
                                    Name
                                </Label>
                                <Input
                                    id="exampleName"
                                    name="name"
                                    placeholder="Enter Name"
                                    type="text"
                                    value={userData.name}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">
                                    Email
                                </Label>
                                <Input
                                    id="exampleEmail"
                                    name="email"
                                    placeholder="Enter Email"
                                    type="email"
                                    value={userData.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleAddress">
                                    Address
                                </Label>
                                <Input
                                    id="exampleAddress"
                                    name="address"
                                    placeholder="Enter address"
                                    type="text"
                                    value={userData.address}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleJoiningDate">
                                    Joining Date
                                </Label>
                                <Input
                                    id="exampleJoiningDate"
                                    name="joining_date"
                                    placeholder="Enter joining date"
                                    type="date"
                                    value={userData.joining_date}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleAdd()}>Add</Button>{' '}
                        <Button color="secondary" onClick={() => this.handleCancel("add")}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.removeUserModal} className={this.props.className}>
                    <ModalHeader >Remove User</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="exampleUserID">
                                    User ID
                                </Label>
                                <Input
                                    id="exampleUserID"
                                    name="user_id"
                                    placeholder="Enter User ID"
                                    type="number"
                                    value={user_id}
                                    onChange={this.handleUserID}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleRemove()}>Remove</Button>{' '}
                        <Button color="secondary" onClick={() => this.handleCancel("remove")}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default Listing