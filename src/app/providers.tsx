"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { SonnerToaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>
        {children}
        <Toaster />
        <SonnerToaster />
      </ToastProvider>
    </SessionProvider>
  );
}
