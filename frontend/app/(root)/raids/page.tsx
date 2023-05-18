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
import ReadOnlyRow from "./components/ReadOnlyRow";
import { useGetRaidsQuery, useAddNewRaidMutation } from '@/redux/services/raidsApi';
import EditableRow from "./components/EditableRow";
import {RaidInfo} from "./components/types";

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
    <>
      {
        isAddMode &&
        <EditableRow
          onAccept={onRaidEditAccept}
          onCancel={onRaidEditCancel}
        />
      }
      {raids.map((row) => (
        <ReadOnlyRow key={row.name} raidInfo={row} />
      ))}
    </>
  )
}


function RaidsTableBodyError({message}: {message: string}) {
  return (
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell scope="row" align="left">
        <p>Oh no, there was an error {message}</p>
      </TableCell>
    </TableRow>
  );
}


function RaidsTableBodyLoading() {
  return (
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell scope="row" align="left">
        <p>Loading...</p>
      </TableCell>
    </TableRow>
  )
}


export default function Home() {
  const [isAddMode, setAddMode] = React.useState(false);
  const [addNewRaid, response] = useAddNewRaidMutation();

  const { isLoading, isFetching, data, error } = useGetRaidsQuery(null);

  function onRaidEditAccept(raidInfo: RaidInfo) {
    addNewRaid(raidInfo)
      .unwrap()
      .then(() => {})
      .then((error: any) => {
        console.log("addNewRaid:", error);
      });
    setAddMode(false);
  }

  return (
    <Paper
      elevation={1}
      sx={{
        width: "60%",
      }}
    >
      <RaidsPageHeader
        showAddButton={!isAddMode && !isLoading && !isLoading && !error}
        onAddButtonClick={() => setAddMode(true)}
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <RaidsTableHead />
          <TableBody>
            {
              error ? (
                <RaidsTableBodyError message={JSON.stringify(error)} />
              ) : isLoading || isFetching ? (
                <RaidsTableBodyLoading />
              ) : data ? (
                <RaidsTableBody
                  raids={data}
                  isAddMode={isAddMode}
                  onRaidEditAccept={onRaidEditAccept}
                  onRaidEditCancel={() => setAddMode(false)}
                />
              ) : null
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}