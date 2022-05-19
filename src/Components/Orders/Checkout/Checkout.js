import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import { resetIngredients } from '../../../Redux/ActionCreator'

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchaseAble: state.purchaseAble,
        userId: state.userId,
        token: state.token
    }
}
const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients())
    }
}

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery"
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: ""
    }
    goBack = () => {
        this.props.history.goBack("/");
    }
    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }
    submitHandler = () => {
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            userId: this.props.userId
        }
        this.setState({
            values: {
                deliveryAddress: "",
                phone: "",
                paymentType: "Cash On Delivery"
            },
            isLoading: true
        });
        let url = process.env.REACT_APP_BACKEND_URL
        axios.post(`${url}/order`, order, {
            headers: {
                "Authorization": `Bearer ${this.props.token}`
            }
        })
            .then(response => {
                if (response.status === 201) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order Placed Successfully"
                    });
                    this.props.resetIngredients();
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Somthing went worng! Order Again"
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Somthing went worng! Order Again"
                })
            })

    }
    render() {
        let form = (<div>
            <h4 style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px"
            }}>Payment: {this.props.totalPrice} BDT</h4>
            <form style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px"
            }}>
                <textarea name="deliveryAddress" value={this.state.values.deliveryAddress} className="form-control" placeholder="Your Delivery Address" onChange={(e) => this.inputChangeHandler(e)}></textarea>
                <br />
                <input name="phone" className="form-control" value={this.state.values.phone} placeholder="Your Phone Number" onChange={(e) => this.inputChangeHandler(e)} />
                <br />
                <select name="paymentType" className="form-control" value={this.state.values.paymentType} onChange={(e) => this.inputChangeHandler(e)}>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                    <option value="Bkash">Bkash</option>
                </select>
                <br />
                <Button style={{ backgroundColor: "#D70F64" }} className="mr-auto" onClick={this.submitHandler} disabled={!this.props.purchaseAble}>Place Order</Button>
                <Button color="secondary" className="ml-1" onClick={this.goBack}>Cancel Order</Button>
            </form>
        </div>)
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalHeader><h4>Order Message</h4></ModalHeader>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                    <ModalFooter>
                        <button color="secondary" onClick={this.goBack}>Close</button>
                    </ModalFooter>
                </Modal>
            </div >
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);