import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  spaced?: boolean;
}

export const Section = ({
  children,
  className = "",
  id,
  spaced = true,
}: SectionProps) => {
  return (
    <section
      id={id}
      className={`${spaced ? "py-12 md:py-24" : ""} ${className}`}
    >
      {children}
    </section>
  );
};
