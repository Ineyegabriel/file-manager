import { useState } from "react";
import { StatusRecord } from "@components/TableRow/TableRow";

/**
 * Interface for each data item.
 */
export interface DataItem {
  name: string;
  device: string;
  path: string;
  status: keyof typeof StatusRecord;
}

/**
 * Return type for the useTableSelection hook.
 */
export type UseTableSelectionReturnType = {
  selectedRowNames: Set<string>; // Set of selected row names
  selectAll: boolean; // Indicates whether all rows are selected
  handleCheckboxChange: (name: string) => void; // Function to handle checkbox change for individual row
  handleSelectAllChange: () => void; // Function to handle checkbox change for selecting all rows
  handleDownloadSelected: () => void; // Function to handle downloading selected files
};

/**
 * Custom hook for managing table row selection.
 * @param data The array of data items.
 * @returns UseTableSelectionReturnType
 */
const useTableSelection = (data: DataItem[]): UseTableSelectionReturnType => {
  // State for selected row names
  const [selectedRowNames, setSelectedItems] = useState<Set<string>>(new Set());
  // State for indicating if all rows are selected
  const [selectAll, setSelectAll] = useState<boolean>(false);

  /**
   * Handles the change of checkbox for individual row.
   * @param name The name of the row.
   */
  const handleCheckboxChange = (name: string) => {
    const newSelectedItems = new Set(selectedRowNames);

    // Toggle selection
    if (selectedRowNames.has(name)) {
      newSelectedItems.delete(name);
    } else {
      newSelectedItems.add(name);
    }

    // Update states
    setSelectedItems(newSelectedItems);
    setSelectAll(
      newSelectedItems.size === data.length && newSelectedItems.size > 0
    );
  };

  /**
   * Handles the change of checkbox for selecting all rows.
   */
  const handleSelectAllChange = () => {
    const newSelectedItems = new Set(selectedRowNames);

    // Toggle select all
    if (selectAll) {
      newSelectedItems.clear();
    } else {
      data.forEach((item) => newSelectedItems.add(item.name));
    }

    // Update states
    setSelectedItems(newSelectedItems);
    setSelectAll(!selectAll);
  };

  /**
   * Filters files by status.
   * @param files The array of files to filter.
   * @returns Filtered files by status.
   */
  const filterFilesByStatus = (files: DataItem[]): DataItem[] => {
    return files.filter(
      (item) =>
        selectedRowNames.has(item.name) &&
        item.status === StatusRecord.available
    );
  };

  /**
   * Handles the action of downloading selected files.
   */
  const handleDownloadSelected = () => {
    const selectedFiles = filterFilesByStatus(data);

    // Check if there are files available for download
    if (selectedFiles.length === 0) {
      alert("No files are available for download.");
      return;
    }

    // Generate message for downloading selected files
    const message = selectedFiles
      .map((file) => `Path: ${file.path}, Device: ${file.device}`)
      .join("\n");
    alert(message);
  };

  // Return values and functions
  return {
    selectedRowNames,
    selectAll,
    handleCheckboxChange,
    handleSelectAllChange,
    handleDownloadSelected,
  };
};

export default useTableSelection;
