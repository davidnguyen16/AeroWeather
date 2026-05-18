export const formatTime = (isoTime: string): string => {
    const date = new Date(isoTime);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h = hours % 12 || 12;
    return `${h.toString().padStart(2, '0')}:${minutes} ${ampm}`;
};