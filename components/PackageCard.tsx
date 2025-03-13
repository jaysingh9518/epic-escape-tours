"use client";

import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTime";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/People";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PackageCard = ({ packageData }) => {
  const router = useRouter();
  const packageLink = `/package/${packageData._id}`;

  return (
    <Card
      sx={{
        maxWidth: 360,
        margin: "10px auto",
        borderRadius: 4,
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        },
      }}
      onClick={() => router.push(packageLink)}
    >
      <Box sx={{ position: "relative" }}>
        {/* Image */}
        <CardMedia
          component="img"
          image={packageData.packageImages?.[0] || "default.jpg"}
          alt={packageData.packageName}
          height="200"
          sx={{
            "::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)",
              borderRadius: "8px",
              zIndex: 1,
            },
          }}
        />

        {/* Card Content */}
        <CardContent
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 2,
            color: "white",
            padding: "10px",
            background: "rgba(0, 0, 0, 0.6)",
            borderBottomLeftRadius: "8px",
            borderBottomRightRadius: "8px",
          }}
        >
          {/* Rating */}
          <Box display="flex" alignItems="center" mb={1}>
            {[...Array(5)].map((_, index) => {
              const rating = packageData.packageRating || 0;
              if (index < Math.floor(rating)) {
                return (
                  <StarIcon
                    key={index}
                    sx={{
                      color: "secondary.main",
                      fontSize: "1.2rem",
                      mr: 0.2,
                    }}
                  />
                );
              } else if (index < rating) {
                return (
                  <StarHalfIcon
                    key={index}
                    sx={{
                      color: "secondary.main",
                      fontSize: "1.2rem",
                      mr: 0.2,
                    }}
                  />
                );
              } else {
                return (
                  <StarOutlineIcon
                    key={index}
                    sx={{
                      color: "secondary.main",
                      fontSize: "1.2rem",
                      mr: 0.2,
                    }}
                  />
                );
              }
            })}
            <Typography variant="body2" color="text.main" sx={{ ml: 1 }}>
              ({packageData.packageTotalRatings} reviews)
            </Typography>
          </Box>

          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
              fontSize: "1.1rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {packageData.packageName}
          </Typography>

          {/* Destination */}
          <Typography
            variant="body2"
            sx={{ color: "text.main", fontSize: "0.9rem", mt: 1, mb: 1 }}
          >
            <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
            {packageData.packageDestination}
          </Typography>

          <Divider sx={{ my: 1, borderColor: "rgba(255, 204, 177, 0.9)" }} />

          {/* Days and Min Pax */}
          <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />
              {+packageData.packageNights > 0 &&
                `${packageData.packageNights} Night${
                  packageData.packageNights > 1 ? "s" : ""
                }`}
              {+packageData.packageNights > 0 &&
                +packageData.packageDays > 0 &&
                " - "}
              {+packageData.packageDays > 0 &&
                `${packageData.packageDays} Day${
                  packageData.packageDays > 1 ? "s" : ""
                }`}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <PeopleOutlineOutlinedIcon sx={{ fontSize: 16 }} />
              {packageData?.packageMinPax} Person
              {packageData?.packageMinPax > 1 && "s"}
            </Typography>
          </Box>
        </CardContent>
      </Box>

      {/* Price and View Details */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
        sx={{
          marginTop: "2px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Price */}
        {packageData.packageOffer && packageData.packageDiscountPrice ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Typography
              variant="body2"
              sx={{
                textDecoration: "line-through",
                color: "gray",
                fontSize: "1.3rem",
                mb: 0.5,
              }}
            >
              ₹{packageData.packagePrice}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                fontSize: "1.3rem",
              }}
            >
              ₹{packageData.packageDiscountPrice}
            </Typography>
          </Box>
        ) : (
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            ₹{packageData.packagePrice}
          </Typography>
        )}

        {/* View Details Button */}
        <Button
          variant="contained"
          size="small"
          component={Link}
          href={packageLink}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            fontSize: "1rem",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "secondary.main",
              color: "white",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "all 500ms linear",
            },
          }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

PackageCard.propTypes = {
  packageData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    packageName: PropTypes.string.isRequired,
    packageImages: PropTypes.arrayOf(PropTypes.string),
    packageDestination: PropTypes.string.isRequired,
    packageNights: PropTypes.number,
    packageDays: PropTypes.number.isRequired,
    packageMinPax: PropTypes.number.isRequired,
    packageRating: PropTypes.number,
    packageTotalRatings: PropTypes.number,
    packagePrice: PropTypes.number.isRequired,
    packageDiscountPrice: PropTypes.number,
    packageOffer: PropTypes.bool,
  }).isRequired,
};

export default PackageCard;
