"use client";

import React, { useState } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Container,
  Drawer,
  Link as MuiLink,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Close as CloseIcon,
  WhatsApp as WhatsAppIcon,
  Home as HomeIcon,
  Luggage as LuggageIcon,
  Article as ArticleIcon,
  Info as InfoIcon,
  ContactPage as ContactPageIcon,
} from "@mui/icons-material";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import TopBanner from "@/components/TopBanner";
import SearchOverlay from "@/components/SearchOverlay";

const navLinks = [
  { label: "Home", path: "/", icon: <HomeIcon /> },
  { label: "Packages", path: "/packages", icon: <LuggageIcon /> },
  { label: "Blogs", path: "/blogs", icon: <ArticleIcon /> },
  { label: "About", path: "/about", icon: <InfoIcon /> },
  { label: "Contact", path: "/contact", icon: <ContactPageIcon /> },
];

const Header = () => {
  const location = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);
  const toggleSearchComponent = () => setIsSearchVisible(!isSearchVisible);

  return (
    <>
      {/* Top Banner */}
      <TopBanner />
      {/* Drawer for Mobile Devices */}
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
          zIndex: 999,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
              <Image src={logo} alt="Logo" style={{ width: "200px", height: "auto", marginRight: "10px"  }} />
            </Link>

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {navLinks.map(({ label, path, icon }) => {
                const isActive = location === path;
                return (
                  <MuiLink key={label} underline="none" href={path} passHref>
                    <Button
                      sx={{
                        textDecoration: "none",
                        color: isActive ? "#ff681a" : "gray",
                        fontWeight: isActive ? "bold" : "normal",
                        "&:hover": { color: "#ff681a" },
                        display: "flex",
                        alignItems: "center",
                        "&:after": { color: "#ff681a", border: "1px solid #ff681a", padding: "2px" },
                      }}
                    >
                      {icon}<span style={{ marginLeft: 4, textDecoration: "none" }}>{label}</span>
                    </Button>
                  </MuiLink>
                );
              })}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton onClick={toggleSearchComponent}>
                <SearchIcon />
              </IconButton>
              <IconButton onClick={toggleDrawer} sx={{ display: { xs: "flex", md: "none" } }}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, padding: 2 }}>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
          <Divider />
          <List>
            {navLinks.map(({ label, path, icon }) => {
                const isActive = location === path;
                return (
                  <MuiLink key={label} underline="none" href={path} passHref>
                    <ListItem
                      button
                      onClick={toggleDrawer}
                      sx={{
                        backgroundColor: isActive ? "#ff681a" : "transparent",
                        color: isActive ? "white" : "gray",
                        "&:hover": {
                          backgroundColor: isActive
                            ? "#ff681a"
                            : "rgba(255, 104, 26, 0.1)",
                        },
                      }}
                    >
                      <ListItemIcon sx={{ color: isActive ? "white" : "inherit" }}>{icon}</ListItemIcon>
                      <ListItemText primary={label} />
                    </ListItem>
                </MuiLink>
              );
            })}
          </List>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2, gap: 2 }}>
            <IconButton onClick={() => window.open("mailto:info@heavenofholiday.com")}>
              <EmailIcon />
            </IconButton>
            <IconButton onClick={() => window.open("tel:+91-7452849199")}>
              <PhoneIcon />
            </IconButton>
            <IconButton onClick={() => window.open("https://wa.me/917452849199")}>
              <WhatsAppIcon />
            </IconButton>
          </Box>
        </Box>
      </Drawer>
      <SearchOverlay isVisible={isSearchVisible} onClose={toggleSearchComponent} />
    </>
  );
};

export default Header;
