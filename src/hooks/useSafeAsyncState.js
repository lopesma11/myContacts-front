import { useState, useCallback } from "react";
import useIsMounted from "./useIsMounted";
export default function useSafeAsyncState(inicialState) {
    const [state, setState] = useState(inicialState);

    const isMounted = useIsMounted();

    const setSafeAsyncState = useCallback((data) => {
        if (isMounted()) {
            setState(data);
        }
    }, []);

    return [state, setSafeAsyncState];
}
