import React, { useEffect } from "react";
import { commerce } from "../../../lib/commerce";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import useStyle from "./styles";
import { useState } from "react";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
const steps = ["Shipping adress", "payment details"];
const Checkout = ({ cart }) => {
  const classes = useStyle();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);

  const Conformation = () => <div>confirmation</div>;
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );
  return (
    <>
      <div className={classes.toolbar} />
      <main classesName={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? <Conformation /> : <Form />}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
