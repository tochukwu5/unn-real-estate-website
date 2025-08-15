// // React Imports
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// // Material UI Imports
// import {
//   Box,
//   Avatar,
//   Grid,
//   IconButton,
//   MenuItem,
//   Menu,
//   styled,
//   MenuProps,
//   Tooltip,
// } from "@mui/material";
// // Component Imports
// import { Heading } from "../Heading";
// import SearchBar from "../SearchBar";
// // Hooks Imports
// import useTypedSelector from "../../hooks/useTypedSelector";
// // Redux Imports
// import {
//   selectedUserAvatar,
//   selectedUserName,
//   setUser,
// } from "../../redux/auth/authSlice";
// // Icons Imports
// import { ImProfile } from "react-icons/im";
// import { IoLogOutOutline } from "react-icons/io5";
// import {
//   selectedSearchText,
//   setSearchText,
// } from "../../redux/global/globalSlice";

// const menuStyle = {
//   cursor: "pointer",
//   "&:hover": {
//     textDecoration: "underline",
//   },
// };

// const StyledMenu = styled((props: MenuProps) => (
//   <Menu
//     elevation={0}
//     anchorOrigin={{
//       vertical: "bottom",
//       horizontal: "right",
//     }}
//     transformOrigin={{
//       vertical: "top",
//       horizontal: "right",
//     }}
//     {...props}
//   />
// ))(() => ({
//   "& .MuiPaper-root": {
//     borderRadius: 12,
//     width: 250,
//     background: "#fff",
//     color: "#334155",
//     boxShadow:
//       "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
//     "& .MuiMenu-list": {
//       padding: "10px 5px",
//     },
//     "& .MuiMenuItem-root": {
//       "& .MuiSvgIcon-root": {
//         fontSize: 18,
//       },
//     },
//   },
// }));

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const avatar = useTypedSelector(selectedUserAvatar);
//   const userName = useTypedSelector(selectedUserName);
//   const searchText = useTypedSelector(selectedSearchText);

//   const [anchorEl, setAnchorEl] = useState<Element | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = (event: any) => {
//     let value = event.target.value.toLowerCase();
//     dispatch(setSearchText(value));
//     setSearchTerm(value);
//   };

//   const handleSubmit = (e: any) => {
//     e.preventDefault();
//     const urlParams = new URLSearchParams(window.location.search);
//     urlParams.set("searchTerm", searchTerm);
//     const searchQuery = urlParams.toString();
//     navigate(`/search?${searchQuery}`);
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const searchTextFromUrl = urlParams.get("searchTerm");
//     if (searchTextFromUrl) {
//       dispatch(setSearchText(searchTextFromUrl));
//       setSearchTerm(searchTextFromUrl);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [window.location.search]);

