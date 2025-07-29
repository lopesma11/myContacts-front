import { useEffect } from "react";
import { toastEventManager } from "../../../utils/toast";
import useAnimatedList from "../../../hooks/useAnimatedList";

export default function useToastContainer() {
    const {
        pendingRemovalItemsIds,
        handleRemoveItem,
        handleAnimationEnd,
        items,
        setItems,
    } = useAnimatedList;

    useEffect(() => {
        function handleAddToast({ type, text, duration }) {
            setItems((prevState) => [
                ...prevState,
                { id: Math.random(), type, text, duration },
            ]);
        }
        toastEventManager.on("addtoast", handleAddToast);

        return () => {
            toastEventManager.removeListener("addtoast", handleAddToast);
        };
    }, [setItems]);

    return {
        items,
        handleRemoveItem,
        pendingRemovalItemsIds,
        handleAnimationEnd,
    };
}
