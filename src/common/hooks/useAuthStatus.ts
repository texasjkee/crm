import { useSelector } from "react-redux";
import { getUserAuthData } from "../../store/slices/user/selectors.ts/getAuthData";

const useAuthStatus = () => {
    const authData = useSelector(getUserAuthData);

    const isLoggedIn = authData?.token && authData.token.length > 0;

    return {
        isLoggedIn,
        authData,
    };
};

export default useAuthStatus;
