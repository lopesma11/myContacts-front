export default function toast({ type, text }) {
    const event = new CustomEvent("addtost", {
        detail: {
            type,
            text,
        },
    });

    document.dispatchEvent(event);
}
