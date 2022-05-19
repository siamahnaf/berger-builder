import * as actionTypes from './ActionTypes';

const Ingridient_price = {
    salad: 20,
    cheese: 40,
    meat: 90
}
const Initial_State = {
    ingredients: [
        { type: 'salad', ammount: 0 },
        { type: 'cheese', ammount: 0 },
        { type: 'meat', ammount: 0 }
    ],
    orders: [],
    orderLoading: true,
    orderErr: false,
    totalPrice: 80,
    purchaseAble: false,
    token: null,
    userId: null,
    authLoading: false,
    authFailedMsg: ""
}

export const reducer = (state = Initial_State, action) => {
    const ingredients = [...state.ingredients];
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) item.ammount++;
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice + Ingridient_price[action.payload]
            }
        case actionTypes.REMOVE_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payload) {
                    if (item.ammount <= 0) return state;
                    item.ammount--;
                }
            }
            return {
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice - Ingridient_price[action.payload]
            }
        case actionTypes.UPDATE_PURCHASEABLE:
            const sum = state.ingredients.reduce((sum, element) => {
                return sum + element.ammount;
            }, 0)
            return {
                ...state,
                purchaseAble: sum > 0,
            }
        case actionTypes.RESET_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    { type: 'salad', ammount: 0 },
                    { type: 'cheese', ammount: 0 },
                    { type: 'meat', ammount: 0 }
                ],
                totalPrice: 80,
                purchaseAble: false
            }
        case actionTypes.LOAD_ORDERS:
            let orders = [];
            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key
                })
            }
            return {
                ...state,
                orders: orders,
                orderLoading: false
            }
        case actionTypes.ORDER_LOAD_FAILED:
            return {
                ...state,
                orderErr: true,
                orderLoading: false
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                authFailedMsg: null
            }
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload,
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                authFailedMsg: action.payload
            }
        default:
            return state;
    }
}