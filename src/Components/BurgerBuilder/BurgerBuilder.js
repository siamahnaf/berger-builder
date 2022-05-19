import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import Summary from './Summary/Summary';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchaseAble } from '../../Redux/ActionCreator';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchaseAble: state.purchaseAble
    }
}
const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (igtype) => dispatch(addIngredient(igtype)),
        removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
        updatePurchaseAble: () => dispatch(updatePurchaseAble())
    }
}
class BurgerBuilder extends Component {
    state = {
        modalOpen: false,
    }
    addIngridientHandle = type => {
        this.props.addIngredient(type);
        this.props.updatePurchaseAble();
    }
    removeInfridientHandle = type => {
        this.props.removeIngredient(type);
        this.props.updatePurchaseAble();
    }
    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }
    handleCheckout = () => {
        this.props.history.push("/checkout");
    }
    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients} />
                    <Controls
                        ingredientsAdded={this.addIngridientHandle}
                        ingredientsRemoved={this.removeInfridientHandle}
                        price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        purchaseAble={this.props.purchaseAble}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summery</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
                        <Summary ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ backgroundColor: "#D70F64" }} onClick={this.handleCheckout}>Continue to checkout</Button>
                        <Button color="danger" onClick={this.toggleModal}>Canecl</Button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);