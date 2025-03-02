"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
interface Props {
  children: React.ReactNode;
}
export default function TQProvider({ children }: Props) {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
