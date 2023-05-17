'use client'
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
import { createData, ReadOnlyRow } from "./components/ReadOnlyRow";
import dayjs from "dayjs";
import EditableRow, {RaidInfo} from "./components/EditableRow";

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


interface RaidsPageHeaderProps {
    showAddButton: boolean;
    onAddButtonClick: () => void;
}


function RaidsPageHeader({showAddButton, onAddButtonClick}: RaidsPageHeaderProps) {
  return (
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
        showAddButton &&
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={onAddButtonClick}
        >
            Add
        </Button>
      }
    </Box>
  )
}


function RaidsTableHead() {
  return (
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
  )
}


interface RaidsTableBodyProps {
  raids: Array<RaidInfo>;
  isAddMode: boolean;
  onRaidEditAccept: (raidInfo: RaidInfo) => void;
  onRaidEditCancel: () => void;
}


function RaidsTableBody({raids, isAddMode, onRaidEditAccept, onRaidEditCancel}: RaidsTableBodyProps) {
  return (
    <TableBody>
      {
        isAddMode &&
        <EditableRow
          onAccept={onRaidEditAccept}
          onCancel={onRaidEditCancel}
        />
      }
      {raids.map((row) => (
        <ReadOnlyRow key={row.name} row={row} />
      ))}
    </TableBody>
  )
}


export default function Home() {
  const [isAddMode, setAddMode] = React.useState(false);

  return (
    <Paper
      elevation={1}
      sx={{
        width: "60%",
      }}
    >
      <RaidsPageHeader
        showAddButton={!isAddMode}
        onAddButtonClick={() => setAddMode(true)}
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <RaidsTableHead />
          <RaidsTableBody
            raids={rows}
            isAddMode={isAddMode}
            onRaidEditAccept={(raidInfo) => {
              console.log(raidInfo);
              setAddMode(false);
            }}
            onRaidEditCancel={() => setAddMode(false)}
          />
        </Table>
      </TableContainer>
    </Paper>
  );
}