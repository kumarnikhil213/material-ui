import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [loginData, setLoginData] = useState({
    user: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find(
      (u) => u.email === formData.email || u.mobile === formData.mobile
    );
    if (exists) {
      alert("Email या Mobile पहले से registered है!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Password और Confirm Password match नहीं कर रहे!");
      return;
    }
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration Successful!");
    setIsRegistered(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        (u.email === loginData.user || u.mobile === loginData.user) &&
        u.password === loginData.password
    );
    if (user) {
      alert(`Welcome ${user.name}! Login Successful.`);
    } else {
      alert("Invalid Email/Mobile or Password!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={10} sx={{ p: 4, borderRadius: "20px" }}>
          {!isRegistered ? (
            <>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#4a148c" }}
              >
                Registration Form
              </Typography>

              <Box
                component="form"
                onSubmit={handleRegister}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  name="name"
                  onChange={handleChange}
                  fullWidth
                  label="Full Name"
                  required
                />

                <TextField
                  name="dob"
                  onChange={handleChange}
                  fullWidth
                  type="date"
                  label="Date of Birth"
                  InputLabelProps={{ shrink: true }}
                  required
                />

                <TextField
                  name="email"
                  onChange={handleChange}
                  fullWidth
                  label="Email"
                  type="email"
                  required
                />

                <TextField
                  name="mobile"
                  onChange={handleChange}
                  fullWidth
                  label="Mobile Number"
                  type="tel"
                  required
                />

                <TextField
                  name="password"
                  onChange={handleChange}
                  fullWidth
                  label="Password"
                  type="password"
                  required
                />

                <TextField
                  name="confirmPassword"
                  onChange={handleChange}
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    background: "linear-gradient(45deg,#ff512f,#dd2476)",
                    "&:hover": {
                      background: "linear-gradient(45deg,#dd2476,#ff512f)",
                    },
                  }}
                >
                  Register
                </Button>
              </Box>

              <Typography align="center" sx={{ mt: 2 }}>
                Already registered?
              </Typography>
              <Button
                onClick={() => setIsRegistered(true)}
                variant="outlined"
                fullWidth
              >
                Login Here
              </Button>
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#0d47a1" }}
              >
                Login Form
              </Typography>

              <Box
                component="form"
                onSubmit={handleLogin}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
              >
                <TextField
                  name="user"
                  onChange={handleLoginChange}
                  fullWidth
                  label="Email or Mobile"
                  required
                />
                <TextField
                  name="password"
                  onChange={handleLoginChange}
                  fullWidth
                  label="Password"
                  type="password"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontWeight: "bold",
                    background: "linear-gradient(45deg,#2196f3,#21cbf3)",
                    "&:hover": {
                      background: "linear-gradient(45deg,#21cbf3,#2196f3)",
                    },
                  }}
                >
                  Login
                </Button>
              </Box>

              <Typography align="center" sx={{ mt: 2 }}>
                New user?
              </Typography>
              <Button
                onClick={() => setIsRegistered(false)}
                variant="outlined"
                fullWidth
              >
                Register Here
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default App;
