"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SidebarItem = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
}) => {
  const pathname = usePathname();
  let active: string;

  return (
    <li
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
    >
      <div
        className={`block rounded-lg text-white  px-4 py-4 text-sm font-medium `}
      >
        {children}
      </div>
    </li>
  );
};

export default SidebarItem;