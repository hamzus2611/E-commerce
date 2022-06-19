import React, { useEffect, useState } from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { commerce } from "../../lib/commerce";
import { useForm, FormProvider } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { Link } from "react-router-dom";
const AddressForm = ({ checkoutToken , next}) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingsubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingsubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");
  const methods = useForm();

  const fetchShipingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };
  const fetchShippingoptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    checkoutToken && fetchShipingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingsubdivision)
      fetchShippingoptions(
        checkoutToken.id,
        shippingCountry,
        shippingsubdivision
      );
  }, [shippingsubdivision]);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const subdivisions = Object.entries(shippingsubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((Sho) => ({
    id: Sho.id,
    label: `${Sho.description} - (${Sho.price.formatted_with_symbol})`,
  }));
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Adress
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data)=> next({...data,shippingCountry ,shippingOption,shippingsubdivision}))}>
          <Grid container spacing={3}>
            <CustomTextField required name="firstName" label="First Name" />
            <CustomTextField required name="lastName" label="Last Name" />
            <CustomTextField required name="adress" label="Adress" />
            <CustomTextField required name="email" label="Email" />
            <CustomTextField required name="city" label="City" />
            <CustomTextField required name="zip" label="ZIP/ Postal Code" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingsubdivision}
                fullWidth
                onChange={(e) => setShippingSubdivision(e.target.value)}
              >
                {subdivisions.map((subdivision) => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button Component={Link} to="/cart" variant="outlined">
              Back to cart
            </Button>
            <Button type="Submit" variant="contained" color="primary">
              next
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
