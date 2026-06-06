import { Box, TextField, MenuItem, Button, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  dayFilter: string;
  onDayFilterChange: (value: string) => void;
  onAddClick: () => void;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function FilterBar({
  searchQuery,
  onSearchChange,
  dayFilter,
  onDayFilterChange,
  onAddClick,
}: FilterBarProps) {
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
        <TextField
          fullWidth
          label="Search course, lecturer..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
        />

        <TextField
          select
          fullWidth
          label="Filter by day"
          value={dayFilter}
          onChange={(e) => onDayFilterChange(e.target.value)}
        >
          <MenuItem value="">All Days</MenuItem>
          {DAYS.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          fullWidth
          sx={{ height: '56px', fontWeight: 600 }}
          startIcon={<AddIcon />}
          onClick={onAddClick}
        >
          Add Schedule
        </Button>
      </Box>
    </Paper>
  );
}