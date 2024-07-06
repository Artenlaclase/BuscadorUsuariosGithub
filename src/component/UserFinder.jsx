import {
  Avatar,
  Button,
  Paper,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { useRef } from "react";
import { useState } from "react";

const Container = styled(Paper)(({ theme }) => ({
  maxWidth: 400,
  margin: "auto",
  padding: theme.spacing(2),
  textAlign: "center",
  marginTop: theme.spacing(2),
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  margin: "0 auto",
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const UserFinder = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null); // aqui se guarda lo que se escriba en el input

  const fetchUsers = async () => {
    const username = inputRef.current.value;
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("Usuario no encontrado");
      }
      const data = await response.json(); // respuesta de la API
      setUser(data);
      setError(null);
    } catch (error) {
      setError(error.message); // guardamos el mensaje del error en el state error
      setUser(null);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchUsers();
    }
  };
  return (
    <Container elevation={3}>
      <Typography>Buscar usuario de Github</Typography>
      <TextField
        inputRef={inputRef}
        fullWidth
        variant="outlined"
        placeholder="Ingrese el nombre de un usuario"
        margin="normal"
        onKeyDown={handleKeyPress}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={fetchUsers}
        onKeyDown={handleKeyPress}
        sx={{ marginTop: 2 }}
      >
        Buscar
      </Button>
      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
      {user && (
        <div>
          <AvatarStyled
            src={user.avatar_url}
            alt="Avatar del usuario"
          ></AvatarStyled>
          <Typography variant="body1" gutterBottom>
            Nombre: {user.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Seguidores: {user.followers}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Repositorios públicos: {user.public_repos}
          </Typography>
        </div>
      )}
    </Container>
  );
};
