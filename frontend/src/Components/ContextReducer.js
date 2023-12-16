import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    qty: action.qty,
                    size: action.size,
                    price: action.price
                }
            ];
        case "REMOVE":
            return state.filter((food, index) => index !== action.index);
        case "DROP":
            let empArray = []
            return empArray;
        case "UPDATE":
            return state.map((food) => {
                if (food.id === action.id) {
                    // Update the quantity and price of the matching item
                    return {
                        ...food,
                        qty: parseInt(action.qty) + food.qty,
                        price: action.price + food.price,
                    };
                }
                return food; // Keep other items unchanged
            });

        default:
            console.log("Error in Reducer");
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);