import { RouterProvider } from "react-router-dom";
import { Routing } from "./routers/routing";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userActions } from "./store/slices/user/userSlice";
import { UIContextProvider } from "./components/UIContext";
import { AppThunkDispatch } from "./store/store";

function App() {
    const dispatch = useDispatch<AppThunkDispatch>();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className='app'>
            <UIContextProvider>
                <RouterProvider router={Routing} />
            </UIContextProvider>
        </div>
    );
}

export default App;
