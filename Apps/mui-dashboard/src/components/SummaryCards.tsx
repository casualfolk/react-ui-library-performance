import { Grid, Card, CardContent, Typography } from '@mui/material';

export default function SummaryCards() {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Total Courses
            </Typography>
            <Typography variant="h4">24</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Total Lecturers
            </Typography>
            <Typography variant="h4">12</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Card elevation={2}>
          <CardContent>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Available Rooms
            </Typography>
            <Typography variant="h4">8</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}