//   return (
//     <header>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           background: "#e2e8f0",
//           height: "66px",
//           padding: "0 100px",
//           boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
//         }}
//       >
//         <Grid
//           container
//           spacing={2}
//           sx={{ display: "flex", alignItems: "center" }}
//         >
//           <Grid item xs={4}>
//             <Box
//               onClick={() => {
//                 navigate("/");
//               }}
//               sx={{ display: "flex", cursor: "pointer" }}
//             >
//                 <img
//     src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn6AtO-QbtwxxvPHuQrxqpBy_yHoVkzxbRGA&s'}
//     alt="Logo"
//     style={{ width: "40px", height: "40px", borderRadius: "5px", marginRight:"8px" }}
//   />
//               <Heading sx={{ color: "#64748b" }}> UNN</Heading>
//               <Heading sx={{ color: "#334155" }}>Estate</Heading>
//             </Box>
//           </Grid>
//           <Grid item xs={4}>
//             <form onSubmit={handleSubmit}>
//               <SearchBar
//                 placeholder="Search..."
//                 searchText={searchText}
//                 handleSearch={handleSearch}
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//             </form>
//           </Grid>
//           <Grid item xs={4}>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//                 justifyContent: "end",
//               }}
//             >
//               <Box
//                 sx={menuStyle}
//                 onClick={() => {
//                   navigate("/");
//                 }}
//               >
//                 Home
//               </Box>
//               <Box
//                 sx={menuStyle}
//                 onClick={() => {
//                   navigate("/about");
//                 }}
//               >
//                 About
//               </Box>
//               {avatar ? (
//                 <>
//                   <Box
//                     sx={menuStyle}
//                     onClick={() => {
//                       navigate("/listings");
//                     }}
//                   >
//                     Listings
//                   </Box>
//                   <Box
//                     sx={menuStyle}
//                     onClick={() => {
//                       navigate("/create-listing");
//                     }}
//                   >
//                     Create Listing
//                   </Box>
//                   <Box sx={{ cursor: "pointer" }}>
//                     <IconButton
//                       onClick={(e) => setAnchorEl(e.currentTarget)}
//                       color="inherit"
//                     >
//                       <Avatar alt="User Avatar" src={avatar} />
//                     </IconButton>
//                     <StyledMenu
//                       onClick={() => setAnchorEl(null)}
//                       anchorEl={anchorEl}
//                       open={Boolean(anchorEl)}
//                     >
//                       <MenuItem
//                         sx={{
//                           "&:hover": {
//                             background: "unset",
//                             cursor: "unset",
//                           },
//                         }}
//                       >
//                         <Box
//                           sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                         >
//                           <img
//                             height={30}
//                             width={30}
//                             src={avatar}
//                             alt="user"
//                             style={{ borderRadius: "50%" }}
//                           />
//                           <Box>{userName}</Box>
//                         </Box>
//                       </MenuItem>
//                       <MenuItem
//                         sx={{
//                           "&:hover": {
//                             background: "unset",
//                           },
//                         }}
//                       >
//                         <Box
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between",
//                             width: "100%",
//                             gap: "3px",
//                             marginTop: "5px",
//                           }}
//                         >
//                           <Tooltip title="See Profile" placement="bottom">
//                             <Box
//                               sx={{
//                                 background: "#eff1f7",
//                                 borderTopLeftRadius: "12px",
//                                 borderBottomLeftRadius: "12px",
//                                 width: "100%",
//                                 padding: "5px 10px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 1,
//                               }}
//                               onClick={() => {
//                                 navigate("/profile");
//                               }}
//                             >
//                               <ImProfile />
//                               Profile
//                             </Box>
//                           </Tooltip>
//                           <Tooltip title="Logout Profile" placement="bottom">
//                             <Box
//                               sx={{
//                                 background: "#eff1f7",
//                                 borderTopRightRadius: "12px",
//                                 borderBottomRightRadius: "12px",
//                                 width: "100%",
//                                 padding: "5px 10px",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: 1,
//                               }}
//                               onClick={() => {
//                                 dispatch(setUser(null));
//                                 localStorage.removeItem("user");
//                                 setAnchorEl(null);
//                                 navigate("/");
//                               }}
//                             >
//                               <IoLogOutOutline /> Logout
//                             </Box>
//                           </Tooltip>
//                         </Box>
//                       </MenuItem>
//                     </StyledMenu>
//                   </Box>
//                 </>
//               ) : (
//                 <Box
//                   sx={menuStyle}
//                   onClick={() => {
//                     navigate("/login");
//                   }}
//                 >
//                   Log in
//                 </Box>
//               )}
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </header>
//   );
// };

// export default Header;







// React Imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// Material UI Imports
import {
  Box,
  Avatar,
  Grid,
  IconButton,
  MenuItem,
  Menu,
  styled,
  MenuProps,
  Tooltip,
} from "@mui/material";
// Component Imports
import { Heading } from "../Heading";
import SearchBar from "../SearchBar";
// Hooks Imports
import useTypedSelector from "../../hooks/useTypedSelector";
// Redux Imports
import {
  selectedUserAvatar,
  selectedUserName,
  setUser,
} from "../../redux/auth/authSlice";
// Icons Imports
import { ImProfile } from "react-icons/im";
import { IoLogOutOutline } from "react-icons/io5";
import {
  selectedSearchText,
  setSearchText,
} from "../../redux/global/globalSlice";

