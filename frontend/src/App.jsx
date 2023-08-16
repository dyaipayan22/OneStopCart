import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import UserLayout from './components/Layout/UserLayout';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import Profile from './pages/Profile';
import AddProduct from './pages/AddProduct';
import Home from './pages/Home';
import AdminProducts from './pages/AdminProducts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/shop',
        element: <Shop />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
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
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: '/admin/products',
        element: <AdminProducts />,
      },
      {
        path: '/admin/products/add',
        element: <AddProduct />,
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
