import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {createData, ReadOnlyRow} from "./ReadOnlyRow";
import dayjs from "dayjs";
import dynamic from 'next/dynamic';
const EditableRow = dynamic(() => import("./EditableRow"), {ssr: false});

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
    dayjs('2018-04-04T16:00:00.000Z'),
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
    dayjs('2018-04-04T16:00:00.000Z'),
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
  const [isAddMode, setAddMode] = React.useState(false);

  return (
    <Paper
      elevation={1}
      sx={{
        width: "60%",
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
            Raids
        </Typography>
        {
          !isAddMode &&
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setAddMode(true)}
          >
              Add
          </Button>
        }
      </Box>
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
              {
                isAddMode &&
                <EditableRow
                  onAccept={(raidInfo) => {
                    console.log(raidInfo);
                    setAddMode(false);
                  }}
                  onCancel={() => setAddMode(false)}
                />
              }
              {rows.map((row) => (
                <ReadOnlyRow key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </Paper>
  );
}