import { Suspense, lazy } from 'react';
import {Route, Routes } from 'react-router';
import { Container } from '@material-ui/core';
import Navigation from './Components/Navigation/Navigation';
import Loading from './Components/Loading/Loader';



import routes from './routes';


const HomePage = lazy(() => import('./views/HomePage') 
  // import('./views/HomePage' /* webpackChunkName: "home-page" */),
);
const MortgageCalculator = lazy(() =>
   import('./views/MortgageCalculator')
    // import('./views/MortgageCalculator' /* webpackChunkName: "MortgageCalculator" */),
  );
  


export default function App() {


  return (
   <>
<Container maxWidth="md">
        <Navigation />
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <Routes>
            <Route path={routes.home} element={ <HomePage />} /> 
            <Route path={routes.calculator}  element={<MortgageCalculator />}/> 
          </Routes>
        
        </Suspense>
      </Container>
   </>
  );
}
