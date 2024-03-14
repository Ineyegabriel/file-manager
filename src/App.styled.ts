import styled from "styled-components";

export const PageContainer = styled.div`
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  position: relative;
  overflow: scroll;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-inline: 1px solid var(--color-gray-200);
  -webkit-box-shadow: 0px 4px 11px -1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 4px 11px -1px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 4px 11px -1px rgba(0, 0, 0, 0.5);

  th,
  td {
    padding: var(--spacing-sm);
    text-align: left;
    border-block: 1px solid var(--color-gray-200);
  }

  thead {
    tr {
      th {
        padding-top: var(--spacing-md);
      }
      &:first-child {
        font-size: large;
      }
    }
  }

  tbody {
    tr {
      &:hover {
        background-color: var(--color-gray-100);
      }
      td {
        text-transform: capitalize;
        padding-top: 16px;
        span {
          display: flex;
          align-items: center;
        }
      }
    }
  }
`;

export const Typography = styled.span<{ $paddingInline?: string }>`
  padding-inline: ${({ $paddingInline }) => $paddingInline || "0"};
`;

export const Checkbox = styled.input`
  &:indeterminate {
    accent-color: red;
  }
`;

export const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  img {
    margin-top: -4px;
    width: var(--spacing-md);
  }
`;
