import { render, fireEvent } from "@testing-library/react";
import { TableRow } from "./TableRow";

describe("TableRow component", () => {
  const mockItem = {
    name: "Test Item",
    device: "Test Device",
    path: "/test/path",
    status: "available",
  };
  const mockHandleCheckboxChange = vi.fn();
  const mockIsChecked = false;

  it("should render correctly", () => {
    const { getByText, getByTestId } = render(
      <table>
        <tbody>
          <TableRow
            item={mockItem}
            handleCheckboxChange={mockHandleCheckboxChange}
            isChecked={mockIsChecked}
            index={0}
          />
        </tbody>
      </table>
    );

    expect(getByText(mockItem.name)).toBeInTheDocument();
    expect(getByText(mockItem.device)).toBeInTheDocument();
    expect(getByText(mockItem.path)).toBeInTheDocument();
    expect(getByText(mockItem.status)).toBeInTheDocument();
    expect(getByTestId("checkbox-0")).toBeInTheDocument();
  });

  it("should call handleCheckboxChange when checkbox is clicked", () => {
    const { getByTestId } = render(
      <table>
        <tbody>
          <TableRow
            item={mockItem}
            handleCheckboxChange={mockHandleCheckboxChange}
            isChecked={mockIsChecked}
            index={0}
          />
        </tbody>
      </table>
    );

    const checkbox = getByTestId("checkbox-0");
    fireEvent.click(checkbox);

    expect(mockHandleCheckboxChange).toHaveBeenCalledTimes(1);
  });
});
