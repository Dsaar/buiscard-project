import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ROUTES from "../router/routesDictionary";
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AdsClickIcon from '@mui/icons-material/AdsClick';



export default function AboutPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ textAlign: "center", py: 8, px: 2 }}>
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          About <span style={{ color: theme.palette.primary.main }}>BCard</span>
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 700, mx: "auto", color: "text.secondary" }}>
          Welcome to BCard, your ultimate solution for creating, browsing, and managing
          business cards with ease. Our platform caters to professionals and
          businesses of all sizes, offering a seamless and efficient way to handle your
          business card needs.
        </Typography>
      </Box>

      {/* Our Mission Section */}
      <Paper
        elevation={3}
        sx={{
          maxWidth: 900,
          mx: "auto",
          p: { xs: 3, md: 4 },
          mb: 6,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 2,
            backgroundColor: "#fdd83533", // light yellow background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mx: "auto",
            mb: 2,
          }}
        >
          <AdsClickIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
        </Box>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Our Mission
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          At BCard, we strive to simplify the way you network and manage your professional
          connections. Our mission is to provide a user-friendly, powerful tool that helps
          you create stunning business cards, efficiently manage your contacts, and enhance
          your professional presence.
        </Typography>
      </Paper>

      {/* What We Offer Section */}
      <Box sx={{ textAlign: "center", mb: 6, px: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          What We <span style={{ color: theme.palette.secondary.main }}>Offer</span>
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 4 }}>
          Discover our comprehensive suite of tools designed to revolutionize your
          networking experience
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            {
              title: "Create",
              text: "Design unique and professional business cards effortlessly with our intuitive creation tools.",
              icon: (
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2, // rounded corners
                    backgroundColor: "#72aed9ff", // light blue background
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <CreateIcon sx={{ fontSize: 32, color: theme.palette.primary.light }} />
                </Box>
              ),
            },
            {
              title: "Browse",
              text: "Explore a wide range of business cards, discover new contacts, and connect with professionals.",
              icon: (
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    backgroundColor: "#cb77d7ff", // light purple
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <SearchIcon sx={{ fontSize: 32, color: theme.palette.primary.light }} />
                </Box>
              ),
            },
            {
              title: "CRM for Admins",
              text: "Manage business card data, users, and maintain business relationships with advanced analytics.",
              icon: (
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    backgroundColor: "#88f891ff", // light green
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mx: "auto",
                    mb: 2,
                  }}
                >
                  <SupervisorAccountIcon sx={{ fontSize: 32, color: theme.palette.primary.light }} />
                </Box>
              ),
            },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: "center",
                  height: "100%",
                  borderRadius: 3,
                  maxWidth:560,
                  mx:'auto'
                }}
              >
                {item.icon}
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>{item.text}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Contact Section */}
      <Box
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "#1e293b" : "#0f172a",
          color: "white",
          py: 6,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Contact Us
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <EmailIcon fontSize="large" />
            <Typography>Email</Typography>
            <Typography>bcard@email.com</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <PhoneIcon fontSize="large" />
            <Typography>Phone</Typography>
            <Typography>054-300-3617</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <LocationOnIcon fontSize="large" />
            <Typography>Address</Typography>
            <Typography>1234 BCard St, BCard City</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Call to Action */}
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h5" sx={{ mb: 2,fontWeight:'bold' }}>
          Ready to Get Started?
        </Typography>
        <Button
          onClick={() => navigate(ROUTES.register)}
          variant="contained"
          sx={{
            backgroundColor: theme.palette.primary.main,
            px: 4,
            py: 1.5,
            borderRadius: 3,
            fontWeight: "bold",
          }}
        >
          Start Your Journey
        </Button>
      </Box>
    </Box>
  );
}
