import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {createData, ReadOnlyRow} from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontWeight: "bold"
        }
      }
    }
  },
});




const rows = [
  createData(
    "Baium",
    new Date(),
    [
      "DarkNetrix",
      "NetrixDSS",
    ],
    [
      "Majestic Robe",
      "Majestic Gauntlets"
    ]
  ),
  createData(
    "Valakas",
    new Date(),
    [
      "Sheldon",
      "NetrixDSS",
    ],
    [
      "Nightmare Robe",
      "Nightmare Gauntlets"
    ]
  )
];



export default function RaidsTable() {
    return (
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <ThemeProvider theme={theme}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Date</TableCell>
                  <TableCell>Raid name</TableCell>
                  <TableCell align="right">Drops</TableCell>
                  <TableCell align="right">People</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
            </ThemeProvider>
            <TableBody>
              <EditableRow />
              {rows.map((row) => (
                <ReadOnlyRow key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
};