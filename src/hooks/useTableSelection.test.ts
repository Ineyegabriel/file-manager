import { renderHook, act } from "@testing-library/react-hooks";
import useTableSelection, { DataItem } from "./useTableSelection";

// Mock data for testing
const mockData: DataItem[] = [
  {
    name: "File 1",
    device: "Device A",
    path: "/path/to/file1",
    status: "available",
  },
  {
    name: "File 2",
    device: "Device B",
    path: "/path/to/file2",
    status: "scheduled",
  },
];

describe("useTableSelection", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("should initialize with empty selectedRowNames and selectAll as false", () => {
    const { result } = renderHook(() => useTableSelection(mockData));

    expect(result.current.selectedRowNames.size).toBe(0);
    expect(result.current.selectAll).toBe(false);
  });

  it("should handle checkbox change for individual row", () => {
    const { result } = renderHook(() => useTableSelection(mockData));

    act(() => {
      result.current.handleCheckboxChange("File 1");
    });

    expect(result.current.selectedRowNames.has("File 1")).toBe(true);
    expect(result.current.selectAll).toBe(false);
  });

  it("should handle select all change", () => {
    const { result } = renderHook(() => useTableSelection(mockData));

    act(() => {
      result.current.handleSelectAllChange();
    });

    expect(result.current.selectedRowNames.size).toBe(mockData.length);
    expect(result.current.selectAll).toBe(true);
  });

  it("should handle download selected files", () => {
    const { result } = renderHook(() => useTableSelection(mockData));

    // Mock alert function
    const spy = vi.spyOn(window, "alert").mockImplementation(() => {});

    act(() => {
      result.current.handleCheckboxChange("File 1");
      result.current.handleDownloadSelected();
    });

    expect(spy).toHaveBeenCalled();
  });
});