const menuStyle = {
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
};

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(() => ({
  "& .MuiPaper-root": {
    borderRadius: 12,
    width: 250,
    background: "#fff",
    color: "#334155",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "10px 5px",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
      },
    },
  },
}));

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatar = useTypedSelector(selectedUserAvatar);
  const userName = useTypedSelector(selectedUserName);
  const searchText = useTypedSelector(selectedSearchText);

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // NEW

  const handleSearch = (event: any) => {
    let value = event.target.value.toLowerCase();
    dispatch(setSearchText(value));
    setSearchTerm(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTextFromUrl = urlParams.get("searchTerm");
    if (searchTextFromUrl) {
      dispatch(setSearchText(searchTextFromUrl));
      setSearchTerm(searchTextFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.search]);

  return (
    <header>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#e2e8f0",
          height: "66px",
          padding: { xs: "0 16px", md: "0 100px" }, // responsive padding
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Logo */}
        <Box
          onClick={() => {
            navigate("/");
          }}
          sx={{ display: "flex", cursor: "pointer", alignItems: "center" }}
        >
          <img
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn6AtO-QbtwxxvPHuQrxqpBy_yHoVkzxbRGA&s"
            }
            alt="Logo"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "5px",
              marginRight: "8px",
            }}
          />
          <Heading sx={{ color: "#64748b" }}> UNN</Heading>
          <Heading sx={{ color: "#334155" }}>Estate</Heading>
        </Box>

        {/* Desktop Search Bar */}
        <Box sx={{ display: { xs: "none", md: "block" }, flex: 1, mx: 2 }}>
          <form onSubmit={handleSubmit}>
            <SearchBar
              placeholder="Search..."
              searchText={searchText}
              handleSearch={handleSearch}
              value={searchTerm}
              onChange={handleSearch}
            />
          </form>
        </Box>

        {/* Desktop Menu */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box sx={menuStyle} onClick={() => navigate("/")}>
            Home
          </Box>
          <Box sx={menuStyle} onClick={() => navigate("/about")}>
            About
          </Box>
          {avatar ? (
            <>
              <Box sx={menuStyle} onClick={() => navigate("/listings")}>
                Listings
              </Box>
              <Box sx={menuStyle} onClick={() => navigate("/create-listing")}>
                Create Listing
              </Box>
              <Box sx={{ cursor: "pointer" }}>
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  color="inherit"
                >
                  <Avatar alt="User Avatar" src={avatar} />
                </IconButton>
                <StyledMenu
                  onClick={() => setAnchorEl(null)}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                >
                  <MenuItem
                    sx={{
                      "&:hover": { background: "unset", cursor: "unset" },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <img
                        height={30}
                        width={30}
                        src={avatar}
                        alt="user"
                        style={{ borderRadius: "50%" }}
                      />
                      <Box>{userName}</Box>
                    </Box>
                  </MenuItem>
                  <MenuItem sx={{ "&:hover": { background: "unset" } }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        gap: "3px",
                        marginTop: "5px",
                      }}
                    >
                      <Tooltip title="See Profile" placement="bottom">
                        <Box
                          sx={{
                            background: "#eff1f7",
                            borderTopLeftRadius: "12px",
                            borderBottomLeftRadius: "12px",
                            width: "100%",
                            padding: "5px 10px",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                          onClick={() => navigate("/profile")}
                        >
                          <ImProfile />
                          Profile
                        </Box>
                      </Tooltip>
                      <Tooltip title="Logout Profile" placement="bottom">
                        <Box
                          sx={{
                            background: "#eff1f7",
                            borderTopRightRadius: "12px",
                            borderBottomRightRadius: "12px",
                            width: "100%",
                            padding: "5px 10px",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                          onClick={() => {
                            dispatch(setUser(null));
                            localStorage.removeItem("user");
                            setAnchorEl(null);
                            navigate("/");
                          }}
                        >
                          <IoLogOutOutline /> Logout
                        </Box>
                      </Tooltip>
                    </Box>
                  </MenuItem>
                </StyledMenu>
              </Box>
            </>
          ) : (
            <Box sx={menuStyle} onClick={() => navigate("/login")}>
              Log in
            </Box>
          )}
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          sx={{ display: { xs: "block", md: "none" } }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </IconButton>
      </Box>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            background: "#fff",
            borderTop: "1px solid #ddd",
          }}
        >
          <Box sx={menuStyle} p={2} onClick={() => navigate("/")}>
            Home
          </Box>
          <Box sx={menuStyle} p={2} onClick={() => navigate("/about")}>
            About
          </Box>
          {avatar ? (
            <>
              <Box sx={menuStyle} p={2} onClick={() => navigate("/listings")}>
                Listings
              </Box>
              <Box
                sx={menuStyle}
                p={2}
                onClick={() => navigate("/create-listing")}
              >
                Create Listing
              </Box>
              <Box p={2} onClick={() => navigate("/profile")}>
                Profile
              </Box>
              <Box
                p={2}
                onClick={() => {
                  dispatch(setUser(null));
                  localStorage.removeItem("user");
                  navigate("/");
                }}
              >
                Logout
              </Box>
            </>
          ) : (
            <Box sx={menuStyle} p={2} onClick={() => navigate("/login")}>
              Log in
            </Box>
          )}
        </Box>
      )}
    </header>
  );
};

export default Header;
