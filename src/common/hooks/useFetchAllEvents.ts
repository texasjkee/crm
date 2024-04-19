import useAuthStatus from "common/hooks/useAuthStatus";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "store/slices/events/getAllEvents";
import { getEvents } from "store/slices/events/selectors/getEvents";
import { AppThunkDispatch } from "store/store";

export const useFetchAllEvents = () => {
    const dispatch = useDispatch<AppThunkDispatch>();
    const { isLoggedIn, authData } = useAuthStatus();
    const tasks = useSelector(getEvents);

    useEffect(() => {
        if (isLoggedIn) {
            authData?.token && dispatch(getAllEvents(authData.token));
        }
    }, [authData?.token, dispatch, isLoggedIn]);

    return tasks;
};
