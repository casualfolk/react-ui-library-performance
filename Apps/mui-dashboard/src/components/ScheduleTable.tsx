import {
  Paper,
  Box,
  Typography,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Course } from '@/types/course';

interface ScheduleTableProps {
  courses: Course[];
}

export default function ScheduleTable({ courses }: ScheduleTableProps) {
  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">Schedule List</Typography>
        <Chip label={`${courses.length} Records`} color="primary" variant="outlined" />
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Code</strong></TableCell>
            <TableCell><strong>Course</strong></TableCell>
            <TableCell><strong>Day</strong></TableCell>
            <TableCell><strong>Time</strong></TableCell>
            <TableCell><strong>Room</strong></TableCell>
            <TableCell><strong>Lecturer</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id} hover>
              <TableCell>{course.code}</TableCell>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.day}</TableCell>
              <TableCell>{course.time}</TableCell>
              <TableCell>{course.room}</TableCell>
              <TableCell>{course.lecturer}</TableCell>
              <TableCell>
                <Chip
                  label={course.status}
                  color={
                    course.status === 'Active'
                      ? 'success'
                      : course.status === 'Pending'
                      ? 'warning'
                      : 'default'
                  }
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}