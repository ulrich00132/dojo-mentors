import { create } from 'zustand';

interface MentorModalStore {
    isOpen: boolean;
    onOpen: () =>  void;
    onClose: () => void;
}

const useMentorModal = create<MentorModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));

export default useMentorModal;