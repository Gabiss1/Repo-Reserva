import React from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip,
  Avatar,
  Button,
  TextField,
  InputAdornment,
  LinearProgress
} from '@mui/material';
import { 
  Search as SearchIcon, 
  PersonAdd as PersonAddIcon,
  Group as GroupIcon,
  Assessment as ChartIcon,
  WarningAmber as WarningIcon
} from '@mui/icons-material';

const patients = [
  { id: 1, name: "Arnaldo Antunes", info: "Hipertensão • 62 anos", status: "Em dia", adherence: 85 },
  { id: 2, name: "Beatriz Ferreira", info: "Diabetes Tipo 2 • 45 anos", status: "Atrasado", adherence: 42 },
  { id: 3, name: "Carlos Silveira", info: "Pós-Operatório • 29 anos", status: "Alerta", adherence: 68 },
];

export const InstitutionDashboard: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>Gestão Clínica</Typography>
          <Typography color="text.secondary">Acompanhamento em tempo real dos seus pacientes.</Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<PersonAddIcon />}
          sx={{ borderRadius: 3, px: 3, py: 1.2 }}
        >
          Novo Paciente
        </Button>
      </Box>

      {/* Ajuste: Uso de 'size' em vez de props booleanas 'item' */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Pacientes Ativos', val: '128', icon: <GroupIcon />, color: '#72b5e8' },
          { label: 'Adesão Média', val: '76%', icon: <ChartIcon />, color: '#2e7d32' },
          { label: 'Pacientes em Alerta', val: '12', icon: <WarningIcon />, color: '#d32f2f' },
        ].map((stat, i) => (
          <Grid size={{ xs: 12, md: 4 }} key={i}>
            <Card sx={{ borderRadius: 4, boxShadow: 'none', border: '1px solid #eee' }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>{stat.icon}</Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary" fontWeight={700}>{stat.label}</Typography>
                  <Typography variant="h4" fontWeight={800}>{stat.val}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 2 }}>
        <TextField 
          fullWidth 
          placeholder="Buscar pacientes por nome ou CPF..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: 'white' } }}
        />
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: 'none', border: '1px solid #eee' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f9f9f9' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>PACIENTE</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>ADESÃO</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700 }}>AÇÕES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: '#72b5e8', color: 'white' }}>{patient.name[0]}</Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={700}>{patient.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{patient.info}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={patient.status} 
                    color={patient.status === 'Em dia' ? 'success' : patient.status === 'Alerta' ? 'warning' : 'error'}
                    size="small"
                    sx={{ fontWeight: 700, borderRadius: 2 }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: '100px', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={patient.adherence} 
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                    <Typography variant="body2" fontWeight={700}>{patient.adherence}%</Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Button size="small">Prontuário</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};