import { data } from "@mocks/mock-data";
import "./App.css";
import { PageContainer, Table } from "./App.styled";

import { TableRow } from "@components/TableRow/TableRow";
import useTableSelection, { DataItem } from "./hooks/useTableSelection";
import { TableHead } from "@components/TableHead/TableHead";

function App() {
  const {
    selectedRowNames,
    selectAll,
    handleCheckboxChange,
    handleSelectAllChange,
    handleDownloadSelected,
  } = useTableSelection(data as DataItem[]);

  const isIndeterminate =
    selectedRowNames.size > 0 && selectedRowNames.size < data.length;

  return (
    <PageContainer>
      <Table data-testid="data-table">
        <TableHead
          selectAll={selectAll}
          isIndeterminate={isIndeterminate}
          selectedRowNames={selectedRowNames}
          handleSelectAllChange={handleSelectAllChange}
          handleDownloadSelected={handleDownloadSelected}
        />
        <tbody>
          {data.map((item, index) => (
            <TableRow
              key={index}
              item={item}
              isChecked={selectedRowNames.has(item.name)}
              handleCheckboxChange={() => handleCheckboxChange(item.name)}
              index={index}
            />
          ))}
        </tbody>
      </Table>
    </PageContainer>
  );
}

export default App;
