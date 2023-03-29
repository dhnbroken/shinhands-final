import Home from '~/pages/Home/Home';
import EditProduct from '~/components/EditProduct/EditProduct';
import Login from '~/pages/Login/Login';
import Products from '~/pages/Products/Products';
import Register from '~/pages/Register/Register';
import User from '~/pages/User/User';
import UserInfo from '~/pages/UserInfo/UserInfo';
import DashBoard from '~/pages/DashBoard/DashBoard';
import ProductInfo from '~/components/ProductInfo/ProductInfo';

const publicRoutes = [
  { path: '/', component: Home },
  { path: '/user/:id', component: UserInfo },
  { path: '/shop/sneaker', component: Products },
  { path: '/shop/sneaker/:id', component: ProductInfo },
];

const adminRoute = [
  { path: '/dashboard', component: DashBoard },
  { path: '/user', component: User },
  { path: '/products', component: Products },
  { path: '/products/:id', component: EditProduct },
  { path: '/products/add', component: EditProduct },
];

const authRoutes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];

export { publicRoutes, authRoutes, adminRoute };
