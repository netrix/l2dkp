import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';


interface RaidDatePickerProps {
    value: Date;
    onChange: (newValue: number) => void;
}

function RaidDatePicker({value, onChange}: RaidDatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Raid date"
                value={value}
                onChange={onChange}
            />
        </LocalizationProvider>
      );
}


interface RaidInfo {
    date: Date;
    name: string;
    drops: Array<string>;
    people: Array<string>;
}


function createNewRaidInfo()  {
    return {
        date: new Date(),
        name: "",
        drops: [],
        people: [],
    };
}


interface EditableRowProps {
    raidInfo?: RaidInfo;
}


export default function EditableRow(props: EditableRowProps) {
    const [raidInfo, setRaidInfo] = React.useState(props.raidInfo || createNewRaidInfo());

    return (
        <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row" align="left">
                <RaidDatePicker
                    value={raidInfo.date}
                    onChange={(newValue) => {}}
                 />
            </TableCell>
            <TableCell align="left">
                <TextField id="outlined-basic" label="Raid name" variant="outlined" />
            </TableCell>
            <TableCell align="right">{raidInfo.drops.length}</TableCell>
            <TableCell align="right">{raidInfo.people.length}</TableCell>
        </TableRow>
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                Drops
                </Typography>
                <List>
                {raidInfo.drops.map((drop) => (<ListItem key={drop}>{drop}</ListItem>))}
                <ListItem>
                    <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                        >
                            Add
                    </Button>
                </ListItem>
                </List>
                <Typography variant="h6" gutterBottom component="div">
                People
                </Typography>
                <List>
                {raidInfo.people.map((person) => (<ListItem key={person}>{person}</ListItem>))}
                </List>
                <ListItem>
                    <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                        >
                            Add
                    </Button>
                </ListItem>
            </Box>
            <Box
                sx={{
                    margin: "16px",
                    display: "flex",
                    justifyContent: "right",
                }}
            >
                <Button
                    variant="contained"
                    color="error"
                    >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    >
                    Add
                </Button>
            </Box>
            </TableCell>
        </TableRow>
        </React.Fragment>
    )
}
