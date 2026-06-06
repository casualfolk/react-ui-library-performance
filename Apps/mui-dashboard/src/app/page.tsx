import { Container, Box, Typography } from '@mui/material';
import DashboardHeader from '@/components/DashboardHeader';
import SummaryCards from '@/components/SummaryCards';
import FilterBar from '@/components/FilterBar';
import ScheduleTable from '@/components/ScheduleTable';
import coursesData from '@/data/courses.json';
import { Course } from '@/types/course';

export default function Home() {
  const courses = coursesData as Course[];

  return (
    <>
      <DashboardHeader />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor course schedules, rooms, and lecturer assignments.
          </Typography>
        </Box>

        <SummaryCards />
        <FilterBar />
        <ScheduleTable courses={courses} />
      </Container>
    </>
  );
}