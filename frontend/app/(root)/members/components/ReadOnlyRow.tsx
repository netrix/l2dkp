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
import {MemberInfo, RaidInfo} from "./types";


export default function ReadOnlyRow({memberInfo}: { memberInfo: MemberInfo }) {
    const [open, setOpen] = React.useState(false);

    const raids = [...memberInfo.raids].sort((first: RaidInfo, second: RaidInfo) => first.date.localeCompare(second.date));
    const lastRaid = raids.slice(-1)[0];

    // TODO print only date, not datetime

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell align="left">{memberInfo.name}</TableCell>
          <TableCell align="right">{memberInfo.raids.length}</TableCell>
          <TableCell align="right">{`${lastRaid.name} (${lastRaid.date})`}</TableCell>
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
                  Raids
                </Typography>
                <List>
                  {raids.map((raid) => (<ListItem key={raid.id}>{raid.name} - {raid.date}</ListItem>))}
                </List>
                <Typography variant="h6" gutterBottom component="div">
                  Aliases
                </Typography>
                <List>
                  {/* {raidInfo.people.map((person) => (<ListItem key={person}>{person}</ListItem>))} */}
                </List>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    )
}