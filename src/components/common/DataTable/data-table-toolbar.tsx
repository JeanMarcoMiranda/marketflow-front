import { X } from "lucide-react";
import { ComponentType, ReactNode } from "react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";

export interface FacetedFilterOption {
  label: string;
  value: string;
  icon?: ComponentType<{ className?: string }>;
}

export interface DataTableToolbarFacet {
  columnId: string;
  title: string;
  options?: FacetedFilterOption[];
}
export interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchColumnId?: string;
  searchPlaceholder?: string;
  filters?: DataTableToolbarFacet[];
  actions?: ReactNode
}

export function DataTableToolbar<TData>({
  table,
  searchColumnId,
  searchPlaceholder = "Search...",
  filters,
  actions
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const searchColumn = searchColumnId
    ? table.getColumn(searchColumnId)
    : undefined;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchColumn && (
          <Input
            placeholder={searchPlaceholder}
            value={(searchColumn.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              searchColumn.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        )}

        {filters?.map((filterConfig) => {
          const { columnId, title, options } = filterConfig;
          const column = table.getColumn(columnId);
          if (!column) return null;

          const safeOptions: FacetedFilterOption[] = options ?? [];

          return (
            <DataTableFacetedFilter
              key={columnId}
              column={column}
              title={title}
              options={safeOptions}
            />
          );
        })}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>

      <div className="flex items-center space-x-2"> {/* Contenedor para acciones y opciones de vista */}
        {/* Aquí se renderizarán los botones de acción personalizados */}
        {actions}
        <DataTableViewOptions table={table} />
      </div>

      {/* <DataTableViewOptions table={table} /> */}
    </div>
  );
}
