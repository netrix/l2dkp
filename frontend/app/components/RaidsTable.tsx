import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


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

function createData(
    name: string,
    date: Date,
    people: Array<string>,
    drops: Array<string>,
  ) {
    return {
      name,
      date,
      people,
      drops,
    };
  }


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

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell component="th" scope="row">
            {row.date.toLocaleDateString()}
          </TableCell>
          <TableCell align="left">{row.name}</TableCell>
          <TableCell align="right">{row.drops.length}</TableCell>
          <TableCell align="right">{row.people.length}</TableCell>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Drops
                </Typography>
                <List>
                  {row.drops.map((drop) => (<ListItem key={drop}>{drop}</ListItem>))}
                </List>
                <Typography variant="h6" gutterBottom component="div">
                  People
                </Typography>
                <List>
                  {row.drops.map((person) => (<ListItem key={person}>{person}</ListItem>))}
                </List>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
  }


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
              {rows.map((row) => (
                <Row key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    );
};