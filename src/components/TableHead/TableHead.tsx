import { CheckBox } from "@components/CheckBox/CheckBox";
import { FunctionComponent } from "react";
import downloadArrow from "@assets/download-arrow-svgrepo-com.svg";
import { DownloadButton, Typography } from "@/App.styled";

export type TableHeadProps = {
  selectAll: boolean;
  isIndeterminate: boolean;
  selectedRowNames: Set<string>;
  handleSelectAllChange: () => void;
  handleDownloadSelected: () => void;
};

export const TableHead: FunctionComponent<TableHeadProps> = ({
  selectAll,
  isIndeterminate,
  selectedRowNames,
  handleSelectAllChange,
  handleDownloadSelected,
}) => {
  return (
    <thead>
      <tr>
        <th>
          <CheckBox
            checked={selectAll}
            onChange={handleSelectAllChange}
            isIndeterminate={isIndeterminate}
          />
        </th>
        <th>
          <span>
            {selectedRowNames.size
              ? `Selected ${selectedRowNames.size}`
              : "None Selected"}
          </span>
        </th>
        <th>
          <DownloadButton
            onClick={handleDownloadSelected}
            data-testid="download-button"
          >
            <img src={downloadArrow} alt="Download file icon" />
            <span>Download Selected</span>
          </DownloadButton>
        </th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th></th>
        <th>
          <Typography $paddingInline="3ch">Name</Typography>
        </th>
        <th>
          <Typography $paddingInline="3ch">Device</Typography>
        </th>
        <th>Path</th>
        <th>Status</th>
      </tr>
    </thead>
  );
};
