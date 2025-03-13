import React, { useRef, useEffect } from "react";
import { Box } from "@mui/material";
import SearchComponent from "./SearchComponent"; // Adjust the import path accordingly

const SearchOverlay = ({ isVisible, onClose }) => {
  const overlayRef = useRef(null);

  // Close when clicking outside the search box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose(); // Toggle search off
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(74, 73, 72, 0.9)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box ref={overlayRef}>
        <SearchComponent onClose={onClose} />
      </Box>
    </Box>
  );
};

export default SearchOverlay;
