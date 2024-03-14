import React, { useState } from "react";
import { CheckBox } from "@components/CheckBox/CheckBox";
import { PageContainer, StatusText, TableBody, Typography } from "./App.styled";
import { data } from "@mocks/mock-data";

type FileData = {
  name: string;
  device: string;
  path: string;
  status: string;
};

const TableRow: React.FC<{
  item: FileData;
  isChecked: boolean;
  handleCheckboxChange: () => void;
}> = ({ item, isChecked, handleCheckboxChange }) => {
  return (
    <tr style={{ background: isChecked ? "#e6f7ff" : "transparent" }}>
      <td>
        <input
          type="checkbox"
          value={item.name}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </td>
      <td data-label="Name">
        <Typography $paddingInline="3.5ch">{item.name}</Typography>
      </td>
      <td data-label="Device">
        <Typography $paddingInline="3ch">{item.device}</Typography>
      </td>
      <td data-label="Path">
        <span>{item.path}</span>
      </td>
      <td data-label="Status">
        <StatusText $isAvailable={item.status === "available"}>
          {item.status}
        </StatusText>
      </td>
    </tr>
  );
};

const App: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  const handleCheckboxChange = (name: string) => {
    let newSelectedItems: string[];

    if (selectedItems.includes(name)) {
      newSelectedItems = selectedItems.filter((item) => item !== name);
    } else {
      newSelectedItems = [...selectedItems, name];
    }

    setSelectedItems(newSelectedItems);

    if (newSelectedItems.length === data.length) {
      setSelectAll(true);
    } else if (newSelectedItems.length === 0) {
      setSelectAll(false);
    } else {
      setSelectAll(false);
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems([]);
      setSelectAll(false);
    } else {
      const allNames = data.map((item) => item.name);
      setSelectedItems(allNames);
      setSelectAll(true);
    }
  };

  const handleDownloadSelected = () => {
    const selectedFiles = data.filter((item) =>
      selectedItems.includes(item.name)
    );
    const message = selectedFiles
      .map((file) => `Path: ${file.path}, Device: ${file.device}`)
      .join("\n");
    alert(message);
  };

  return (
    <PageContainer>
      <TableBody>
        <table>
          <thead>
            <tr>
              <th>
                <CheckBox
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  isIndeterminate={selectAll === undefined}
                />
              </th>
              <th>
                <span>
                  {selectedItems.length
                    ? `Selected ${selectedItems.length}`
                    : "None Selected"}
                </span>
              </th>
              <th>
                <button onClick={handleDownloadSelected}>
                  Download Selected
                </button>
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
          <tbody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                item={item}
                isChecked={selectedItems.includes(item.name)}
                handleCheckboxChange={() => handleCheckboxChange(item.name)}
              />
            ))}
          </tbody>
        </table>
      </TableBody>
    </PageContainer>
  );
};

export default App;
