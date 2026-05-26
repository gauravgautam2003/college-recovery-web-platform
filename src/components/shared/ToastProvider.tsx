"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2800,
        style: {
          border: "1px solid rgba(148, 163, 184, 0.28)",
          borderRadius: "10px",
          color: "#0b1c30",
          fontSize: "13px",
          boxShadow: "0 14px 32px rgba(30, 41, 59, 0.12)",
        },
        success: {
          iconTheme: {
            primary: "#3525cd",
            secondary: "#ffffff",
          },
        },
      }}
    />
  );
}
