import { Box, Typography, Divider, Grid } from "@mui/material";
import {
  Terminal,
  Devices,
  ContentCopy,
  Search,
  Speed,
} from "@mui/icons-material";
import logo from "../assets/logo.png"; // Import the existing logo

export default function Home() {

  return (
    <Box sx={styles.container}>
      {/* Hero Section */}
      <Box sx={styles.hero}>
        <Box sx={styles.logoContainer}>
          {/* Use the logo image instead of Terminal icon */}
          <img src={logo} alt="Memorium Logo" style={{ height: "90px" }} />
        </Box>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to{" "}
          <Typography component="span" variant="h2" sx={styles.memoriumText}>
            MEMORIUM
          </Typography>
        </Typography>
        <Typography variant="h5" sx={styles.subtitle}>
          Your CLI Manager
        </Typography>

        {/* Removed: Blinking arrow and Go to Platforms button */}
      </Box>

      <Divider sx={styles.divider} />

      <Box sx={styles.section}>
        <Typography variant="h4" gutterBottom>
          What is{" "}
          <Typography component="span" variant="h4" sx={styles.memoriumText}>
            MEMORIUM
          </Typography>
          ?
        </Typography>
        <Typography variant="body1" paragraph>
          Memorium is a powerful tool designed for developers, system
          administrators, and command-line enthusiasts. It helps you store and
          organize those complex commands you use regularly but can never quite
          remember.
        </Typography>
        <Typography variant="body1">
          With a clean interface and powerful search capabilities, Memorium
          makes it easy to find and use the commands you need, when you need
          them.
        </Typography>
      </Box>

      <Divider sx={styles.divider} />

      {/* Features section */}
      <Box sx={styles.section}>
        <Typography variant="h4" gutterBottom>
          Key Features
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={styles.featureBox}>
              <Box sx={styles.iconWrapper}>
                <ContentCopy color="primary" fontSize="large" />
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  One-Click Copy
                </Typography>
                <Typography variant="body2">
                  Copy any command to your clipboard with a single click. No
                  more retyping complex commands.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.featureBox}>
              <Box sx={styles.iconWrapper}>
                <Search color="primary" fontSize="large" />
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Powerful Search
                </Typography>
                <Typography variant="body2">
                  Quickly find commands with our powerful search feature. Search
                  by description or command text.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.featureBox}>
              <Box sx={styles.iconWrapper}>
                <Devices color="primary" fontSize="large" />
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Platform Organization
                </Typography>
                <Typography variant="body2">
                  Organize commands by platform - whether it's Linux, Windows,
                  MacOS, or any custom platform.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={styles.featureBox}>
              <Box sx={styles.iconWrapper}>
                <Speed color="primary" fontSize="large" />
              </Box>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Productivity Boost
                </Typography>
                <Typography variant="body2">
                  Spend less time searching for commands and more time being
                  productive with your workflow.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  hero: {
    textAlign: "center",
    mb: 6,
    position: "relative",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    mb: 2,
  },
  // Removed logoIcon style since we're using an img tag now
  memoriumText: {
    fontFamily: "'Tektur', sans-serif",
    fontWeight: "700",
    display: "inline",
  },
  subtitle: {
    mb: 2,
    color: "primary.main",
    fontWeight: 600,
  },
  divider: {
    my: 6,
  },
  section: {
    mb: 6,
  },
  featureBox: {
    display: "flex",
    alignItems: "flex-start",
    height: "100%",
  },
  iconWrapper: {
    mr: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
};
