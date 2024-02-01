import { RouterProvider } from "react-router-dom";
import { Routing } from "./routers/routing";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userActions } from "./store/slices/user/userSlice";
import { UIContextProvider } from "./components/UIContext";
import { AppThunkDispatch } from "./store/store";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/theme";

function App() {
    const dispatch = useDispatch<AppThunkDispatch>();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className='app'>
            <ThemeProvider theme={theme}>
                <UIContextProvider>
                    <RouterProvider router={Routing} />
                </UIContextProvider>
            </ThemeProvider>
        </div>
    );
}

export default App;
