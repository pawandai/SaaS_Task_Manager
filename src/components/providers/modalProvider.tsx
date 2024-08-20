"use client";

import { useEffect, useState } from "react";
import { CardModal } from "../DashboardComponents/modals";
import ProModal from "../DashboardComponents/modals/proModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};
