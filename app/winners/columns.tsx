"use client";

import { Button } from "@/components/ui/button";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface Winner {
  name: string;
  code: string;
  prize: string;
  departmentName: string | null;
}

const sortableHeader = (header: string, column: Column<Winner, any>) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {header}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const columns: ColumnDef<Winner>[] = [
  {
    accessorKey: "prize",
    filterFn: (rows, name, value) => (rows.getValue(name) as string).toLowerCase() == value.toLowerCase(),
    header: ({ column }) => {
      return sortableHeader("獎項", column);
    },
  },
  {
    accessorKey: "code",
    header: ({ column }) => {
      return sortableHeader("員工編號", column);
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return sortableHeader("姓名", column);
    },
  },
  {
    accessorKey: "departmentName",
    header: ({ column }) => {
      return sortableHeader("部門", column);
    },
  },
];
