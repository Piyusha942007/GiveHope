import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  className?: string;
}

export const Heading = ({
  level = 1,
  children,
  className = "",
}: HeadingProps) => {
  const tags = {
    1: "h1",
    2: "h2",
    3: "h3",
    4: "h4",
  } as const;
  
  const Tag = tags[level];
  
  const styles = {
    1: "text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl",
    2: "text-3xl font-bold tracking-tight sm:text-4xl",
    3: "text-2xl font-semibold tracking-tight",
    4: "text-xl font-medium tracking-tight",
  };

  return (
    <Tag className={`${styles[level]} text-gray-900 ${className}`}>
      {children}
    </Tag>
  );
};
