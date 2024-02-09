import { create } from 'zustand';

interface DashboardFormStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useDashboardForm = create<DashboardFormStore>((set) => ({
    isOpen: false,
    onOpen: () => set ({ isOpen: true}),
    onClose: () => set ({ isOpen: false }),

}));

export default useDashboardForm;