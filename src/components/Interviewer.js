import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Avatar, Stack } from "@mui/material";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Slide from "@mui/material/Slide";

const columns = [
  { id: "time", label: "Time Slot", minWidth: 170 },
  { id: "Interviews", label: "Interviews", minWidth: 100 },
  {
    id: "availability",
    label: "Availability",
    minWidth: 170,
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  { time: "9:00-9:30", Interviews: "Interviewer 1", availability: "Available" },
];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "30%",
}));

export default function Interviewer() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <Stack direction="row" spacing={2}>
      <Box sx={{ width: "50%", marginLeft: "5%" }}>
        <Avatar
          sx={{ margin: "10% 0 10% 20%", width: 150, height: 150 }}
        ></Avatar>
        <Stack direction="column" spacing={4}>
          <Stack direction="row" spacing={4}>
            <Item>Name</Item>
            <Item>Track</Item>
          </Stack>
          <Stack direction="row" spacing={4}>
            <Item>Interviews taken</Item>
            <Item>Interviews remaining</Item>
          </Stack>
        </Stack>
      </Box>
      <div style={{ marginTop: "10%", width: "40%" }}>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </Stack>
  );
}
