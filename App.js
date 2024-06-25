import { createBrowserRouter, RouterProvider, Route, Link, } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CheckOut from "./pages/CheckOut";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import PageNotFound from "./pages/404";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/auth/authSlice";
import OrderSuccess from "./pages/orderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import LogOut from "./features/auth/components/LogOut";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProdctFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home></Home></Protected>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>,
  },
  {
    path: "/login",
    element: <div><LoginPage></LoginPage></div>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element: <div><Protected><CheckOut></CheckOut></Protected></div>,
  },
  {
    path: "/product-detail/:id",
    element: <div><Protected><ProductDetailPage></ProductDetailPage></Protected></div>,
  },
  {
    path: "/admin/product-detail/:id",
    element:
      <div>
        <ProtectedAdmin>
          <AdminProductDetailPage></AdminProductDetailPage>
        </ProtectedAdmin>
      </div>,
  },
  {
    path: "/admin/product-form",
    element:
      <div>
        <ProtectedAdmin>
          <AdminProductFormPage></AdminProductFormPage>
        </ProtectedAdmin>
      </div>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element:
      <div>
        <ProtectedAdmin>
          <AdminProductFormPage></AdminProductFormPage>
        </ProtectedAdmin>
      </div>,
  },
  {
    path: "/orders",
    element: <div><UserOrdersPage></UserOrdersPage></div>,
  },
  {
    path: "/order-sucess/:id",
    element: <div><Protected><OrderSuccess></OrderSuccess></Protected></div>,
  },
  {
    path: "/profile",
    element: <div><Protected><UserProfilePage></UserProfilePage></Protected></div>,
  },
  {
    path: "/logout",
    element: <div><LogOut></LogOut></div>,
  },
  {
    path: "/forgot-password",
    element: <div><ForgotPasswordPage></ForgotPasswordPage></div>,
  },
  {
    path: "*",
    element: <div><PageNotFound></PageNotFound></div>,
  },
]);

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user?.id))
    }
  }, [dispatch, user])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
