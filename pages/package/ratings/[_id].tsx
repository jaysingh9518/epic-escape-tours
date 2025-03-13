import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { URLPORT } from "@/services/URL";
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Pagination,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import RatingCard from "@/components/RatingCard";

const RatingsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [packageRatings, setPackageRatings] = useState([]);
  const [showRatingStars, setShowRatingStars] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [loading, setLoading] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // Memoized function to fetch ratings
  const getRatings = useCallback(async () => {

    try {
      setLoading(true);
      const res = await fetch(`${URLPORT}/rating/get-ratings/${params?._id}/999999999999`);
      const res2 = await fetch(`${URLPORT}/rating/average-rating/${params?._id}`);
      const data = await res.json();
      const data2 = await res2.json();

      if (data && data2) {
        setPackageRatings(data);
        setShowRatingStars(data2.rating);
        setTotalRatings(data2.totalRatings);
      } else {
        setPackageRatings([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params?._id]); // Include params.id as a dependency

  // Total pages for pagination
  const totalPages = Math.ceil(packageRatings.length / itemsPerPage);

  const paginatedRatings = packageRatings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Fetch ratings when params.id changes
  useEffect(() => {
    if (params?._id) getRatings();
  }, [getRatings, params?._id]); // Include getRatings in the dependency array

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography variant="h4" align="center" gutterBottom>
            Ratings
          </Typography>
          {!packageRatings.length ? (
            <Typography variant="h6" align="center">
              No Ratings Found!
            </Typography>
          ) : (
            <Box>
              <Typography variant="h6" align="left" gutterBottom>
                <Box display="flex" alignItems="center">
                  <span>Rating:</span>
                  <Rating
                    size="large"
                    value={showRatingStars || 0}
                    readOnly
                    precision={0.1}
                    sx={{ ml: 1 }}
                  />
                  <span>({totalRatings})</span>
                </Box>
              </Typography>

              <Button
                variant="outlined"
                onClick={() => router.push(`/package/${params?._id}`)}
                sx={{ mb: 2 }}
              >
                Back
              </Button>
              <hr />

              {/* Display Rating Cards */}
              <Box
                mt={2}
                mb={4}
                display="grid"
                gap={2}
                gridTemplateColumns="repeat(4, 1fr)"
              >
                {paginatedRatings.map((rating, index) => (
                  <RatingCard key={index} packageRatings={[rating]} />
                ))}
              </Box>

              {/* Custom Styled Pagination */}
              <Box display="flex" justifyContent="center" sx={{ mt: 4, mb: 2 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, value) => setCurrentPage(value)}
                  variant="outlined"
                  shape="rounded"
                  sx={{
                    "& .MuiPaginationItem-root.Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                    "& .MuiPaginationItem-root": {
                      color: "primary.main",
                    },
                  }}
                />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default RatingsPage;
