import Header from "./components/Header/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userActions } from "./store/slices/user/userSlice";
import Calendar from "./components/Calendar/Calendar";
import { UIContextProvider } from "./components/UIContext";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className='app'>
            <UIContextProvider>
                <Header />
                <Calendar year={2023} month={12} />
            </UIContextProvider>
        </div>
    );
}

export default App;
