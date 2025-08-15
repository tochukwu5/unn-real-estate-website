// React Imports
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Formik Imports
import { Form, Formik, FormikProps } from "formik";
// MUI Imports
import {
  Box,
  Grid,
  Button,
  FormControlLabel,
  RadioGroup,
  Checkbox,
  Radio,
} from "@mui/material";
// Utils Imports
import { onKeyDown } from "../../utils";
// Firebase Imports

// Redux Imports
import {
  useCreateListingMutation,
  useGetSingleListingQuery,
  useUpdateListingMutation,
} from "../../redux/api/listingApiSlice";
import { selectedUserId } from "../../redux/auth/authSlice";
// Hooks Imports
import useTypedSelector from "../../hooks/useTypedSelector";
// Custom Imports
import { Heading, SubHeading } from "../../components/Heading";
import PrimaryInput from "../../components/PrimaryInput/PrimaryInput";
import { listingSchema } from "./components/validationSchema";
import DotLoader from "../../components/Spinner/dotLoader";
import ToastAlert from "../../components/ToastAlert/ToastAlert";
import OverlayLoader from "../../components/Spinner/OverlayLoader";
import PrimaryPhoneInput from "../../components/PhoneInput";

interface listingForm {
  name: string;
  phoneNumber: string;
  description: string;
  address: string;
  regularPrice: number;
  discountedPrice: number;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  files?: null | any[];
}

const CreateListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = useTypedSelector(selectedUserId);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [formValues, setFormValues] = useState<listingForm>({
    name: "",
    phoneNumber: "",
    description: "",
    address: "",
    regularPrice: 25000,
    discountedPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    offer: false,
    type: "rent",
    files: [],
  });
  const [listingImages, setListingImages] = useState<any[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imageError, setImageError] = useState<boolean | string>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [toast, setToast] = useState({
    message: "",
    appearence: false,
    type: "",
  });

  const handleCloseToast = () => {
    setToast({ ...toast, appearence: false });
  };

  const UploadHandler = () => {
    if (listingImages.length === 0){
      console.log("No images selected");
      return setImageError("Please select an image");
    }
    if (listingImages.length + imageUrls.length < 7) {
      setImageLoading(true);
      const promises = [];
      for (let i = 0; i < listingImages.length; i++) {
        console.log("Uploading image:", listingImages[i].name);
        promises.push(UploadImage(listingImages[i]));
      }

      Promise.all(promises)
        .then((urls: any) => {
          // add more urls to previous ones
          setImageUrls([...imageUrls, ...urls]);
          setImageError(false);
          setImageLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setImageError("Image Upload Failed (2 mb max per image)");
          setImageLoading(false);
        });
    } else {
      setImageError("You can upload only 6 images per listing");
    }
  };

  // UploadImage


  
  // Remove or comment out the Firebase upload function

// Replace it with:

// ======================for cloudinary storage================================

