import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: ':productName/:productId',
        element: <ProductDetails />,
      },
      {
        path: '/cart/:userId',
        element: <Cart />,
      },
      {
        path: '/profile/:userId',
        element: <Profile />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/paymentSuccess',
        element: <PaymentSuccess />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Signup />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
