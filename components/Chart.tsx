import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from "recharts";
import Timeago from "react-timeago"; // Import Timeago component
import PropTypes from "prop-types"; // Import PropTypes
import { Container, Typography, Box } from "@mui/material"; // Import Material-UI components

export default function Chart({ data }) {
  // Format the data to get the price and created date
  const realData = data?.map((item) => ({
    price: item.totalPrice,
    createdAt: new Date(item.createdAt), // Convert to Date object for Timeago
  }));

  // Format date for XAxis ticks
  const formatXAxis = (tickItem) => {
    // Convert Date object to a readable string
    return tickItem.toLocaleDateString(); // or any desired format
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box sx={{ width: "100%", height: 300, margin: "0 auto" }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Bookings
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={realData}>
            <Tooltip
              content={({ payload }) => (
                <div>
                  {payload?.map((item) => (
                    <div
                      className="bg-slate-400 text-white py-2 px-4 rounded-md shadow-lg"
                      key={item.payload.createdAt} // Use createdAt instead of date
                    >
                      <p>Price: ₹{item.value}</p>
                      <p>
                        Date: <Timeago date={item.payload.createdAt} /> {/* Use Timeago for formatting */}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            />
            <YAxis dataKey="price" />
            <XAxis
              dataKey="createdAt"
              tickFormatter={formatXAxis} // Use the formatter function for XAxis ticks
            />
            <Bar dataKey="price" fill="#0080ff" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Container>
  );
}

// Define PropTypes for the component
Chart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      totalPrice: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};
