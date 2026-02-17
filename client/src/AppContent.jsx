import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import { useLoading } from "./context/LoadingContext";

import Home from "./page/Home";
import Login from "./page/Login";
import Signup from "./page/Signup";
import VerifyEmail from "./page/VerifyEmail";
import Profile from "./page/Profile";
import Cart from "./page/Cart";
import PrivateRoute from "./components/PrivateRoute";
import ProductDetail from "./page/ProductDetail";
import ThankYou from "./page/thankyou";
import About from "./components/About";
import Checkout from "./page/Checkout";
import Order from "./page/Order";
import OrderDetails from "./page/OrderDetails";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Shipping from "./components/Shipping";
import Terms from "./components/Terms";
import Contact from "./page/ContactUs";
import Blog from "./page/Blog";
import BlogDetail from "./page/BlogDetail";
import Refund from "./components/Refund";
// Admin
import Admin from "./page/Admin";
import AdminOrders from "./page/AdminOrders";
import AdminShipping from "./page/AdminShipping";
import AdminBlog from "./page/AdminBlog";
import AdminDashboard from "./page/AdminDashboard";
import AdminEnquiry from "./page/AdminEnquiry";
// products
import AllProduct from "./page/AllProduct";
import HandRugs from "./page/HandRugs";
import Shaggy from "./page/Shaggy";
import PersianSilk from "./page/PersianSilk";
import DesignerCarpets from "./page/DesignerCarpets";
import LuxuryRugs from "./page/LuxuryRugs";
import IranianRugs from "./page/IranianRugs";
import IrregularRugs from "./page/IrregularRugs";
import TraditionalRugs from "./page/TraditionalRugs";
import RoundShaggy from "./page/RoundCarpets";
import RoundTufted from "./page/RoundTufted";
import ChildrenRugs from "./page/ChildrenRugs";

const AppContent = () => {
    const { loading } = useLoading();

    return (
        <>
            {loading && <Loader />}

            <Routes key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/verify-email/:token" element={<VerifyEmail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/refund" element={<Refund />} />
                {/* protected routes */}
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                <Route path="/order" element={<PrivateRoute><Order /></PrivateRoute>} />
                {/* product routes */}
                <Route path="/products/all" element={<AllProduct />} />
                <Route path="/products/hand-tufted" element={<HandRugs />} />
                <Route path="/products/shaggy" element={<Shaggy />} />
                <Route path="/products/persian-silk" element={<PersianSilk />} />
                <Route path="/products/designer" element={<DesignerCarpets />} />
                <Route path="/products/luxury-viscose" element={<LuxuryRugs />} />
                <Route path="/products/iranian-imported" element={<IranianRugs />} />
                <Route path="/products/irregular-shaped" element={<IrregularRugs />} />
                <Route path="/products/traditional-persian" element={<TraditionalRugs />} />
                <Route path="/products/round-shaggy" element={<RoundShaggy />} />
                <Route path="/products/round-tufted" element={<RoundTufted />} />
                <Route path="/products/children-rugs" element={<ChildrenRugs />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order/:id" element={<OrderDetails />} />
                <Route path="/thankyou" element={<ThankYou />} />
                {/* admin */}
                <Route path="/admin/products" element={<PrivateRoute adminOnly={true}><Admin /></PrivateRoute>} />
                <Route path="/admin/dashboard" element={<PrivateRoute adminOnly={true}><AdminDashboard /></PrivateRoute>} />
                <Route path="/admin/shipping" element={<PrivateRoute adminOnly={true}><AdminShipping /></PrivateRoute>} />
                <Route path="/admin/orders" element={<PrivateRoute adminOnly={true}><AdminOrders /></PrivateRoute>} />
                <Route path="/admin/blog" element={<PrivateRoute adminOnly={true}><AdminBlog /></PrivateRoute>} />
                <Route path="/admin/enquiry" element={<PrivateRoute adminOnly={true}><AdminEnquiry /></PrivateRoute>} />
            </Routes>
        </>
    );
};

export default AppContent;