import {Navigate, Route, Routes} from "react-router-dom";
import Homepage from "../../pages/homepage/Homepage.jsx";
import LoginPage from "../../pages/login/LoginPage.jsx";
import AdvertPage from "../../pages/advert/AdvertPage.jsx";
import RegisterPage from "../../pages/register/RegisterPage.jsx";
import AllAdvertsPage from "../../pages/adverts/AllAdvertsPage.jsx";
// import ProfilePage from "../../pages/profile/ProfilePage.jsx";
import CreateAdvert from "../../pages/createAdvert/CreateAdvert.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import AdminPage from "../../pages/admin/AdminPage.jsx";
import SearchResultsPage from "../../pages/search/SearchResultsPage.jsx";
import ProfilePage from "../../pages/profile/ProfilePage.jsx";


const AppRoutes = () => {
    const {isAuth, user, status} = useContext(AuthContext);
    console.log('PrivateRoute - isAuthenticated:', isAuth);
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/adverts/:id" element={<AdvertPage />} />
            <Route path="/search" element={<SearchResultsPage /> } />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/adverts" element={<AllAdvertsPage />} />
            <Route path="/creeradvert" element={isAuth ? <CreateAdvert /> : <Navigate to="/login" />} />
            {/*<Route path="/profile" element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} />*/}
            <Route path="/profile/*" element={isAuth ? <ProfilePage /> : <Navigate to="/login" />} />
            {/*<Route path="/account-details" element={<ProfilePage />} />*/}
            <Route path="/admin" element={isAuth && user.roles.includes('ROLE_ADMIN') ? <AdminPage /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default AppRoutes;