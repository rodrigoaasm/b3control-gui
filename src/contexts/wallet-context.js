import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { date } from 'yup';

const HANDLERS = {
  SYNC: 'SYNC'
}

const initialState = {
  totalValue: 1000,
  totalInvestment: 100,
  positionCategories: [
    {
      quantity: 70,
      price: 10,
      percentage: 70,
      date: Date.now(),
      itemName: 'Stock',
    },
    {
      quantity: 30,
      price: 10,
      percentage: 30,
      date: Date.now(),
      itemName: "Fii"
    }
  ]  
}

const handlers = {
  [HANDLERS.SYNC]: (state, action) => {
    
    return {
      ...state,
      ...(action.payload),
    };
  },
}

const reducer = (state, action) => (
    handlers[action.type] ? handlers[action.type](state, action) : state
);

export const WalletContext = createContext({ undefined });

export const WalletProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const initialized = useRef(false);

    const syncPositions = () => {
      dispatch(HANDLERS.SYNC, {
        positionCategories: [{
          _quantity: 20,
          _price: 20,
          _value: 400,
          _date: date.now(),
          _asset: {
            _id: 1,
            _code: 'TAEE11'
          },
        }],
        positionAssets: [
          {
            _quantity: 20,
            _price: 20,
            _value: 400,
            _date: date.now(),
            _asset: {
              _id: 1,
              _category: 'stock'
            },
          }
        ]  
      });
    }

    return (
        <WalletContext.Provider
          value={{
            ...state,
            syncPositions,
          }}
        >
          {children}
        </WalletContext.Provider>
    );
}

WalletProvider.propTypes = {
    children: PropTypes.node
};
  
export const WalletConsumer = WalletContext.Consumer;

export const useWalletContext = () => useContext(WalletContext);