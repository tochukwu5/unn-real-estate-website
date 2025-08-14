// MUI Imports
import { Box, Grid } from "@mui/material";
// React Imports
import { useNavigate } from "react-router-dom";
// Custom Imports
import { Heading, SubHeading } from "../../components/Heading";
// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css";
// React Icons
import { PiShootingStarThin } from "react-icons/pi";
import { useSearchListingsQuery } from "../../redux/api/listingApiSlice";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
// React Icons
import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { thousandSeparatorNumber } from "../../utils";

const Banner = {
  width: "100%",
  height: "fit-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  borderRadius: "12px",
  background: "none",
  cursor: "pointer",
};

const iconStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
  color: "#334155",
  fontWeight: "bold",
  fontSize: "13px",
};

const images = [
  "https://scontent.fabb1-2.fna.fbcdn.net/v/t45.5328-4/515367250_588416757659858_5168157314114587498_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=111&ccb=1-7&_nc_sid=247b10&_nc_eui2=AeEN7ETUls8rT-MNppp36zAE2rdZOdVoejXat1k51Wh6NRzRDfeIvUAea_YlA3ho3u8qfzHeXEeF-tTfe3DMgRdo&_nc_ohc=HaroNNBStLoQ7kNvwFr2MjQ&_nc_oc=AdlBXMaTSNKQRhpa1JyNApyyxeXDhlISQJ5CUMwX1GkV6VrcvjrE6pDF_TWMIheaHbQ&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&_nc_gid=rbWJM5m3Xs0AwbWrphHi4g&oh=00_AfW2IF5r--R3PTNMIbxLtdHfhVFjRWH8mIewA9NVLwI88w&oe=68A3191A",
  "https://scontent.fabb1-1.fna.fbcdn.net/v/t39.30808-6/523408279_775005745184690_4877149708201511437_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=101&ccb=1-7&_nc_sid=454cf4&_nc_eui2=AeHhxYKI-QWHdwXILFX7FwvSj2icL57TWRCPaJwvntNZEOUxIs3Gwe8g1lkp-wbNIya0YBorSNLGQ4Bbdf0nb58e&_nc_ohc=dPEqHmIakoYQ7kNvwEtV0Y4&_nc_oc=AdkRn-am547N1J4oC9_tY-DQ9lI7hktDZsqvxLqAKeMB_MmH9sAgJtE83QS4MHxGgf0&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&_nc_gid=gTGF8nlp-OtIQxx_D9wXaw&oh=00_AfV0rpeQKZEAw2epb9AZBP0ez8udopdKEcEB4fae9Nqxhg&oe=68A2F9F2",
  "https://scontent.fabb1-1.fna.fbcdn.net/v/t39.30808-6/521505103_122110886468940451_8223940093385627429_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=103&ccb=1-7&_nc_sid=454cf4&_nc_eui2=AeFeXxGqYppKvywNiIUI6ZoGO9WRystyBbg71ZHKy3IFuPJlOfY-bdn94KXRt5-Ow48js8byBNUnjPdIjS1HXKoQ&_nc_ohc=DCgO1yOIdasQ7kNvwFr0pfk&_nc_oc=Adnv0zGvLpcCuWwuY89c_32rOU3P9adb2SXD5XkYcg0YYlg2TlTG7bbI9d5-vDHY8Jo&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&_nc_gid=JZ0l4fFhbO-7rwvoqdyo8g&oh=00_AfUdGUa7YehdAA-BbPolIf1x8AgkpdSaM3O68zYAT6fsYA&oe=68A31239",
  "https://scontent.fabb1-1.fna.fbcdn.net/v/t39.30808-6/516895895_3079822622183973_1486460758938832470_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=108&ccb=1-7&_nc_sid=946e27&_nc_eui2=AeFY1H_Cld9IF_NkPA9aEF9AoZQgyO0SpgihlCDI7RKmCHodb9YHtAtqGp1vh7LFg5rvGu39hEglaVy5QiOXH9qf&_nc_ohc=QjM8uKqCuisQ7kNvwFs0JJd&_nc_oc=AdmhCO32fmOI4rvxyWhLbaDo_sfRD65YfLfCwMiA0YXunKSDrS03yyCWM2csg4dX2J0&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&_nc_gid=9k7621aWw2I0anFtL3UVXg&oh=00_AfWzPzR-n5I82myGkejsXSbBuQobaWlA6GgNYIGZtRBhTA&oe=68A2ED05",
];

