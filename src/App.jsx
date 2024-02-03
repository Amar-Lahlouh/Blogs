// import { AuthContextProvider } from "../context/authContext";
import "./App.css";
import { Navbar, Footer } from "./Components/index";
import { Home, Single, Register, Write, Login } from "./pages/index";
import { Route, Outlet, BrowserRouter, Routes } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="app">
      <div className="container">
        {" "}
        <BrowserRouter>
          <Routes>
            {/* by default btbayn al navbar w footer w al 
        outlet hwi le blnos hsb shu b5tar */}
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />

              <Route path="/write" element={<Write />} />
              <Route path="/post/:id" element={<Single />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
