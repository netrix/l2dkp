import * as React from 'react';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';


interface StyledMuiAppBarProps extends MuiAppBarProps {
    open?: boolean;
    drawerWidth?: number;
}

const StyledMuiAppBar = styled(MuiAppBar, {shouldForwardProp: (prop) => prop !== 'open' && prop !== 'drawerWidth'})<StyledMuiAppBarProps>(({ theme, open, drawerWidth }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));


interface AppBarProps {
    drawerWidth: number;
    showMenuButton: boolean;
    onMenuButtonClick: () => void;
}


export default function AppBar({drawerWidth, showMenuButton, onMenuButtonClick}: AppBarProps) {
    return (
        <StyledMuiAppBar
            position="fixed"
            open={showMenuButton}
            drawerWidth={drawerWidth}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onMenuButtonClick}
                edge="start"
                sx={{ mr: 2, ...(showMenuButton && { display: 'none' }) }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
                L2 dkp
            </Typography>
            </Toolbar>
        </StyledMuiAppBar>
    )
}