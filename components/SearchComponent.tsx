"use client";

import React, { useState, useRef, useEffect } from "react";
import { Box, TextField, Button, IconButton, CircularProgress, InputAdornment, Typography, Paper } from "@mui/material";
import { FaSearch, FaCalendar, FaStar, FaTimes } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { LuBadgePercent } from "react-icons/lu";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

const SearchComponent = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const [flicker, setFlicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  const handleSearch = () => {
    if (!search.trim()) {
      setFlicker(true);
      inputRef.current?.focus();
      setTimeout(() => setFlicker(false), 500);
    } else {
      setLoading(true);
      try {
        router.push(`/search?searchTerm=${search}`);
        // Add a small delay to allow the navigation to start
        setTimeout(() => {
          setLoading(false);
          onClose();
        }, 300);
      } catch (error) {
        console.error("Navigation error:", error);
        setLoading(false);
      }
    }
  };

  const handleClearSearch = () => setSearch("");

  const handleButtonClick = (query) => {
    setLoading(true);
    try {
      router.push(query);
      // Add a small delay to allow the navigation to start
      setTimeout(() => {
        setLoading(false);
        onClose();
      }, 300);
    } catch (error) {
      console.error("Navigation error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Paper 
      elevation={4}
      sx={{
        borderRadius: 3,
        padding: 3,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(8px)",
        width: { xs: "95%", sm: "90%", md: "80%" },
        maxWidth: 900,
        margin: "0 auto",
        animation: "fade-in 0.4s ease-out",
        overflow: "hidden"
      }}
    >
      <Typography 
        variant="h5" 
        component="h2"
        sx={{ 
          textAlign: "center", 
          fontWeight: 600,
          mb: 3,
          color: "#333",
          textTransform: "uppercase",
          letterSpacing: 1
        }}
      >
        Find Your Perfect Destination
      </Typography>
      
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
        width="100%"
        mb={4}
      >
        <TextField
          inputRef={inputRef}
          variant="outlined"
          placeholder="Where would you like to go?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch color="#ff681a" />
              </InputAdornment>
            ),
            endAdornment: search && (
              <InputAdornment position="end">
                <IconButton onClick={handleClearSearch} size="small">
                  <FaTimes />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: "85%",
            backgroundColor: "white",
            borderRadius: "12px",
            animation: flicker ? "flicker-animation 0.5s" : "none",
            "& input": {
              color: "#333",
              padding: "14px 8px",
              fontSize: "1rem",
            },
            "& .MuiOutlinedInput-root": {
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              "& fieldset": { 
                borderColor: "transparent", 
                borderRadius: "12px" 
              },
              "&:hover fieldset": { 
                borderColor: "#ff681a" 
              },
              "&.Mui-focused fieldset": { 
                borderColor: "#ff681a",
                borderWidth: "2px",
              }
            },
          }}
        />

        <IconButton
          onClick={handleSearch}
          sx={{
            width: 48,
            height: 48,
            backgroundColor: "#ff681a",
            color: "white",
            borderRadius: "12px",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 8px rgba(255,104,26,0.3)",
            "&:hover": {
              backgroundColor: "#e85309",
              transform: "translateY(-2px)",
              boxShadow: "0 4px 12px rgba(255,104,26,0.4)",
            },
          }}
          aria-label="Search"
        >
          {loading ? <CircularProgress size={22} sx={{ color: "white" }} /> : <FaSearch />}
        </IconButton>
      </Box>

      <Typography
        variant="subtitle2"
        sx={{
          textAlign: "center",
          fontWeight: 500,
          mb: 2,
          color: "#666",
        }}
      >
        QUICK FILTERS
      </Typography>

      <Box 
        display="grid" 
        gridTemplateColumns={{ xs: "1fr 1fr", sm: "1fr 1fr 1fr 1fr" }}
        gap={2} 
        width="100%"
      >
        {[
          { text: "Best Offers", icon: <LuBadgePercent size={18} />, query: "/search?offer=true", color: "#ff681a" },
          { text: "Top Rated", icon: <FaStar size={18} />, query: "/search?sort=packageRating", color: "#FFA000" },
          { text: "Latest", icon: <FaCalendar size={18} />, query: "/search?searchTerm=&sort=createdAt", color: "#00897B" },
          { text: "Most Rated", icon: <FaRankingStar size={18} />, query: "/search?sort=packageTotalRatings", color: "#5E35B1" },
        ].map(({ text, icon, query, color }) => (
          <Button
            key={text}
            onClick={() => handleButtonClick(query)}
            variant="outlined"
            startIcon={icon}
            sx={{
              borderColor: color,
              borderWidth: "1.5px",
              color: color,
              borderRadius: "8px",
              padding: "8px 12px",
              fontWeight: "medium",
              textTransform: "none",
              transition: "all 0.2s ease",
              justifyContent: "flex-start",
              backgroundColor: "rgba(255,255,255,0.6)",
              "&:hover": { 
                backgroundColor: color,
                color: "white",
                transform: "translateY(-2px)",
                boxShadow: `0 4px 12px ${color}40`,
              },
            }}
          >
            {text}
          </Button>
        ))}
      </Box>

      <style jsx global>
        {`
          @keyframes flicker-animation {
            0%, 100% { box-shadow: 0 0 0px rgba(255, 104, 26, 0.5); }
            50% { box-shadow: 0 0 15px rgba(255, 104, 26, 0.8); }
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Paper>
  );
};

SearchComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SearchComponent;