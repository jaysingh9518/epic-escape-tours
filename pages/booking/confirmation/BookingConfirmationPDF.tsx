import { Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";
import NotoSans from "@/public/fonts/NotoSans_Condensed-Bold.ttf";
import PropTypes from 'prop-types';

// Register the NotoSans font
Font.register({
  family: "NotoSans",
  src: NotoSans,
});

const styles = StyleSheet.create({
  outerPage: {
    padding: 10,
    backgroundColor: "#cccccc",
  },
  page: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    margin: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff681a",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "NotoSans",
  },
  row: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    width: "40%",
    fontSize: 12,
    fontWeight: "bold",
    color: "#333333",
    fontFamily: "NotoSans",
  },
  value: {
    width: "60%",
    fontSize: 12,
    fontFamily: "NotoSans",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#cccccc",
    marginVertical: 3,
  },
  image: {
    width: "20%",
    alignSelf: "center",
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  footer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#cccccc",
    textAlign: "center",
    fontSize: 12,
    color: "#333333",
    fontFamily: "NotoSans",
  },
});

const BookingConfirmationPDF = ({ bookingDetails }) => (
  <Document>
    <Page style={styles.outerPage}>
      <View style={styles.page}>
        <Text style={styles.heading}>Booking Confirmation</Text>
        
        {/* Package Image */}
        {bookingDetails.packageDetails.packageImages[0] && (
          <Image style={styles.image} src={bookingDetails.packageDetails.packageImages[0]} alt="Package" />
        )}

        {/* Booking Details in Table Format */}
        <View>
          <Text style={styles.heading}>Booking Details</Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Booking ID:</Text>
            <Text style={styles.value}>{bookingDetails.orderId}</Text>
          </View>
          <Text style={styles.divider}></Text>
          
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{bookingDetails.fullName}</Text>
          </View>
          <Text style={styles.divider}></Text>

          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{bookingDetails.email}</Text>
          </View>
          <Text style={styles.divider}></Text>

          <View style={styles.row}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{bookingDetails.mobile}</Text>
          </View>
          <Text style={styles.divider}></Text>

          <View style={styles.row}>
            <Text style={styles.label}>Travel Date:</Text>
            <Text style={styles.value}>{formatDate(bookingDetails.date)}</Text>
          </View>
          <Text style={styles.divider}></Text>

          <View style={styles.row}>
            <Text style={styles.label}>Booking Date:</Text>
            <Text style={styles.value}>{formatDate(bookingDetails.createdAt)}</Text>
          </View>
          <Text style={styles.divider}></Text>

          <View style={styles.row}>
            <Text style={styles.label}>Number of Persons:</Text>
            <Text style={styles.value}>{bookingDetails.persons}</Text>
          </View>
          <Text style={styles.divider}></Text>

          <View style={styles.row}>
            <Text style={styles.label}>Total Price:</Text>
            <Text style={styles.value}>₹{bookingDetails.totalPrice}</Text>
          </View>
          <Text style={styles.divider}></Text>
        </View>

        {/* Package Details in Table Format */}
        <View>
          <Text style={styles.heading}>Package Details</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Package Name:</Text>
            <Text style={styles.value}>{bookingDetails.packageDetails.packageName}</Text>
          </View>
          <Text style={styles.divider}></Text>

          <View style={styles.row}>
            <Text style={styles.label}>Destination:</Text>
            <Text style={styles.value}>{bookingDetails.packageDetails.packageDestination}</Text>
          </View>
          <Text style={styles.divider}></Text>

          <View style={styles.row}>
            <Text style={styles.label}>Activities:</Text>
            <Text style={styles.value}>{bookingDetails.packageDetails.packageActivities}</Text>
          </View>
          <Text style={styles.divider}></Text>

          <View style={styles.row}>
            <Text style={styles.label}>Nights/Days:</Text>
            <Text style={styles.value}>
              {bookingDetails.packageDetails.packageNights} nights / {bookingDetails.packageDetails.packageDays} days
            </Text>
          </View>
          <Text style={styles.divider}></Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Need any help? Contact us at 7452849199 or email us at info@heavenofholiday.com</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear()}`;
};

// PropTypes validation
BookingConfirmationPDF.propTypes = {
  bookingDetails: PropTypes.shape({
    orderId: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    persons: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    packageDetails: PropTypes.shape({
      packageName: PropTypes.string.isRequired,
      packageDestination: PropTypes.string.isRequired,
      packageActivities: PropTypes.string.isRequired,
      packageNights: PropTypes.number.isRequired,
      packageDays: PropTypes.number.isRequired,
      packageImages: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
};

export default BookingConfirmationPDF;
