import { Paper, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { theme } from '../styles/styles';
import { useDispatch, useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2rem',
}));

const selectedStyle = {
  backgroundColor: theme.palette.secondary.light,
};

const selectedFont = {
  color: '#1A2027',
};

const TimeSlotDetail = ({ handleDisabled }) => {
  const dispatch = useDispatch();
  const { slot } = useSelector(({ selection }) => selection);
  const [selectedId, setSelectedId] = useState(null);
  const selection =
    slot?.available.find((item) => item.id === selectedId) ?? null;

  const handleClick = (id, name, email) => {
    setSelectedId(null);
    setSelectedId(id);
    handleDisabled();
  };

  return (
    <>
      {slot?.available && (
        <Container sx={{ mt: 2, mb: 2 }}>
          <Stack spacing={2}>
            <Typography variant="h6" align="center">
              Available Barbers
            </Typography>
            {slot.available.map((person) => {
              return (
                <Box key={person.id}>
                  <Item
                    onClick={() =>
                      handleClick(person.id, person.firstName, person.email)
                    }
                    style={selection?.id === person.id ? selectedStyle : null}
                  >
                    <Avatar
                      alt={person.firstName}
                      src={person.image}
                      sx={{ width: 56, height: 56 }}
                    />
                    <Typography
                      variant="body1"
                      style={selection?.id === person.id ? selectedFont : null}
                    >
                      {person.firstName}
                    </Typography>
                  </Item>
                </Box>
              );
            })}
          </Stack>
        </Container>
      )}
    </>
  );
};

export default TimeSlotDetail;
