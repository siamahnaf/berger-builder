import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import './Burger.css'

const Burger = props => {
    let ingredientArr = props.ingredients.map(item => {
        let ammountArr = [...Array(item.ammount).keys()];
        return ammountArr.map(_ => {
            return <Ingredient type={item.type} key={Math.random()} />
        })
    })
        .reduce((arr, element) => {
            return arr.concat(element)
        }, [])

    if (ingredientArr.length === 0) {
        ingredientArr = <p>Please Add Some Ingredients</p>
    }
    return (
        <div className="Burger">
            <Ingredient type="bread-top" />
            {ingredientArr}
            <Ingredient type="bread-bottom" />
        </div>
    )
}
export default Burger