import { create } from "zustand";

type CertificateImageStore = {
  url?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCertificateImage = create<CertificateImageStore>((set) => ({
  url: undefined,
  isOpen: false,
  onOpen: (url?: string) => set({ isOpen: true, url }),
  onClose: () => set({ isOpen: false }),
}));
