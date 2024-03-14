import { render, fireEvent, act } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders the data table with correct props", () => {
    const { getByTestId } = render(<App />);

    const dataTable = getByTestId("data-table");
    expect(dataTable).toBeInTheDocument();
  });

  it("handles checkbox change correctly", () => {
    const { getByTestId } = render(<App />);

    // Simulate checkbox change for the first row
    const checkbox = getByTestId("checkbox-0");
    fireEvent.click(checkbox);

    // Verify that the checkbox has been toggled
    expect(checkbox).toBeChecked();
  });

  it("handles download selected correctly", () => {
    const { getByTestId } = render(<App />);
    const spy = vi.spyOn(window, "alert").mockImplementation(() => {});
    // Simulate download button click
    const downloadButton = getByTestId("download-button");
    fireEvent.click(downloadButton);

    act(() => {
      fireEvent.click(downloadButton);
    });

    expect(spy).toHaveBeenCalled();
  });
});
