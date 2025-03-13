import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        height: "80vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "2.5rem", mb: 1 }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1.25rem", mb: 3, color: "#555" }}>
        Oops! The page you are looking for doesn&apos;t exist.
      </Typography>
      <Button
        variant="contained"
        sx={{
          color: "white", backgroundColor: "#ff681a",
          "&:hover": { backgroundColor: "#f25e11" },
        }}
        onClick={() => navigate("/")}
      >
        Return to Home
      </Button>
    </Box>
  );
};

export default NotFound;
