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
    <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: { xs: 'stretch', sm: 'center' },
        }}
      >
        {/* Search */}
        <TextField
          fullWidth
          label="Search course, lecturer..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          size="small"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ flex: { sm: 2 } }}
        />

        {/* Day filter */}
        <TextField
          select
          fullWidth
          label="Filter by day"
          value={dayFilter}
          onChange={(e) => onDayFilterChange(e.target.value)}
          size="small"
          sx={{ flex: { sm: 1.5 } }}
        >
          <MenuItem value="">All Days</MenuItem>
          {DAYS.map((day) => (
            <MenuItem key={day} value={day}>
              {day}
            </MenuItem>
          ))}
        </TextField>

        {/* Add button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          sx={{
            height: { xs: '40px', sm: '40px' },
            whiteSpace: 'nowrap',
            flexShrink: 0,
            fontWeight: 600,
          }}
        >
          Add Schedule
        </Button>
      </Box>
    </Paper>
  );
}