import { ThemeProvider } from "@emotion/react";
import { Container, createTheme, CssBaseline } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Route } from "react-router";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import 'react-toastify/dist/ReactToastify.css';
import BasketPage from "../../features/basket/BasketPage";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import {fetchBasketAsync} from "../../features/basket/basketSlice";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import PrivateRoute from "./PrivateRoute";
import Order from "../../features/orders/Order";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";


function App () {
  const dispatch = useAppDispatch();
  const[loading, setLoading] = useState(true);


  
  const initApp = useCallback(async () => {
    try {
        await dispatch(fetchCurrentUser());
        await dispatch(fetchBasketAsync());
    }catch(error :  any){
      console.log(error);
    }
  },[dispatch])

// useEffect(() => {
//   const buyerId = getcookie('buyerId');
//   dispatch(fetchCurrentUser());
//   if(buyerId) {
//     agent.Basket.get()
//     .then(basket => dispatch(setBasket(basket)))
//     .catch(error => console.log(error))
//     .finally( () => setLoading(false));
//   }else {
//     setLoading(false);
//   }
// }, [dispatch])

useEffect(() => {
  initApp().then( () => setLoading(false)); 
}, [initApp])

  const [darkMode,setDarkMode] = useState(false);
  const paletteType = darkMode? 'dark' : 'light'; 
  const theme = createTheme({
    palette:{
      mode: paletteType,
      background:{
        default: paletteType === 'light'? '#aeeaea' :'#121212'
      }
    }
  })

function handleThemeChange(){
  setDarkMode(!darkMode);
}

if(loading) return <LoadingComponent message='Initialising app...'/>

  return (
    <ThemeProvider theme={theme} >
       <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
       <CssBaseline/>
       <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
       <Container>
        <Route exact path='/'            component={HomePage}  /> 
        <Route exact path='/catalog'     component={Catalog}  />
        <Route exact path='/catalog/:id' component={ProductDetails}  />
        <Route exact path='/about'       component={AboutPage}  />
        <Route exact path='/contact'     component={ContactPage}  />
        <Route exact path='/basket'      component={BasketPage} />
        <PrivateRoute path='/checkout'   component={CheckoutWrapper} /> 
        <PrivateRoute path='/orders'     component={Order} />
        <Route path='/login'             component={Login} /> 
        <Route path='/register'          component={Register} /> 

       </Container>    
    </ThemeProvider>
  );
}

export default App;
