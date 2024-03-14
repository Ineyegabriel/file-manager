import { render, fireEvent } from "@testing-library/react";
import { CheckBox } from "./CheckBox";

describe("CheckBox component", () => {
  it("should render correctly", () => {
    const onChange = vi.fn();
    const { getByTestId } = render(
      <CheckBox isIndeterminate={false} checked={false} onChange={onChange} />
    );

    const checkbox = getByTestId("custom-checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("should call onChange when clicked", () => {
    const onChange = vi.fn();
    const { getByTestId } = render(
      <CheckBox isIndeterminate={false} checked={false} onChange={onChange} />
    );

    const checkbox = getByTestId("custom-checkbox");
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalled();
  });
});
