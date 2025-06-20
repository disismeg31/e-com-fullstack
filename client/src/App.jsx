// import {useContext,useEffect} from 'react';
import  ThemeContextProvider  from './context/ThemeContextProvider.jsx';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/customer/Home.jsx';
import Login from './pages/customer/Login.jsx';
import './App.css';
import SearchContextProvider from "./context/SearchContextProvider.jsx";
import Layout from './Layout/Layout.jsx';
import { Provider } from 'react-redux';
import productStore from "./store/index.js";
import CartPage from './pages/customer/CartPage.jsx'
import ProductDeatailsPage from './pages/customer/ProductDeatailsPage.jsx'
import ProfilePage from './pages/customer/ProfilePage.jsx';
import AdminLayout from './Layout/AdminLayout.jsx';
import SellerLayout from './Layout/SellerLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import ApprovedSellers from './pages/admin/ApprovedSellers.jsx';
import ManageProducts from './pages/admin/ManageProducts.jsx';
import SellerRequests from './pages/admin/SellerRequests.jsx';
import SellerDashboard from './pages/seller/SellerDashboard.jsx';
import MyProducts from './pages/seller/MyProducts.jsx';
import SellerProfile from './pages/seller/SellerProfile.jsx'
// import OrderPlaced from './pages/customer/OrderPlaced.jsx';
import ProtectedRoutes from './services/ProtectedRoutes.jsx';
import ProtectedAdminRoute from './services/ProtectedAdminRoute.jsx';
import ProtectedSellerRoute from './services/ProtectedSellerRoute.jsx';
import PageNotFound from './components/PageNotFound.jsx';
// import { ErrorBoundary } from 'react-error-boundary';
import {lazy,Suspense} from 'react';
const OrderPlaced = lazy(()=> import('./pages/customer/OrderPlaced.jsx'))
// so we have to learn about suspence and error boundaries and skeltons so i paused this
function App() {
  return (
    <>
      <Provider store={productStore}>
        <ThemeContextProvider>
          <SearchContextProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Login />} />

                {/* Customer Route */}
                
                <Route path="/home" element={<Layout />}>
                    <Route element={<ProtectedRoutes />}>
                      <Route index element={<Home />} />
                      <Route path="cart" element={<CartPage />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route
                      path="product/:id"
                      element={<ProductDeatailsPage />}
                      />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                  {/* <Route path="/checkoutorderplaced" element={<OrderPlaced/>}/> */}
                </Route>
                <Route
                    path="/checkoutorderplaced"
                    element={
                      <Suspense fallback="Loading....">
                        <OrderPlaced />
                      </Suspense>
                    }
                  />

                {/* Admin Route */}

                <Route path="/admin" element={<AdminLayout />}>
                  <Route element={<ProtectedAdminRoute />}>
                    <Route index element={<AdminDashboard />} />
                    <Route
                      path="approvedSellers"
                      element={<ApprovedSellers />}
                    />
                    <Route path="manageProducts" element={<ManageProducts />} />
                    <Route path="sellerRequests" element={<SellerRequests />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Route>

                {/* Seller Route */}
                <Route path="/seller" element={<SellerLayout />}>
                  <Route element={<ProtectedSellerRoute />}>
                    <Route index element={<SellerDashboard />} />
                    <Route path="myProducts" element={<MyProducts />} />
                    <Route path="sellerProfile" element={<SellerProfile />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Router>
          </SearchContextProvider>
        </ThemeContextProvider>
      </Provider>
    </>
  );
}

export default App
