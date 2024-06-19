import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CheckOut from "./pages/CheckOut";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <div><LoginPage></LoginPage></div>,
  },
  {
    path: "/signup",
    element: <div><SignUpPage></SignUpPage></div>,
  },
  {
    path: "/cart",
    element: <div><CartPage></CartPage></div>,
  },
  {
    path: "/checkout",
    element: <div><CheckOut></CheckOut></div>,
  },
  {
    path: "/product-detail",
    element: <div><ProductDetailPage></ProductDetailPage></div>,
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
