// MUI Imports
import { Box, Grid } from "@mui/material";
// Custom Imports
import { Heading, SubHeading } from "../../components/Heading";

const About = () => {
  return (
    <Box sx={{ margin: "65px 0 0 0" }}>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Heading>About RealEstate</Heading>
          <Box sx={{ margin: "20px 0", color: "#334155", fontSize: "16px" }}>
            Our platform is designed to make it easy for students and landlords to connect. Whether you are looking for a place to stay or you have a property to rent out, we provide a simple and reliable way to get it done.
            <br />
            <br />
            We focus mainly on student lodgings and rentals around the University of Nigeria, Nsukka, but anyone can post or find properties that meet their needs. Once you register, you can list your lodge, hostel, or apartment for free, and students can browse and contact you directly.
            <br />
            <br />
            Our goal is to make house hunting less stressful and more transparent. We give users the tools to post clear pictures, prices, and details so that everyone knows exactly what to expect before making a decision.
            <br />
            <br />
            Whether you are a student searching for a comfortable place or a landlord looking for tenants, this platform is here to connect you quickly and easily.

          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "80px 0 75px 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <Box sx={{ width: "75px", height: "75px" }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDzTLiQfZt1FJPKE25gm_nnyOdpYdWkLrJxg&s"
                  alt="salman"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </Box>
              <SubHeading sx={{ marginTop: "10px" }}>Salman Muazam</SubHeading>
              <Box>0323 4910955</Box>
              <Heading sx={{ fontSize: "14px", marginTop: "10px" }}>
                CEO
              </Heading>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <Box sx={{ width: "75px", height: "75px" }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDzTLiQfZt1FJPKE25gm_nnyOdpYdWkLrJxg&s"
                  alt="hassan"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </Box>
              <SubHeading sx={{ marginTop: "10px" }}>Hassan Raza</SubHeading>
              <Box>0300 0315440</Box>
              <Heading sx={{ fontSize: "14px", marginTop: "10px" }}>
                President
              </Heading>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                width: "300px",
              }}
            >
              <Box sx={{ width: "75px", height: "75px" }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDzTLiQfZt1FJPKE25gm_nnyOdpYdWkLrJxg&s"
                  alt="salman"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </Box>
              <SubHeading sx={{ marginTop: "10px" }}>Ch Faizan</SubHeading>
              <Box>0355 5032437</Box>
              <Heading sx={{ fontSize: "14px", marginTop: "10px" }}>
                Marketing Manager
              </Heading>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
};

export default About;
