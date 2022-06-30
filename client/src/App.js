import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import StorePage from "./pages/StorePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BalanceBoxPage from "./pages/BalanceBoxPage";
import MyItemsPage from "./pages/MyItemsPage";
import { PrivateRoute, PublicRoute } from "./routes/Routes";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="px-[8vw] py-[20px] bg-white">
      <div className="relative z-10">
        <Navbar />
      </div>
      
      <Routes>
        <Route exact path='/' element={<LandingPage />}/>
        <Route exact path='/store' element={<StorePage />}/>
        <Route exact path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route exact path='/register' element={<PublicRoute><RegisterPage /></PublicRoute>} />
        <Route exact path='/balance-box' element={<PrivateRoute><BalanceBoxPage /></PrivateRoute>} />
        <Route exact path='/my-items' element={<PrivateRoute><MyItemsPage /></PrivateRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
