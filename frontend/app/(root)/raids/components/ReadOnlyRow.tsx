import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {RaidInfo} from "./types";


export default function ReadOnlyRow({raidInfo}: { raidInfo: RaidInfo }) {
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell component="th" scope="row">
            {/* TODO use import { Dayjs } from "dayjs"; to provide correct date in UI*/}
            {raidInfo.date}
          </TableCell>
          <TableCell align="left">{raidInfo.name}</TableCell>
          <TableCell align="right">{raidInfo.drops.length}</TableCell>
          <TableCell align="right">{raidInfo.people.length}</TableCell>
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
                  {raidInfo.drops.map((drop) => (<ListItem key={drop}>{drop}</ListItem>))}
                </List>
                <Typography variant="h6" gutterBottom component="div">
                  People
                </Typography>
                <List>
                  {raidInfo.people.map((person) => (<ListItem key={person}>{person}</ListItem>))}
                </List>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
}