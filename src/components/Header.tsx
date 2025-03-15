import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const pages = ["Home", "Platforms", "About"];
const routes = ["/", "/platforms", "/about"];

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (route: string) => {
    navigate(route);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "background.paper" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
            <img src={logo} alt="Memorium Logo" height="40" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "'Tektur', sans-serif",
              fontWeight: 750,
              fontSize: "1.5rem",
              color: "text.primary",
              letterSpacing: "0.05em",
            }}
          >
            MEMORIUM
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={page}
                  onClick={() => handleNavigate(routes[index])}
                  sx={{
                    height: "40px",
                    width: "100%",
                    justifyContent: "center",
                    textTransform: "uppercase",
                    fontSize: "0.9rem",
                    letterSpacing: "0.05em",
                    my: 0.5,
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      fontWeight: 700, // Changed from 500 to 700 for thicker text
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <img src={logo} alt="Memorium Logo" height="32" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: "'Tektur', sans-serif",
              fontWeight: 750,
              fontSize: "1.3rem",
              color: "inherit",
              letterSpacing: "0.05em",
            }}
          >
            MEMORIUM
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page, index) => (
              <Box
                key={page}
                onClick={() => handleNavigate(routes[index])}
                sx={{
                  width: "100px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  mx: 1,
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "0.05em",
                  borderBottom: "3px solid transparent",
                  transition: "all 0.2s ease",
                  color: "text.primary",
                  "&:hover": {
                    borderBottom: `3px solid ${theme.palette.primary.main}`,
                  },
                }}
              >
                {page}
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
