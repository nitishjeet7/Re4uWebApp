"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";

export type FilterOption =
  | "all"
  | "overview"
  | "editing"
  | "data"
  | "public"
  | "planning"
  | "presentations";

const filterOptions: { value: FilterOption; label: string }[] = [
  { value: "all", label: "All Services" },
  { value: "overview", label: "Service Overview" },
  { value: "editing", label: "Editing Support" },
  { value: "data", label: "Data Services" },
  { value: "planning", label: "Research Planning" },
  { value: "public", label: "Publications Support" },
  { value: "presentations", label: "Academic Presentation" },
];

type ServicesFilterProps = {
  selectedFilter: FilterOption;
  onFilterChange: (value: FilterOption) => void;
};

export function ServicesFilter({
  selectedFilter,
  onFilterChange,
}: ServicesFilterProps) {
  const getFilterLabel = () => {
    return (
      filterOptions.find((opt) => opt.value === selectedFilter)?.label ||
      "All Services"
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="inline-flex items-center gap-2 rounded-full border border-[#1F3A5F] bg-[#1F3A5F] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(20,35,45,.08)] hover:bg-[#162b46]"
        >
          <Filter className="h-4 w-4" />
          <span>{getFilterLabel()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-50">
        {filterOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`cursor-pointer ${selectedFilter === option.value
                ? "bg-[rgba(47,111,104,.10)] font-semibold"
                : ""
              }`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const AcademicPresentationUpload = () => {
  const [uploadedPPTX, setUploadedPPTX] = useState<string | null>(null);

  const handlePPTXUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedPPTX(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label htmlFor="pptx-upload">Upload PPTX:</label>
      <input
        type="file"
        id="pptx-upload"
        accept="application/vnd.openxmlformats-officedocument.presentationml.presentation"
        onChange={handlePPTXUpload}
      />
      {uploadedPPTX && (
        <div>
          <p>Uploaded PPTX:</p>
          <a href={uploadedPPTX} target="_blank" rel="noopener noreferrer">
            View PPTX
          </a>
        </div>
      )}
    </div>
  );
};

export default AcademicPresentationUpload;
