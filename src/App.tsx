import { RouterProvider } from "react-router-dom";
import { Routing } from "./routers/routing";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { userActions } from "./store/slices/user/userSlice";
import { UIContext, UIContextProvider } from "./components/UIContext";
import { getAllEvents } from "./store/slices/events/getAllEvents";
import { AppThunkDispatch } from "./store/store";
import { getError } from "./store/slices/events/selectors/getError";

function App() {
    const dispatch = useDispatch<AppThunkDispatch>();
    const { setAlert } = useContext(UIContext);
    const error = useSelector(getError);

    useEffect(() => {
        dispatch(userActions.initAuthData());
        dispatch(getAllEvents());
        if (error)
            setAlert({
                show: true,
                message: "Error with load events",
                severity: "error",
            });
    }, [dispatch, error, setAlert]);

    return (
        <div className='app'>
            <UIContextProvider>
                <RouterProvider router={Routing} />
            </UIContextProvider>
        </div>
    );
}

export default App;
