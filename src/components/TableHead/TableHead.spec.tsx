import { render, fireEvent } from "@testing-library/react";
import { TableHead } from "./TableHead";

describe("TableHead component", () => {
  const handleSelectAllChangeMock = vi.fn();
  const handleDownloadSelectedMock = vi.fn();

  const props = {
    selectAll: false,
    isIndeterminate: false,
    selectedRowNames: new Set<string>(),
    handleSelectAllChange: handleSelectAllChangeMock,
    handleDownloadSelected: handleDownloadSelectedMock,
  };

  it("should render correctly with no rows selected", () => {
    const { getByText, getByTestId } = render(
      <table>
        <TableHead {...props} />
      </table>
    );

    expect(getByText("None Selected")).toBeInTheDocument();
    expect(getByTestId("download-button")).toBeInTheDocument();
  });

  it("should render correctly with some rows selected", () => {
    const selectedRowNames = new Set<string>(["Row 1", "Row 2"]);
    const { getByText } = render(
      <table>
        <TableHead {...props} selectedRowNames={selectedRowNames} />
      </table>
    );

    expect(getByText("Selected 2")).toBeInTheDocument();
  });

  it("should call handleSelectAllChange when select all checkbox is clicked", () => {
    const { getByTestId } = render(
      <table>
        <TableHead {...props} />
      </table>
    );
    const selectAllCheckbox = getByTestId("custom-checkbox");

    fireEvent.click(selectAllCheckbox);

    expect(handleSelectAllChangeMock).toHaveBeenCalledTimes(1);
  });

  it("should call handleDownloadSelected when download button is clicked", () => {
    const { getByTestId } = render(
      <table>
        <TableHead {...props} />
      </table>
    );
    const downloadButton = getByTestId("download-button");

    fireEvent.click(downloadButton);

    expect(handleDownloadSelectedMock).toHaveBeenCalledTimes(1);
  });
});
