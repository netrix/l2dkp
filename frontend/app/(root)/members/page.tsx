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
import { useGetMembersQuery } from '@/redux/services/membersApi';
// import EditableRow from "./components/EditableRow";
// import {RaidInfo} from "./components/types";
import RefreshIcon from '@mui/icons-material/Refresh';
import { MemberInfo } from './components/types';

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
    // onAddButtonClick: () => void;
    // onRefreshButtonClick: () => void;
}


// function MembersPageHeader({showAddButton, onAddButtonClick, onRefreshButtonClick}: RaidsPageHeaderProps) {
  function MembersPageHeader({showAddButton}: RaidsPageHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: "center",
        padding: 1,
      }}
    >
      <Typography variant="h6" gutterBottom component="div">
          Members
      </Typography>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'right',
        }}
      >
        {/* <Button
          variant="contained"
          color="secondary"
          onClick={onRefreshButtonClick}
          sx={{
            marginRight: 1
          }}
        >
            <RefreshIcon />
        </Button>
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
        } */}
      </div>
    </Box>
  )
}


function MembersTableHead() {
  return (
    <ThemeProvider theme={theme}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell align="right">Raids</TableCell>
          <TableCell align="right">Last raid</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
    </ThemeProvider>
  )
}


interface MembersTableBodyProps {
  members: Array<MemberInfo>;
  // isAddMode: boolean;
  // onMemberEditAccept: (raidInfo: RaidInfo) => void;
  // onMemberEditCancel: () => void;
}


// function MembersTableBody({raids, isAddMode, onMemberEditAccept: onRaidEditAccept, onMemberEditCancel: onRaidEditCancel}: MembersTableBodyProps) {
  function MembersTableBody({members}: MembersTableBodyProps) {
  return (
    <>
      {/* {
        isAddMode &&
        <EditableRow
          onAccept={onRaidEditAccept}
          onCancel={onRaidEditCancel}
        />
      } */}
      {members.map((row) => (
        <ReadOnlyRow key={row.name} memberInfo={row} />
      ))}
    </>
  )
}


function MembersTableBodyError({message}: {message: string}) {
  return (
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell scope="row" align="left">
        <p>Oh no, there was an error {message}</p>
      </TableCell>
    </TableRow>
  );
}


function MembersTableBodyLoading() {
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
  // const [addNewRaid, response] = useAddNewRaidMutation();
  // const [refreshRaids, refreshResponse] = useRefreshRaidsMutation();  // TODO  fetch members!!!!

  const { isLoading, isFetching, data, error } = useGetMembersQuery(null);

  // function onRaidEditAccept(raidInfo: RaidInfo) {
  //   addNewRaid(raidInfo)
  //     .unwrap()
  //     .then(() => {})
  //     .then((error: any) => {
  //       console.log("addNewRaid:", error);
  //     });
  //   setAddMode(false);
  // }

  // TODO don't remove entire table when fetching..., update only  content...
  return (
    <Paper
      elevation={1}
      sx={{
        width: "60%",
      }}
    >
      <MembersPageHeader
        showAddButton={!isAddMode && !isLoading && !isLoading && !error}
        // onAddButtonClick={() => setAddMode(true)}
        // onRefreshButtonClick={() => refreshRaids(null)}
      />
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <MembersTableHead />
          <TableBody>
            {
              error ? (
                <MembersTableBodyError message={JSON.stringify(error)} />
              ) : isLoading || isFetching ? (
                <MembersTableBodyLoading />
              ) : data ? (
                <MembersTableBody
                  members={data}
                  // isAddMode={isAddMode}
                  // onMemberEditAccept={onRaidEditAccept}
                  // onMemberEditCancel={() => setAddMode(false)}
                />
              ) : null
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}