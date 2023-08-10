import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { date } from 'yup';

const HANDLERS = {
  SYNC: 'SYNC',
  SELECT_CATEGORY: 'SELECT_CATEGORY',
}

const initialState = {
  selectedCategory: '',
  totalValue: 1000,
  totalInvestment: 100,
  currentPositionCategories: [
    {
      quantity: 70,
      price: 10,
      percentage: 70,
      date: Date.now(),
      itemName: 'stock',
    },
    {
      quantity: 30,
      price: 10,
      percentage: 30,
      date: Date.now(),
      itemName: "fii"
    }
  ],
  currentPositions: [
    {
      quantity: 40,
      price: 10,
      percentage: 40,
      date: Date.now(),
      itemName: 'TAEE11',
      category: 'stock',
      profitability: 0,
    },
    {
      quantity: 30,
      price: 10,
      percentage: 30,
      date: Date.now(),
      itemName: 'BBSE11',
      category: 'stock',
      profitability: 12.8,
    },
    {
      quantity: 20,
      price: 10,
      percentage: 20,
      date: Date.now(),
      itemName: 'MXRF11',
      category: 'fii',
      profitability: 2.8,
    },
    {
      quantity: 10,
      price: 10,
      percentage: 20,
      date: Date.now(),
      itemName: 'XPML11',
      category: 'fii',
      profitability: -3.8,
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
  [HANDLERS.SELECT_CATEGORY]: (state, action) => {
    return {
      ...state,
      selectedCategory: action.payload,
    }
  }
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
      dispatch({
        type: HANDLERS.SYNC,
        payload: {
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
        }
      });
    }

    const selectCategory = (category) => {
      dispatch({ 
        type: HANDLERS.SELECT_CATEGORY,
        payload: category,
      });
    }

    return (
        <WalletContext.Provider
          value={{
            ...state,
            syncPositions,
            selectCategory,
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