import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  IconButton,
  Paper,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Link from "next/link";

const DataTable = ({ columns, data, editUrl, onDelete, inspectUrl }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to the first page on search
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page on rows per page change
  };

  // Helper function to safely access nested data
  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, part) => acc && acc[part], obj);
  };

  const getDate = (date) => {
    console.log("date", date);
    if (!date) return "Not Defined";

    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const newDate = new Date(date);
    return (
      newDate.getFullYear() +
      "-" +
      month[newDate.getMonth()] +
      "-" +
      newDate.getDate()
    );
  };

  const filteredData = data.filter((item) =>
    columns.some((column) =>
      getNestedValue(item, column.accessor)
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
  );

  // Paginate the filtered data
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 200 }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#333", color: "#fff" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.accessor}
                  style={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "#fff",
                    padding: "8px 16px",
                  }}
                >
                  <TableSortLabel style={{ color: "#fff" }}>
                    {column.Header}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "#fff",
                  padding: "8px 16px",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.accessor}
                    style={{ padding: "8px 16px" }}
                  >
                    {column.Cell
                      ? column.Cell({
                          value: getNestedValue(row, column.accessor),
                          row,
                        })
                      : column.accessor === "inspection_date"
                      ? getDate(getNestedValue(row, column.accessor))
                      : getNestedValue(row, column.accessor)}
                  </TableCell>
                ))}
                <TableCell style={{ padding: "8px 16px", display: "flex" }}>
                  <Link href={editUrl + row.id}>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                  </Link>

                  <IconButton
                    onClick={() => onDelete(row)}
                    color="secondary"
                    style={{ marginLeft: 8 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Link href={inspectUrl + row.id}>
                    <IconButton
                      // onClick={() => onInspect(row.id)}
                      color="default"
                      style={{ marginLeft: 8 }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default DataTable;
