import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import { keyframes } from "@mui/system";

const pages = ["Home", "Platforms"];
const routes = ["/", "/platforms"];

const blink = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  50% {
    opacity: 0.3;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const isHomePage = location.pathname === "/";

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
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Memorium Logo" height="40" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component={Box}
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "'Tektur', sans-serif",
              fontWeight: 750,
              fontSize: "1.5rem",
              color: "text.primary",
              letterSpacing: "0.05em",
              cursor: "pointer",
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
                      fontWeight: 700,
                    }}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Memorium Logo" height="32" />
          </Box>
          <Typography
            variant="h6"
            noWrap
            component={Box}
            onClick={() => navigate("/")}
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: "'Tektur', sans-serif",
              fontWeight: 750,
              fontSize: "1.3rem",
              color: "inherit",
              letterSpacing: "0.05em",
              cursor: "pointer",
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
                    borderBottom: `3px solid ${theme.palette.primary.contrastText}`,
                  },
                  position: "relative",
                }}
              >
                {page}

                {page === "Platforms" && isHomePage && (
                  <KeyboardArrowUpIcon
                    sx={{
                      position: "absolute",
                      bottom: "-60px",
                      left: "8%",
                      transform: "translateX(-50%)",
                      fontSize: "5.5rem",
                      color: theme.palette.primary.contrastText,
                      animation: `${blink} 1.5s infinite ease-in-out`,
                      zIndex: 1100,
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
