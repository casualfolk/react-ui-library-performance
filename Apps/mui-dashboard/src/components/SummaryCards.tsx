import { Grid, Card, CardContent, Typography } from '@mui/material';

const cards = [
  { label: 'Total Courses', value: 24 },
  { label: 'Total Lecturers', value: 12 },
  { label: 'Available Rooms', value: 8 },
];

export default function SummaryCards() {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: { xs: 2, md: 4 } }} columns={12}>
      {cards.map((card) => (
        <Grid key={card.label} size={{ xs: 12, sm: 4 }}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }} gutterBottom>
                {card.label}
              </Typography>
              <Typography variant="h4" sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}>
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}