import React from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  AccessTime as ClockIcon,
  CheckCircle as CheckCircleIcon,
  Medication as PillIcon,
  Notifications as BellIcon,
  RadioButtonUnchecked as PendingIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";

const doses = [
  { id: 1, med: "Sertralina", dose: "50mg - 1 cp", time: "08:00", taken: true },
  { id: 2, med: "Vitamina D", dose: "2000 UI - 1 gota", time: "12:30", taken: false },
  { id: 3, med: "Gliclazida", dose: "30mg - 1 cp", time: "20:00", taken: false },
];

export default function PatientDashboard() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: "text.primary",
            }}
          >
            Bom dia, João!
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
          >
            Aqui está sua agenda de medicamentos para hoje.
          </Typography>
        </Box>

        <IconButton color="primary">
          <BellIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 4px 12px rgba(0,0,0,.05)",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontWeight: 700,
                  }}
                >
                  Adesão Semanal
                </Typography>

                <TrendingUpIcon color="success" />
              </Box>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: "primary.main",
                }}
              >
                94%
              </Typography>

              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={94}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: "0 4px 12px rgba(0,0,0,.05)",
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Próxima Dose
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                }}
              >
                12:30
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
              >
                Vitamina D
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        Cronograma do Dia
      </Typography>

      <Card
        sx={{
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        <List disablePadding>
          {doses.map((dose, index) => (
            <React.Fragment key={dose.id}>
              <ListItem
                sx={{
                  py: 2.5,
                  px: 3,
                  bgcolor: dose.taken
                    ? "rgba(0,200,83,.04)"
                    : "transparent",
                  opacity: dose.taken ? 0.7 : 1,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: "primary.light",
                      color: "primary.main",
                    }}
                  >
                    <PillIcon />
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      {dose.med}
                    </Typography>
                  }
                  secondary={dose.dose}
                />

                <Box
                  sx={{
                    textAlign: "right",
                    mr: 3,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: "text.secondary",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <ClockIcon fontSize="small" />
                    {dose.time}
                  </Typography>
                </Box>

                <IconButton
                  color={dose.taken ? "success" : "default"}
                  size="large"
                >
                  {dose.taken ? (
                    <CheckCircleIcon fontSize="large" />
                  ) : (
                    <PendingIcon fontSize="large" />
                  )}
                </IconButton>
              </ListItem>

              {index < doses.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Card>
    </Container>
  );
}