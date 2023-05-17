// @ts-nocheck
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
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';
import {RaidInfo} from "./types";


interface RaidDatePickerProps {
    value: Dayjs;
    onChange: (newValue: number) => void;
}

function RaidDatePicker({value, onChange}: RaidDatePickerProps) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Raid date"
                value={value}           // TODO check what is the problem that this value expects number not DayJs....
                onChange={onChange}
            />
        </LocalizationProvider>
      );
}


// TODO create value object with conversion methods
interface InternalRaidInfo {
    date: Dayjs;
    name: string;
    drops: Array<string>;
    people: Array<string>;
}


function createInternalRaidInfo(raidInfo?: RaidInfo): InternalRaidInfo  {
    return {
        date: dayjs(raidInfo?.date),
        name: raidInfo?.date || "",
        drops: raidInfo?.drops || [],
        people: raidInfo?.people || [],
    };
}

function toRaidInfo(internalRaidInfo: InternalRaidInfo): RaidInfo {
    return {
        date: internalRaidInfo.date.format(),      // TODO make sure it's saved as UTC
        name: internalRaidInfo.name,
        drops: internalRaidInfo.drops,
        people: internalRaidInfo.people,
    }
}


interface NameListEditRowProps {
    initName: string;
    forbiddenNames: Array<string>;
    onConfirm: (name: string) => void;
    onCancel: () => void;
}


function NameListEditRow({initName, forbiddenNames, onConfirm, onCancel}: NameListEditRowProps) {
    const [name, setName] = React.useState(initName);
    const [isForbidden, setForbidden] = React.useState(false);

    function onAccept() {
        if (name && !isForbidden) {
            onConfirm(name);
        }
    }

    return (
        <>
            <TextField
                autoFocus
                defaultValue={initName}
                error={isForbidden}
                onChange={(event) => {
                    const newName = event.target.value;
                    setName(newName);
                    setForbidden(forbiddenNames.includes(newName));
                }}
                onKeyPress= {(e) => {
                    if (e.key === 'Enter') {
                        onAccept();
                    }
                }}
             />
            <Button
                variant="contained"
                onClick={onAccept}
            >
                <DoneIcon />
            </Button>
            <Button
                variant="contained"
                color="error"
                onClick={() => {
                    onCancel();
                }}
            >
                <CloseIcon />
            </Button>
        </>
    )
}


interface NameListProps {
    names: Array<string>
    onChange: (names: Array<string>) => void
}


function NameList({names, onChange}: NameListProps) {
    const [isEditMode, setEditMode] = React.useState(false);

    function getAddButtonItem() {
        return (
            <ListItem>
                <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            setEditMode(true);
                        }}
                    >
                        Add
                </Button>
            </ListItem>
        )
    }

    function getEditItem() {
        return (
            <ListItem>
                <NameListEditRow
                    initName=""
                    forbiddenNames={names}
                    onConfirm={(newName) => {
                        onChange(names.concat(newName));
                        setEditMode(false);
                    }}
                    onCancel={() => setEditMode(false)}
                />
            </ListItem>
        )
    }

    return (
        <List>
            {names.map((name) => (<ListItem key={name}>{name}</ListItem>))}
            {
                isEditMode ? getEditItem() : getAddButtonItem()
            }
        </List>
    )
}


interface EditableRowProps {
    raidInfo?: RaidInfo;
    onAccept: (info: RaidInfo) => void;
    onCancel: () => void;
}


export default function EditableRow(props: EditableRowProps) {
    const [raidInfo, setRaidInfo] = React.useState(createInternalRaidInfo(props.raidInfo));

    return (
        <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell component="th" scope="row" align="left">
                <RaidDatePicker
                    value={raidInfo.date}
                    onChange={(newValue) => {
                        setRaidInfo({...raidInfo, date: newValue});
                    }}
                 />
            </TableCell>
            <TableCell align="left">
                <TextField
                    id="outlined-basic"
                    label="Raid name"
                    variant="outlined"
                    onChange={(event) => {setRaidInfo({...raidInfo, name: event.target.value});}}
                />
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
                <NameList
                    names={raidInfo.drops}
                    onChange={(newNames) => {
                        setRaidInfo({...raidInfo, drops: newNames})
                    }}
                />
                <Typography variant="h6" gutterBottom component="div">
                People
                </Typography>
                <NameList
                    names={raidInfo.people}
                    onChange={(newNames) => {
                        setRaidInfo({...raidInfo, people: newNames})
                    }}
                />
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
                    onClick={() => props.onCancel()}
                    >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {props.onAccept(toRaidInfo(raidInfo))}}
                    >
                    Add
                </Button>
            </Box>
            </TableCell>
        </TableRow>
        </React.Fragment>
    )
}
