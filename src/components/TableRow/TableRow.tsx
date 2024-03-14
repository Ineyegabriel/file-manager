import { Typography } from "@/App.styled";
import React from "react";
import styled from "styled-components";

export type TableRowProps = {
  item: {
    name: string;
    device: string;
    path: string;
    status: string;
  };
  isChecked: boolean;
  index: number;
  handleCheckboxChange: () => void;
};

export const StatusRecord = {
  available: "available",
  scheduled: "scheduled",
} as const;

export const TableRow = React.memo(
  ({ item, handleCheckboxChange, isChecked, index }: TableRowProps) => {
    const lowerCaseStatus =
      item.status.toLowerCase() as keyof typeof StatusRecord;
    return (
      <StyledTableRow $isChecked={isChecked}>
        <td>
          <Input
            data-testid={`checkbox-${index}`}
            type="checkbox"
            value={item.name}
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </td>
        <td data-label="Name">
          <Typography $paddingInline="3ch">{item.name}</Typography>
        </td>
        <td data-label="Device">
          <Typography $paddingInline="3ch">{item.device}</Typography>
        </td>
        <td data-label="Path">
          <span>{item.path}</span>
        </td>
        <td data-label="Status">
          <StatusText $isAvailable={StatusRecord.available === lowerCaseStatus}>
            {item.status}
          </StatusText>
        </td>
      </StyledTableRow>
    );
  }
);

const StyledTableRow = styled.tr<{ $isChecked: boolean }>`
  ${({ $isChecked }) => $isChecked && `background: var(--color-gray-400)`};
`;

const StatusText = styled.span<{ $isAvailable: boolean }>`
  display: flex;
  align-items: center;
  &::before {
    ${({ $isAvailable }) => $isAvailable && `content: " "`};
    background: var(--color-secondary-500);
    width: var(--spacing-md);
    display: inline-block;
    height: var(--spacing-md);
    border-radius: 100%;
    position: absolute;
    margin-top: -8px;
    margin-left: -24px;
  }
`;

const Input = styled.input`
  width: 18px;
  height: 18px;
`;
