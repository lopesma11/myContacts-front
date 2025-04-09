import { useState, useRef, useEffect, useCallback } from "react";
export default function useSafeAsyncState(inicialState) {
    const [state, setState] = useState(inicialState);

    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        };
    }, []);

    const setSafeAsyncState = useCallback((data) => {
        if (isMounted.current) {
            setState(data);
        }
    }, []);

    return [state, setSafeAsyncState];
}