const Home = () => {
  const navigate = useNavigate();

  const offerString = "offer=true&limit=4";
  const rentString = "type=rent&limit=4";
  const saleString = "type=sale&limit=4";

  const { data: offerData, isLoading: offerLoading } =
    useSearchListingsQuery(offerString);

  const { data: rentData, isLoading: rentLoading } =
    useSearchListingsQuery(rentString);

  const { data: saleData, isLoading: saleLoading } =
    useSearchListingsQuery(saleString);

  return (
    <Box
      sx={{
        margin: "100px 0 0 0",
        "@media (max-width: 992px)": {
          margin: "50px 0 0 0",
        },
      }}
    >
      {(offerLoading || rentLoading || saleLoading) && <OverlayLoader />}
      <Grid
        container
        spacing={2}
        sx={{
          "@media (max-width: 900px)": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Grid
          xs={1}
          item
          md={1}
          lg={2}
          sx={{
            "@media (max-width: 900px)": {
              display: "none",
            },
          }}
        ></Grid>

        <Grid item xs={10} md={5} lg={4}>
          <Heading
            sx={{
              fontSize: "45px",
              color: "#334155",
              "@media (max-width: 992px)": {
                fontSize: "35px",
              },
            }}
          >
           Find Your Ideal <span style={{ color: "#64748b" }}>Student Lodge</span>
          </Heading>
          <Heading
            sx={{
              fontSize: "45px",
              color: "#334155",
              "@media (max-width: 992px)": {
                fontSize: "35px",
              },
            }}
          >
            with Ease
          </Heading>
          <SubHeading sx={{ margin: "20px 0", color: "#64748b" }}>
           UNNEstate connects UNN students to comfortable, affordable, and convenient lodges.
Fast search and verified listings.
            <br />
           
           your perfect home is just a click away.
          </SubHeading>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginTop: "25px",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => {
              navigate("/search");
            }}
          >
            <PiShootingStarThin size={25} color="#103e4b" /> Let's Start now...
          </Box>
        </Grid>

        <Grid item xs={10} md={5} lg={4}>
          <Box
            sx={{
              width: "100%",
              height: "350px",
              borderRadius: "5px",
              "@media (max-width: 600px)": {
                height: "250px",
                margin: "20px auto",
              },
            }}
          >
            <img
              src="huzHome.jpg"
              alt="listing"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
          </Box>
        </Grid>

        <Grid
          item
          xs={1}
          md={1}
          lg={2}
          sx={{
            "@media (max-width: 900px)": {
              display: "none",
            },
          }}
        ></Grid>
      </Grid>

      <Grid
        container
        sx={{
          margin: "75px 0",
          "@media (max-width: 600px)": {
            margin: "50px 0",
          },
        }}
      >
        <Grid item xs={12}>
          <Box>
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              speed={1500}
              effect="fade"
            >
              {images?.map((image: any) => (
                <SwiperSlide key={image} style={Banner}>
                  <img
                    src={image}
                    alt="listing"
                    width="100%"
                    height={600}
                    style={{ objectFit: "cover" }}
                    className="swiper-lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          marginBottom: "100px",
          "@media (max-width: 600px)": {
            marginBottom: "10px",
          },
        }}
      >
        <Grid item xs={1} md={1}></Grid>
        <Grid item xs={10} md={10}>
          <Heading sx={{ color: "#475569" }}>Recent Offer</Heading>
          <Box
            sx={{
              color: "#1e40af",
              fontSize: "13px",
              fontWeight: 400,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => {
              navigate(`/search?offer=true`);
            }}
          >
            Show more offers
          </Box>
          <Box sx={{ margin: "15px 0" }}>
            <Grid container spacing={2}>
              {offerData?.data?.map((item: any, index: number) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box key={index}>
                    <Box
                      sx={{
                        background: "#fff",
                        borderRadius: "5px",
                        marginBottom: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(`/listing/${item._id}`);
                      }}
                    >
                      <Box
                        sx={{
                          height: "200px",
                          overflow: "hidden",
                          position: "relative",
                          "&:hover img": {
                            transform: "scale(1.1)",
                          },
                        }}
                      >
                        <img
                          src={item?.imageUrls[0]}
                          alt="listing"
                          height="100%"
                          width="100%"
                          style={{
                            objectFit: "cover",
                            borderRadius: "5px",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </Box>
                      <Box sx={{ padding: "20px 15px" }}>
                        <SubHeading
                          sx={{
                            fontWeight: 600,
                            fontSize: "18px",
                            color: "#334155",
                          }}
                        >
                          {item?.name?.length > 30
                            ? item?.name?.substring(0, 30) + "..."
                            : item?.name}
                        </SubHeading>
                        <Box
                          sx={{
                            marginTop: "5px",
                            color: "#4b5563",
                            fontSize: "13px",
                            fontWeight: 500,
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <FaLocationDot style={{ color: "#15803d" }} />
                          {item?.address}
                        </Box>
                        <Box
                          sx={{
                            marginTop: "5px",
                            color: "#4b5563",
                            fontSize: "13px",
                            height: "55px",
                            "@media (max-width: 600px)": {
                              height: "unset",
                            },
                          }}
                        >
                          {item?.description?.length > 150
                            ? item?.description?.substring(0, 150) + "..."
                            : item?.description}
                        </Box>
                        <Box
                          sx={{
                            color: "#64748b",
                            fontWeight: 600,
                            fontSize: "16px",
                            marginTop: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "5px",
                          }}
                        >
                          ₦{""}
                          {thousandSeparatorNumber(
                            item?.regularPrice - item?.discountedPrice
                          )}{" "}
                          {item?.type === "rent" ? "/ month" : ""}
                          <Box>
                            {item?.type === "rent" ? (
                              <Box
                                sx={{
                                  background: "#0078a5",
                                  fontSize: "12px",
                                  color: "#fff",
                                  borderRadius: "50%",
                                  padding: "5px 10px",
                                  display: "inline-block",
                                }}
                              >
                                Rent
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  background: "#7fb742",
                                  fontSize: "12px",
                                  color: "#fff",
                                  borderRadius: "50%",
                                  padding: "5px 10px",
                                  display: "inline-block",
                                }}
                              >
                                Sale
                              </Box>
                            )}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            marginTop: "7px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box sx={{ display: "flex", gap: 1 }}>
                            <Box sx={iconStyle}>
                              <FaBed
                                style={{ color: "#334155", marginTop: "3px" }}
                              />
                              {item?.bedrooms} Bedroom
                            </Box>
                            <Box sx={iconStyle}>
                              <FaBath
                                style={{ color: "#334155", marginTop: "3px" }}
                              />
                              {item?.bathrooms} Bathroom
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* Rent Data */}
          <Heading sx={{ color: "#475569", marginTop: "20px" }}>
            Places for Rent
          </Heading>
          <Box
            sx={{
              color: "#1e40af",
              fontSize: "13px",
              fontWeight: 400,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => {
              navigate(`/search?type=rent`);
            }}
          >
            Show more offers for rent
          </Box>
          <Box sx={{ margin: "15px 0" }}>
            <Grid container spacing={2}>
              {rentData?.data?.map((item: any, index: number) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                      marginBottom: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/listing/${item._id}`);
                    }}
                  >
                    <Box
                      sx={{
                        height: "200px",
                        overflow: "hidden",
                        position: "relative",
                        "&:hover img": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <img
                        src={item?.imageUrls[0]}
                        alt="listing"
                        height="100%"
                        width="100%"
                        style={{
                          objectFit: "cover",
                          borderRadius: "5px",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </Box>
                    <Box sx={{ padding: "20px 15px" }}>
                      <SubHeading
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#334155",
                        }}
                      >
                        {item?.name?.length > 30
                          ? item?.name?.substring(0, 30) + "..."
                          : item?.name}
                      </SubHeading>
                      <Box
                        sx={{
                          marginTop: "5px",
                          color: "#4b5563",
                          fontSize: "13px",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <FaLocationDot style={{ color: "#15803d" }} />
                        {item?.address}
                      </Box>
                      <Box
                        sx={{
                          marginTop: "5px",
                          color: "#4b5563",
                          fontSize: "13px",
                          height: "55px",
                          "@media (max-width: 600px)": {
                            height: "unset",
                          },
                        }}
                      >
                        {item?.description?.length > 150
                          ? item?.description?.substring(0, 150) + "..."
                          : item?.description}
                      </Box>
                      <Box
                        sx={{
                          color: "#64748b",
                          fontWeight: 600,
                          fontSize: "16px",
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "5px",
                        }}
                      >
                       ₦{thousandSeparatorNumber(item?.regularPrice)}{""}
                        {item?.type === "rent" ? "/ month" : ""}
                        <Box>
                          {item?.type === "rent" ? (
                            <Box
                              sx={{
                                background: "#0078a5",
                                fontSize: "12px",
                                color: "#fff",
                                borderRadius: "50%",
                                padding: "5px 10px",
                                display: "inline-block",
                              }}
                            >
                              Rent
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                background: "#7fb742",
                                fontSize: "12px",
                                color: "#fff",
                                borderRadius: "50%",
                                padding: "5px 10px",
                                display: "inline-block",
                              }}
                            >
                              Sale
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          marginTop: "7px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Box sx={iconStyle}>
                            <FaBed
                              style={{ color: "#334155", marginTop: "3px" }}
                            />
                            {item?.bedrooms} Bedroom
                          </Box>
                          <Box sx={iconStyle}>
                            <FaBath
                              style={{ color: "#334155", marginTop: "3px" }}
                            />
                            {item?.bathrooms} Bathroom
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* Sale Data */}
          <Heading sx={{ color: "#475569", marginTop: "20px" }}>
            Places for Sale
          </Heading>
          <Box
            sx={{
              color: "#1e40af",
              fontSize: "13px",
              fontWeight: 400,
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => {
              navigate(`/search?type=sale`);
            }}
          >
            Show more offers for sale
          </Box>
          <Box sx={{ margin: "15px 0" }}>
            <Grid container spacing={2}>
              {saleData?.data?.map((item: any, index: number) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box
                    sx={{
                      background: "#fff",
                      borderRadius: "5px",
                      marginBottom: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/listing/${item._id}`);
                    }}
                  >
                    <Box
                      sx={{
                        height: "200px",
                        overflow: "hidden",
                        position: "relative",
                        "&:hover img": {
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <img
                        src={item?.imageUrls[0]}
                        alt="listing"
                        height="100%"
                        width="100%"
                        style={{
                          objectFit: "cover",
                          borderRadius: "5px",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </Box>
                    <Box sx={{ padding: "20px 15px" }}>
                      <SubHeading
                        sx={{
                          fontWeight: 600,
                          fontSize: "18px",
                          color: "#334155",
                        }}
                      >
                        {item?.name?.length > 30
                          ? item?.name?.substring(0, 30) + "..."
                          : item?.name}
                      </SubHeading>
                      <Box
                        sx={{
                          marginTop: "5px",
                          color: "#4b5563",
                          fontSize: "13px",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <FaLocationDot style={{ color: "#15803d" }} />
                        {item?.address}
                      </Box>
                      <Box
                        sx={{
                          marginTop: "5px",
                          color: "#4b5563",
                          fontSize: "13px",
                          height: "55px",
                          "@media (max-width: 600px)": {
                            height: "unset",
                          },
                        }}
                      >
                        {item?.description?.length > 150
                          ? item?.description?.substring(0, 150) + "..."
                          : item?.description}
                      </Box>
                      <Box
                        sx={{
                          color: "#64748b",
                          fontWeight: 600,
                          fontSize: "16px",
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "5px",
                        }}
                      >
                        ₦{thousandSeparatorNumber(item?.regularPrice)}{""}
                        {item?.type === "rent" ? "/ month" : ""}
                        <Box>
                          {item?.type === "rent" ? (
                            <Box
                              sx={{
                                background: "#0078a5",
                                fontSize: "12px",
                                color: "#fff",
                                borderRadius: "50%",
                                padding: "5px 10px",
                                display: "inline-block",
                              }}
                            >
                              Rent
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                background: "#7fb742",
                                fontSize: "12px",
                                color: "#fff",
                                borderRadius: "50%",
                                padding: "5px 10px",
                                display: "inline-block",
                              }}
                            >
                              Sale
                            </Box>
                          )}
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          marginTop: "7px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Box sx={iconStyle}>
                            <FaBed
                              style={{ color: "#334155", marginTop: "3px" }}
                            />
                            {item?.bedrooms} Bedroom
                          </Box>
                          <Box sx={iconStyle}>
                            <FaBath
                              style={{ color: "#334155", marginTop: "3px" }}
                            />
                            {item?.bathrooms} Bathroom
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={1} md={1}></Grid>
      </Grid>
    </Box>
  );
};

export default Home;
