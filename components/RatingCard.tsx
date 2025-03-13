import PropTypes from "prop-types";
import { Rating, Box, Container, Paper, Typography, Button } from "@mui/material";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const defaultProfileImg = "@/public/images/profile-default.png"; // Define your default image path here

const RatingCard = ({ packageRatings }) => {
  const handleExpandReview = (index) => {
    document.getElementById(`popup-${index}`).style.display = "block";
  };

  const handleCollapseReview = (index) => {
    document.getElementById(`popup-${index}`).style.display = "none";
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {packageRatings &&
          packageRatings.map((rating, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                width: "100%",
                maxWidth: 350,
                padding: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                position: "relative",
                borderRadius: 2,
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <img
                  src={rating.userProfileImg || defaultProfileImg}
                  alt={rating.name[0]}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid black",
                  }}
                />
                <Typography variant="subtitle1" fontWeight="bold">
                  {rating.name}
                </Typography>
              </Box>

              <Rating value={rating.rating || 0} readOnly size="small" precision={0.1} />

              <Typography variant="body2">
                <span id={rating.review.length > 90 ? "review-text" : undefined}>
                  {rating.review && rating.review.length > 90
                    ? `${rating.review.substring(0, 45)}...`
                    : rating.review || (rating.rating < 3 ? "Not Bad" : "Good")}
                </span>
                {rating.review.length > 90 && (
                  <Button
                    size="small"
                    sx={{ fontWeight: "bold" }}
                    endIcon={<FaArrowDown />}
                    onClick={() => handleExpandReview(index)}
                  >
                    More
                  </Button>
                )}
              </Typography>

              {rating.review.length > 90 && (
                <Box
                  id={`popup-${index}`}
                  sx={{
                    display: "none",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "background.paper",
                    zIndex: 10,
                    padding: 2,
                    borderRadius: 2,
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <img
                      src={rating.userProfileImg || defaultProfileImg}
                      alt={rating.name[0]}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        border: "1px solid black",
                      }}
                    />
                    <Typography variant="subtitle1" fontWeight="bold">
                      {rating.name}
                    </Typography>
                  </Box>
                  <Rating value={rating.rating || 0} readOnly size="small" precision={0.1} />
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {rating.review}
                  </Typography>
                  <Button
                    size="small"
                    sx={{ fontWeight: "bold", mt: 1 }}
                    endIcon={<FaArrowUp />}
                    onClick={() => handleCollapseReview(index)}
                  >
                    Less
                  </Button>
                </Box>
              )}
            </Paper>
          ))}
      </Box>
    </Container>
  );
};

// Prop Types validation
RatingCard.propTypes = {
  packageRatings: PropTypes.arrayOf(
    PropTypes.shape({
      userProfileImg: PropTypes.string,
      name: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      review: PropTypes.string,
    })
  ).isRequired,
};

export default RatingCard;
