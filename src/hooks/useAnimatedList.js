import { useState, useCallback } from "react";

export default function useAnimatedList() {
    const [items, setItems] = useState([]);
    const [pendingRemovalItemsIds, setPendingRemovalItemsIds] = useState([]);

    const handleRemoveItem = useCallback((id) => {
        setPendingRemovalItemsIds((prevState) => [...prevState, id]);
    }, []);

    const handleAnimationEnd = useCallback((id) => {
        setItems((prevState) => prevState.filter((items) => items.id !== id));

        setPendingRemovalItemsIds((prevState) =>
            prevState.filter((itemId) => itemId !== id)
        );
    }, []);

    const renderList = useCallback(
        (renderItem) => {
            return items.map(renderItem);
        },
        [items]
    );

    return {
        pendingRemovalItemsIds,
        handleRemoveItem,
        handleAnimationEnd,
        items,
        setItems,
        renderList,
    };
}
