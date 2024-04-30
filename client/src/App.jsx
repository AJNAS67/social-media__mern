import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  // const mode = useSelector((state) => state.mode);
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth=Boolean(useSelector((state)=>state.token))
  console.log(isAuth,'isAuth');
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Routes>
              <Route path="/" element={<LoginPage />}></Route>
              <Route path="/login" element={<LoginPage/>}></Route>
              <Route path="/profile/:userId" element={isAuth ? <ProfilePage/>:<LoginPage/>}></Route>
              <Route path="/home" element={isAuth ? <HomePage/> :<LoginPage/>}></Route>
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
