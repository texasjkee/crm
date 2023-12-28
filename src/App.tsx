import Header from "./components/Header/Header";
import Calendar from "./components/Calendar/Calendar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { userActions } from "./store/slices/user/userSlice";
// import Test from "./components/Test";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className='app'>
            <Header />
            <Calendar year={2023} month={12} />
            {/* <Test /> */}
        </div>
    );
}

export default App;
