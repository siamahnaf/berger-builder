import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../Redux/ActionCreator';
import Order from './Order/Order';
import Spinner from '../Spinner/Spinner'

const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
        token: state.token,
        userId: state.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
    }
}

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }
    componentDidUpdate() {
    }
    render() {
        let orders = null;
        if (this.props.orderErr) {
            orders = <p style={{
                color: "red", fontWeight: "bold", fontSize: "15px"
            }
            }> Sorry Failed to Load Data</p >
        } else {
            if (this.props.orders.length === 0) {
                orders = <p style={{
                    color: "red", fontWeight: "bold", fontSize: "15px"
                }
                }>You Have No orders</p >
            } else {
                orders = this.props.orders.map(order => {
                    return <Order order={order} key={order.id} />
                })
            }

        }

        return (
            <div>
                {this.props.orderLoading ? <Spinner /> : orders}
            </div >
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Orders);