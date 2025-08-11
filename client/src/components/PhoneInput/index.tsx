import "react-phone-input-2/lib/material.css";
import MuiPhoneNumber, { MuiPhoneNumberProps } from "material-ui-phone-number";
import { removeDashAndSpace } from "../../utils";
import { useEffect, useState } from "react";
import axios from "axios";

interface PhoneNumberProps {
  value: string;
  name: string;
  onChange?: (value: string) => void;
  countryCode?: string;
  variant?: "standard" | "outlined" | "filled";
  label?: string;
  formik?: any;
  authScreens?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  showErrorMessage?: boolean;
}

interface GeoLocationResponse {
  country_code: string;
}

const PrimaryPhoneInput = ({
  value,
  name,
  onChange,
  countryCode,
  variant,
  label,
  formik,
  authScreens,
  disabled,
  readOnly,
  showErrorMessage,
}: PhoneNumberProps) => {
  const [defaultCountry, setDefaultCountry] = useState<string>("pk");
  const [loader, setLoader] = useState(false);

  const getCountry = async () => {
    try {
      setLoader(true);
      const response = await axios.get<GeoLocationResponse>(
        "https://geolocation-db.com/json/67273a00-5c4b-11ed-9204-d161c2da74ce"
      );

      if (
        response.data?.country_code &&
        response.data.country_code !== "Not found"
      ) {
        setDefaultCountry(response.data.country_code.toLowerCase());
      } else {
        setDefaultCountry("pk");
      }
    } catch (error) {
      console.warn(error);
      setDefaultCountry("pk");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (authScreens) {
      getCountry();
    }
  }, [authScreens]);

  return (
    <MuiPhoneNumber
      {...( {
        sx: {
          width: "100% !important",
          background: "#fff",
          height: "49px",
          "& .MuiOutlinedInput-root": {
            height: "49px !important",
          },
          "& .MuiFormHelperText-root.Mui-error": {
            margin: "0",
          },
        },
        defaultCountry:
          countryCode ? countryCode.toLowerCase() : defaultCountry || "pk",
        onChange: (phoneValue: string) => {
          if (onChange) {
            onChange(phoneValue);
          } else {
            formik?.setFieldValue(name, removeDashAndSpace(phoneValue));
          }
        },
        name,
        value,
        variant: variant ?? "outlined",
        label,
        error: formik?.touched[name] && Boolean(formik?.errors[name]),
        helperText:
          showErrorMessage === false
            ? ""
            : formik?.touched[name] && formik?.errors[name],
        onBlur: formik?.handleBlur,
        disabled,
        disableDropdown: loader || disabled,
        inputProps: {
          readOnly: readOnly,
          style: { cursor: readOnly ? "not-allowed" : "" },
        },
      } as unknown as MuiPhoneNumberProps) }
    />
  );
};

export default PrimaryPhoneInput;
