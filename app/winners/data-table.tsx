"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Combobox } from "./combobox";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [currentTimeoutHandler, setCurrentTimeoutHandler] =
    useState<NodeJS.Timeout | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const SearchInput = (column: string, title: string) => {
    return (
      <div className="flex flex-col items-start px-1 justify-end">
        <Label htmlFor="code" className="m-1 pl-2">
          {title}
        </Label>
        <Input
          id={column}
          placeholder={`請輸入${title}`}
          value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(column)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
    );
  };

  const SearchableSelect = (column: string, title: string) => {
    const items = data.map((r: any) => r[column] as string) ?? [];

    const prizeNames = [...new Set(items)];

    return (
      <div className="flex flex-col items-start px-1 justify-end">
        <Label htmlFor="prizeNames" className="m-1 pl-2">
          {title}
        </Label>
        <Combobox
          data={prizeNames.map((name) => ({
            value: name.toLowerCase(),
            label: name,
          }))}
          title={title}
          onValueChange={(value) => {
            table.getColumn(column)?.setFilterValue(value);
          }}
          value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
        />
      </div>
    );
  };

  const reset = () => {
    table.resetColumnFilters();
  };

  return (
    <div>
      <div className="flex items-end py-4 justify-between flex-col lg:flex-row">
        <div className="flex flex-col lg:flex-row">
          {SearchableSelect("prize", "獎項")}
          {SearchInput("code", "員工編號")}
          {SearchInput("name", "姓名")}
          {SearchInput("departmentName", "部門")}
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={reset} variant={"outline"} className="bg-red-800">
            清除條件
          </Button>
          <Button variant={"outline"} className="bg-gray-900">
            <RefreshCcw
              size={18}
              className={refresh ? "animate-spin" : ""}
              color="green"
              onClick={() => {
                if (currentTimeoutHandler) clearTimeout(currentTimeoutHandler);
                setCurrentTimeoutHandler(null);
                setRefresh(true);
                const timeoutHandler = setTimeout(() => {
                  setRefresh(false);
                }, 1000);
                setCurrentTimeoutHandler(timeoutHandler);
                router.refresh();
              }}
            />
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  沒有資料
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
