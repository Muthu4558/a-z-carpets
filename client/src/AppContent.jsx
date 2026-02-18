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
import Coimbatore from "./page/Coimbatore";
import Size3x5 from "./page/Size3x5";
import BeigeCarpets from "./page/BeigeCarpets";
import RoundCarpets from "./page/RoundCarpetsShape";
import RectangularCarpets from "./page/RectangularShape";
import IrregularCarpets from "./page/IrregularShape";
import RedCarpets from "./page/RedCarpets";
import BlueCarpets from "./page/BlueCarpets";
import BlackCarpets from "./page/BlackCarpets";
import GreenCarpets from "./page/GreenCarpets";
import WhiteCarpets from "./page/WhiteCarpets";
import GreyCarpets from "./page/GreyCarpets";
import BrownCarpets from "./page/BrownCarpets";
import PinkCarpets from "./page/PinkCarpets";
import YellowCarpets from "./page/YellowCarpets";
import Size4x6 from "./page/4x6";
import Size5x7 from "./page/5x7";
import Size5x8 from "./page/5x8";
import Size6x8 from "./page/6x8";
import Size6x9 from "./page/6x9";
import Size7x10 from "./page/7x10";
import Size8x10 from "./page/8x10";
import Size8x11 from "./page/8x11";
import Size9x12 from "./page/9x12";
import Size10x13 from "./page/10x13";
import GreenParty from "./page/GreenParty";
import BlueParty from "./page/BlueParty";
import RedParty from "./page/RedParty";
import GreyParty from "./page/GreyParty";
import BrownParty from "./page/BrownParty";
import DarkGreyParty from "./page/DarkGreyParty";
import BeigeParty from "./page/BeigeParty";
import Ag25 from "./page/Ag25";
import Ag35 from "./page/Ag35";
import Ag40 from "./page/Ag40";
import Ag50 from "./page/Ag50";

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
                <Route path="/coimbatore-shop" element={<Coimbatore />} />
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
                <Route path="/products/size/3x5" element={<Size3x5 />} />
                <Route path="/products/color/beige" element={<BeigeCarpets />} />
                <Route path="/products/shape/round" element={<RoundCarpets />} />
                <Route path="/products/shape/rectangular" element={<RectangularCarpets />} />
                <Route path="/products/shape/irregular" element={<IrregularCarpets />} />
                <Route path="/products/color/red" element={<RedCarpets />} />
                <Route path="/products/color/blue" element={<BlueCarpets />} />
                <Route path="/products/color/black" element={<BlackCarpets />} />
                <Route path="/products/color/green" element={<GreenCarpets />} />
                <Route path="/products/color/white" element={<WhiteCarpets />} />
                <Route path="/products/color/grey" element={<GreyCarpets />} />
                <Route path="/products/color/brown" element={<BrownCarpets />} />
                <Route path="/products/color/pink" element={<PinkCarpets />} />
                <Route path="/products/color/yellow" element={<YellowCarpets />} />
                <Route path="/products/size/4x6" element={<Size4x6 />} />
                <Route path="/products/size/5x7" element={<Size5x7 />} />
                <Route path="/products/size/5x8" element={<Size5x8 />} />
                <Route path="/products/size/6x8" element={<Size6x8 />} />
                <Route path="/products/size/6x9" element={<Size6x9 />} />
                <Route path="/products/size/7x10" element={<Size7x10 />} />
                <Route path="/products/size/8x10" element={<Size8x10 />} />
                <Route path="/products/size/8x11" element={<Size8x11 />} />
                <Route path="/products/size/9x12" element={<Size9x12 />} />
                <Route path="/products/size/10x13" element={<Size10x13 />} />
                <Route path="/products/party/green" element={<GreenParty />} />
                <Route path="/products/party/blue" element={<BlueParty />} />
                <Route path="/products/party/red" element={<RedParty />} />
                <Route path="/products/party/grey" element={<GreyParty />} />
                <Route path="/products/party/brown" element={<BrownParty />} />
                <Route path="/products/party/dark-grey" element={<DarkGreyParty />} />
                <Route path="/products/party/beige" element={<BeigeParty />} />
                <Route path="/products/grass/25mm" element={<Ag25 />} />
                <Route path="/products/grass/35mm" element={<Ag35 />} />
                <Route path="/products/grass/40mm" element={<Ag40 />} />
                <Route path="/products/grass/50mm" element={<Ag50 />} />
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