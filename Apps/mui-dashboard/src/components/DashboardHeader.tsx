'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const NAV_LINKS = ['Dashboard', 'Schedules', 'Lecturers', 'Settings'];

export default function DashboardHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Course Scheduler
          </Typography>

          {isMobile ? (
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {NAV_LINKS.map((link) => (
                <Typography
                  key={link}
                  component="button"
                  sx={{
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                  }}
                >
                  {link}
                </Typography>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220, pt: 2 }}>
          <Typography variant="subtitle1" sx={{ px: 2, pb: 1, fontWeight: 700 }}>
            Navigation
          </Typography>
          <List>
            {NAV_LINKS.map((link) => (
              <ListItem key={link} onClick={() => setDrawerOpen(false)} sx={{ cursor: 'pointer' }}>
                <ListItemText primary={link} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}