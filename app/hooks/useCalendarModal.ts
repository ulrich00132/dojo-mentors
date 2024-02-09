import { create } from 'zustand';

interface CalendarModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

const useCalendarModal = create<CalendarModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default useCalendarModal