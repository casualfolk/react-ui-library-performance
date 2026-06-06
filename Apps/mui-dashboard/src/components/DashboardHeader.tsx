import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export default function DashboardHeader() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Course Scheduler
        </Typography>

        <Button color="inherit">Dashboard</Button>
        <Button color="inherit">Schedules</Button>
        <Button color="inherit">Lecturers</Button>
        <Button color="inherit">Settings</Button>
      </Toolbar>
    </AppBar>
  );
}