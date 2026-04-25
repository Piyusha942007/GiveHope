"use client";

import { usePathname } from "next/navigation";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={`flex-grow flex flex-col page-fade-in ${isHome ? "" : "pt-24 md:pt-28"}`}>
      {children}
    </main>
  );
}
