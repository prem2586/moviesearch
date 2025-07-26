"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const SidebarTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) =>
  React.createElement(
    "h1",
    {
      ref: ref,
      className: cn("text-2xl font-bold p-4 flex items-center font-headline", className),
      ...props,
    },
    children
  )
);
SidebarTitle.displayName = "SidebarTitle";

export {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarTitle,
};
