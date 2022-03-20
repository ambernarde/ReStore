import { accountSlice } from './../../features/account/accountSlice';
import { catalogSlice } from './../../features/catalog/catalogSlice';
import { useSelector } from 'react-redux';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterSlice";
import { basketSlice } from '../../features/basket/basketSlice';


export const store = configureStore({
    reducer:{
        counter: counterSlice.reducer,
        basket:  basketSlice.reducer,
        catalog: catalogSlice.reducer,
        account : accountSlice.reducer

    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;