const UploadImage = async (image: any) => {
  return new Promise(async (resolve, reject) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "unsigned_preset"); // replace this

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dgtrh0bl4/upload", // replace this
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        resolve(data.secure_url);
      } else {
        reject("Upload failed");
      }
    } catch (error) {
      reject(error);
    }
  });
};



  // Create Listing API bind
  const [createListing, { isLoading }] = useCreateListingMutation();
  // Update Listing API bind
  const [updateListing, { isLoading: updatingLoading }] =
    useUpdateListingMutation();

  const listingHandler = async (data: listingForm) => {
    const payload = {
      name: data.name,
      description: data.description,
      address: data.address,
      regularPrice: data.regularPrice,
      discountedPrice: data.discountedPrice,
      bathrooms: data.bathrooms,
      bedrooms: data.bedrooms,
      furnished: data.furnished,
      parking: data.parking,
      type: data.type,
      offer: data.offer,
      phoneNumber: data.phoneNumber,
      imageUrls,
      user: userId,
    };
    try {
      if (imageUrls.length < 2)
        return setImageError("Please upload at least 2 image");

      // Update Listing
      if (id) {
        const updatedListing: any = await updateListing({ id, payload });
        if (updatedListing?.data?.status) {
          setToast({
            ...toast,
            message: "Listing Updated Successfully",
            appearence: true,
            type: "success",
          });
          navigate("/listings");
        }
        if (updatedListing?.error) {
          setToast({
            ...toast,
            message: updatedListing?.error?.data?.message,
            appearence: true,
            type: "error",
          });
        }
        return;
      }
      // Create Listing
      const listing: any = await createListing(payload);
      if (listing?.data?.status) {
        setToast({
          ...toast,
          message: "Listing Created Successfully",
          appearence: true,
          type: "success",
        });
        setTimeout(() => {
          navigate("/listings");
        });
      }
      if (listing?.error) {
        setToast({
          ...toast,
          message: listing?.error?.data?.message,
          appearence: true,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Create Listing Error:", error);
      setToast({
        ...toast,
        message: "Something went wrong",
        appearence: true,
        type: "error",
      });
    }
  };

  // Get Single Listing API query
  // const {
  //   data: listingData,
  //   isLoading: listingLoading,
  //   isSuccess: listingSuccess,
  // } = useGetSingleListingQuery(id);

  const {
  data: listingData,
  isLoading: listingLoading,
  isSuccess: listingSuccess,
} = useGetSingleListingQuery(id!, {
  skip: !id, // 🚫 this skips the API call when there's no ID
});

  useEffect(() => {
    if (listingSuccess) {
      setFormValues({
        name: listingData?.data?.name,
        description: listingData?.data?.description,
        address: listingData?.data?.address,
        regularPrice: listingData?.data?.regularPrice,
        discountedPrice: listingData?.data?.discountedPrice,
        bathrooms: listingData?.data?.bathrooms,
        bedrooms: listingData?.data?.bedrooms,
        furnished: listingData?.data?.furnished,
        parking: listingData?.data?.parking,
        type: listingData?.data?.type,
        offer: listingData?.data?.offer,
        phoneNumber: listingData?.data?.phoneNumber,
      });
      setImageUrls(listingData?.data?.imageUrls);
    }
  }, [listingData, listingSuccess]);

  return (
    <Box sx={{ marginTop: "50px" }}>
      {listingLoading && <OverlayLoader />}
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Heading>{id ? "Update" : "Create"} a Listing</Heading>
          </Box>
          <Box sx={{ margin: "30px 0", display: "flex", gap: 2 }}>
            <Formik
              initialValues={formValues}
              onSubmit={(values: listingForm) => {
                listingHandler(values);
              }}
              validationSchema={listingSchema}
              enableReinitialize
            >
              {(props: FormikProps<listingForm>) => {
                const {
                  values,
                  touched,
                  errors,
                  handleBlur,
                  handleChange,
                  setFieldValue,
                } = props;

                return (
                  <Form onKeyDown={onKeyDown} style={{ width: "100%" }}>
                    <Box 
                    // sx={{ display: "flex", gap: 2 }}
                    sx={{
  display: "flex",
  flexDirection: { xs: "column", sm: "row" }, // column on mobile, row on larger screens
  gap: 2, // spacing between items (applies both vertically and horizontally)
  mt: { xs: 2, sm: 0 } // margin-top only on mobile
}}

                    >
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            height:
                              errors.name && touched.name ? "95px" : "90px",
                          }}
                        >
                          <SubHeading sx={{ marginBottom: "5px" }}>
                            Name
                          </SubHeading>
                          <PrimaryInput
                            type="text"
                            label=""
                            name="name"
                            placeholder="Name"
                            value={values.name}
                            helperText={
                              errors.name && touched.name ? errors.name : ""
                            }
                            error={errors.name && touched.name ? true : false}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Box>
                        <Box>
                          <SubHeading sx={{ marginBottom: "5px" }}>
                            Description
                          </SubHeading>
                          <PrimaryInput
                            type="text"
                            label=""
                            name="description"
                            placeholder="Description"
                            multiline={true}
                            minRows={3}
                            value={values.description}
                            helperText={
                              errors.description && touched.description
                                ? errors.description
                                : ""
                            }
                            error={
                              errors.description && touched.description
                                ? true
                                : false
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            gap: 1,
                          }}
                        >
                          <Box
                            sx={{
                              height: "85px",
                              marginTop:
                                errors.description && touched.description
                                  ? "0"
                                  : "15px",
                              width: "50%",
                            }}
                          >
                            <SubHeading sx={{ marginBottom: "5px" }}>
                              Address
                            </SubHeading>
                            <PrimaryInput
                              type="text"
                              label=""
                              name="address"
                              placeholder="Address"
                              value={values.address}
                              helperText={
                                errors.address && touched.address
                                  ? errors.address
                                  : ""
                              }
                              error={
                                errors.address && touched.address ? true : false
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "50%",
                            }}
                          >
                            <SubHeading sx={{ marginBottom: "5px" }}>
                              Contact Number
                            </SubHeading>

                            <PrimaryPhoneInput
                              value={values.phoneNumber}
                              name="phoneNumber"
                              formik={props}
                              variant="outlined"
                              label=""
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            width: "100%",
                            marginTop:
                              errors.address && touched.address ? "10px" : "",
                          }}
                        >
                          <Box sx={{ width: "100%" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>
                              Bedroom
                            </SubHeading>
                            <PrimaryInput
                              type="number"
                              label=""
                              name="bedrooms"
                              placeholder="Beds"
                              value={values.bedrooms}
                              helperText={
                                errors.bedrooms && touched.bedrooms
                                  ? errors.bedrooms
                                  : ""
                              }
                              error={
                                errors.bedrooms && touched.bedrooms
                                  ? true
                                  : false
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                          <Box sx={{ width: "100%" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>
                              Bathroom
                            </SubHeading>
                            <PrimaryInput
                              type="number"
                              label=""
                              name="bathrooms"
                              placeholder="Baths"
                              value={values.bathrooms}
                              helperText={
                                errors.bathrooms && touched.bathrooms
                                  ? errors.bathrooms
                                  : ""
                              }
                              error={
                                errors.bathrooms && touched.bathrooms
                                  ? true
                                  : false
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            width: "100%",
                            marginTop: "10px",
                          }}
                        >
                          <Box sx={{ width: "50%" }}>
                            <SubHeading sx={{ marginBottom: "5px" }}>
                              Regular Price{" "}
                              {values.type === "Rent" ? (
                                <span
                                  style={{
                                    marginLeft: "5px",
                                    fontSize: "12px",
                                  }}
                                >
                                  (Rs./ Month)
                                </span>
                              ) : (
                                <span
                                  style={{
                                    marginLeft: "5px",
                                    fontSize: "12px",
                                  }}
                                >
                                  (₦)
                                </span>
                              )}
                            </SubHeading>
                            <PrimaryInput
                              type="number"
                              label=""
                              name="regularPrice"
                              placeholder="Regular Price"
                              value={values.regularPrice}
                              helperText={
                                errors.regularPrice && touched.regularPrice
                                  ? errors.regularPrice
                                  : ""
                              }
                              error={
                                errors.regularPrice && touched.regularPrice
                                  ? true
                                  : false
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Box>
                          {values.offer && (
                            <Box sx={{ width: "50%" }}>
                              <SubHeading sx={{ marginBottom: "5px" }}>
                                Discounted Price
                              </SubHeading>

                              <PrimaryInput
                                type="number"
                                label=""
                                name="discountedPrice"
                                placeholder="Discounted Price"
                                value={values.discountedPrice}
                                helperText={
                                  errors.discountedPrice &&
                                  touched.discountedPrice
                                    ? errors.discountedPrice
                                    : ""
                                }
                                error={
                                  errors.discountedPrice &&
                                  touched.discountedPrice
                                    ? true
                                    : false
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                            </Box>
                          )}
                        </Box>
                        <Box sx={{ marginTop: "7px" }}>
                          <RadioGroup
                            name="type"
                            value={values.type}
                            onChange={handleChange}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <FormControlLabel
                                value="rent"
                                control={<Radio />}
                                label="Rent"
                              />
                              <FormControlLabel
                                value="sale"
                                control={<Radio />}
                                label="Sale"
                              />
                            </Box>
                          </RadioGroup>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Water supply"
                              name="parking"
                              checked={values.parking}
                              onChange={handleChange}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Furnished"
                              name="furnished"
                              checked={values.furnished}
                              onChange={handleChange}
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label="Offer"
                              name="offer"
                              checked={values.offer}
                              onChange={handleChange}
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ marginTop: "25px" }}>
                          <SubHeading sx={{ marginBottom: "10px" }}>
                            Images :
                            <span
                              style={{
                                marginLeft: "5px",
                                color: "#4b5563",
                                fontWeight: "normal",
                              }}
                            >
                              The first image will be the cover (max 6)
                            </span>
                          </SubHeading>
                          <Box
                            // sx={{
                            //   display: "flex",
                            //   alignItems: "center",
                            //   justifyContent: "space-between",
                            //   gap: 2,
                            // }}

                            sx={{
  display: "flex",
  flexDirection: { xs: "column", sm: "row" }, // column on mobile, row from sm and up
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
}}

                          >
                            <Box
                              sx={{
                                border: "1px solid #ccc",
                                padding: "10px",
                                borderRadius: "5px",
                                width: "100%",
                              }}
                            >
                              <input
                                type="file"
                                name="files"
                                onChange={(event) => {
                                  const fileList: any =
                                    event.currentTarget.files;
                                  const fileArray = Array.from(fileList);
                                  setFieldValue("files", fileArray);
                                  setListingImages(fileArray);
                                  if (imageUrls.length < 3) {
                                    if (fileArray.length === 0) {
                                      setImageError("Please select an image");
                                    } else {
                                      setImageError("");
                                    }
                                  }
                                }}
                                multiple
                                accept="image/*"
                              />
                            </Box>
                            <Button
                              variant="outlined"
                              color="success"
                              sx={{
                                textTransform: "capitalize",
                                width: "100px",
                                lineHeight: "0",
                                height: "40px",
                              }}
                              onClick={UploadHandler}
                              disabled={imageLoading}
                            >
                              {imageLoading ? (
                                <DotLoader color="#334155" size={12} />
                              ) : (
                                "Upload"
                              )}
                            </Button>
                          </Box>
                          {touched.files && errors.files && (
                            <Box
                              sx={{
                                fontSize: "12px",
                                color: "#d32f2f",
                                marginTop: "5px",
                              }}
                            >
                              {errors.files}
                            </Box>
                          )}
                          <Box
                            sx={{
                              fontSize: "12px",
                              color: "#d32f2f",
                              marginTop: "5px",
                            }}
                          >
                            {imageError}
                          </Box>
                          {imageUrls.length > 0 &&
                            imageUrls.map((url, index) => (
                              <Box
                                sx={{
                                  margin: "15px 0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  border: "1px solid #ccc",
                                  padding: "10px",
                                  borderRadius: "5px",
                                }}
                                key={index}
                              >
                                <Box>
                                  <img
                                    src={url}
                                    alt="listing"
                                    style={{
                                      width: "100%",
                                      height: "100px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </Box>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  sx={{
                                    textTransform: "capitalize",
                                    border: "none",
                                    "&:hover": {
                                      border: "none",
                                    },
                                  }}
                                  onClick={() => {
                                    const newUrls = imageUrls.filter(
                                      (imageUrl) => imageUrl !== url
                                    );
                                    setImageUrls(newUrls);
                                  }}
                                >
                                  Delete
                                </Button>
                              </Box>
                            ))}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "end",
                              marginTop: "20px",
                            }}
                          >
                            <Button
                              type="submit"
                              variant="contained"
                              fullWidth
                              disabled={isLoading || updatingLoading}
                              sx={{
                                padding: "5px 30px",
                                textTransform: "capitalize",
                                margin: "0 0 20px 0",
                                background: "#334155",
                                height: "40px",
                                color: "#fff",
                                lineHeight: "0",
                                "&:hover": {
                                  background: "#334155",
                                },
                              }}
                            >
                              {isLoading || updatingLoading ? (
                                <DotLoader color="#fff" size={12} />
                              ) : (
                                <>{id ? "Update Listing" : "Create Listing"}</>
                              )}
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <ToastAlert
        appearence={toast.appearence}
        type={toast.type}
        message={toast.message}
        handleClose={handleCloseToast}
      />
    </Box>
  );
};

export default CreateListing;
