"use client";

import { useEffect, useState } from "react";
import { CertificateImageModal } from "../modals/certificate-image-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CertificateImageModal />
    </>
  );
};
