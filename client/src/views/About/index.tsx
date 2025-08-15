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
          <Heading>About UNNEstate</Heading>
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
          flexDirection: { xs: "column", sm: "row" }, // 👈 responsive change
          gap: { xs: 4, sm: 0 }
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
                  src="https://scontent.fabb1-3.fna.fbcdn.net/v/t39.30808-6/472154780_577042228570627_1733174131445923007_n.jpg?stp=c0.67.612.612a_dst-jpg_s206x206_tt6&_nc_cat=105&ccb=1-7&_nc_sid=50ad20&_nc_eui2=AeEFXKuq51r-6nzMPxsXeBoCbeiuqqsKlH9t6K6qqwqUf4RYQm11a19YqBPQIzV_sBpV7T0J2eYJC7oyj-XGECgQ&_nc_ohc=6wwn-8SQVOAQ7kNvwH3yPVB&_nc_oc=AdlR0Bws4_a2LiI_FKjpR_Kun-XvRQAnp-zd0Y5pX7E2ELkS0AYK0s5pBSmi7x-xa_4&_nc_zt=23&_nc_ht=scontent.fabb1-3.fna&_nc_gid=GPY7fcpHYH7MVkgrQ_G4SA&oh=00_AfW5eCC1xRFJvNMCAPBIB1KRE6Gw8VbNDjmLUUzMVOtUXw&oe=68A37E88"
                  alt="salman"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </Box>
              <SubHeading sx={{ marginTop: "10px" }}>Emeremgini Tochi</SubHeading>
              <Box>+234 708 867 9581</Box>
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
                  src="https://pbs.twimg.com/profile_images/1839254349744144384/fmVGN8iD_400x400.jpg"
                  alt="hassan"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </Box>
              <SubHeading sx={{ marginTop: "10px" }}>Agbasimere Kingsley</SubHeading>
              <Box>+234 913 752 9644</Box>
              <Heading sx={{ fontSize: "14px", marginTop: "10px" }}>
                Co-Founder & COO
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
                  src="https://web-agency-eta.vercel.app/assets/img/team/ezekiel.png"
                  alt="salman"
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
              </Box>
              <SubHeading sx={{ marginTop: "10px" }}>Chimaroke Ezekiel</SubHeading>
              <Box>+234 810 950 8188</Box>
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
