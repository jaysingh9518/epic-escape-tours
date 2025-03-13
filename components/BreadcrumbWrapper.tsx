"use client";

import Link from "next/link";
import PropTypes from "prop-types";
import { Box, Container, Typography, Breadcrumbs } from "@mui/material";

const BreadcrumbWrapper = ({ title, breadcrumbs, backgroundImage }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${
          backgroundImage ||
          "https://res.cloudinary.com/dkxmweeur/image/upload/v1731793458/packages/lifkcubp1sv0mqbrzyqk.jpg"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 4,
        color: "white",
        position: "relative",
        zIndex: 1,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: -1,
        },
      }}
    >
      <Container>
        <Box sx={{ textAlign: "center" }}>
          {/* Title */}
          <Typography
            variant="h1"
            sx={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            {title}
          </Typography>

          {/* Breadcrumb Menu */}
          <Breadcrumbs
            separator="›"
            sx={{
              justifyContent: "center",
              display: "flex",
              color: "white",
            }}
          >
            {breadcrumbs.map((breadcrumb, index) => (
              <Box key={index}>
                {breadcrumb.link ? (
                  <Link href={breadcrumb.link} underline="none" passHref>
                    <Typography
                      sx={{
                        color: "primary.main",
                        textDecoration: "none",
                        "&:hover": {
                          color: "secondary.main",
                        },
                      }}
                    >
                      {breadcrumb.label}
                    </Typography>
                  </Link>
                ) : (
                  <Typography sx={{ color: "inherit", fontWeight: "medium" }}>
                    {breadcrumb.label}
                  </Typography>
                )}
              </Box>
            ))}
          </Breadcrumbs>
        </Box>
      </Container>
    </Box>
  );
};

BreadcrumbWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string, // Optional for non-clickable breadcrumbs
    })
  ).isRequired,
  backgroundImage: PropTypes.string, // Optional background image
};

export default BreadcrumbWrapper;
