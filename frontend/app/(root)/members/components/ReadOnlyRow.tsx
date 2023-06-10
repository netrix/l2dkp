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
import {MemberInfo} from "./types";


export default function ReadOnlyRow({memberInfo}: { memberInfo: MemberInfo }) {
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell align="left">{memberInfo.name}</TableCell>
          <TableCell align="right">{memberInfo.num_raids}</TableCell>
          <TableCell align="right">{"last_raid_placeholder"}</TableCell>
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
                  {/* {raidInfo.drops.map((drop) => (<ListItem key={drop}>{drop}</ListItem>))} */}
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