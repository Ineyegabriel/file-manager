import styled, { css } from "styled-components";

type CheckBoxProps = {
  isIndeterminate: boolean;
  checked: boolean;
  onChange: () => void;
};
export const CheckBox = ({
  isIndeterminate,
  checked,
  onChange,
}: CheckBoxProps) => {
  return (
    <FormGroup
      $isIndeterminate={isIndeterminate}
      $checked={checked}
      data-testid="select-all-checkbox"
    >
      <input
        type="checkbox"
        id="javascript"
        data-testid="custom-checkbox"
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor="javascript" role="label"></label>
    </FormGroup>
  );
};

const indeterminateStyles = css`
  & + label:after {
    content: "";
    display: block;
    position: absolute;
    top: 6px;
    left: 3px;
    width: 12px;
    border-radius: 7px;
    height: 5px;
    background-color: #ffffff;
    transform: rotate(0deg);
  }
  & + label::before {
    background-color: var(--color-primary-700);
    border-color: var(--color-primary-700);
  }
`;

const checkedStyles = css`
  & + label:after {
    content: "";
    display: block;
    position: absolute;
    top: 2%;
    left: 6px;
    width: 4px;
    height: 8px;
    border-bottom: 3px solid #ffffff;
    border-right: 3px solid #ffffff;
    transform: rotate(45deg);
  }
  & + label::before {
    background-color: #2775ff;
    border-color: #2775ff;
  }
`;
type FormGroupProps = {
  $isIndeterminate: boolean;
  $checked: boolean;
};
const FormGroup = styled.div<FormGroupProps>`
  display: block;
  margin-left: var(--spacing-xs);

  input {
    padding: 0;
    height: initial;
    width: initial;
    margin-bottom: 0;
    display: none;
    cursor: pointer;

    ${({ $isIndeterminate, $checked }) =>
      $isIndeterminate ? indeterminateStyles : $checked ? checkedStyles : ""}
  }

  label {
    position: relative;
    cursor: pointer;
    &::before {
      content: "";
      -webkit-appearance: none;
      background-color: transparent;
      border-radius: var(--spacing-xs);
      border: 1px solid var(--color-gray-1000);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05),
        inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
      padding: 8.5px;
      display: inline-block;
      position: relative;
      vertical-align: middle;
      cursor: pointer;
    }
  }
`;
