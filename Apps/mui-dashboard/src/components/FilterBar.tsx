import { Box, TextField, MenuItem, Button, Paper } from '@mui/material';

export default function FilterBar() {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1.5fr 1fr' },
          gap: 2,
          alignItems: 'center',
        }}
      >
        <TextField fullWidth label="Search course" variant="outlined" />

        <TextField select fullWidth label="Filter by day" defaultValue="">
          <MenuItem value="">All Days</MenuItem>
          <MenuItem value="Monday">Monday</MenuItem>
          <MenuItem value="Tuesday">Tuesday</MenuItem>
          <MenuItem value="Wednesday">Wednesday</MenuItem>
          <MenuItem value="Thursday">Thursday</MenuItem>
          <MenuItem value="Friday">Friday</MenuItem>
        </TextField>

        <Button variant="contained" fullWidth sx={{ height: '56px' }}>
          Add Schedule
        </Button>
      </Box>
    </Paper>
  );
}