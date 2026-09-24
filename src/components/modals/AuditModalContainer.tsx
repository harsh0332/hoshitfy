"use client";

import React from "react";
import { useAuditModal } from "@/context/AuditModalContext";
import { AuditModal } from "./AuditModal";

export function AuditModalContainer() {
  const { isOpen, closeAuditModal } = useAuditModal();
  return <AuditModal isOpen={isOpen} onClose={closeAuditModal} />;
}
