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
  CssBaseline,
} from "@mui/material";
import useStyle from "./styles";
import { useState } from "react";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { Link, useNavigate } from "react-router-dom";
const steps = ["Shipping adress", "payment details"];
const Checkout = ({ cart, ordre, onCaptureCheckout, error }) => {
  const classes = useStyle();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [timeOut, setTimeOut] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const history = useNavigate();

  const timeout = () => {
    setTimeOut(() => {
      setIsFinish(true)
    }, 3000);
  };

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {
        history.pushState("/");
      }
    };
    generateToken();
  }, [cart]);
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const next = (data) => {
    setShippingData(data);
    nextStep();
  };
  let Conformation = () =>
    ordre.customer ? (
      <>
        <CssBaseline />
        <div>
          <Typography variant="h5">
            {" "}
            Thank you for your pruchase , {ordre.customer.firstname}{" "}
            {ordre.customer.lasttname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            {" "}
            Order ref : {ordre.customer_referance}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  if (error) {
    <>
      <Typography variant="h5">{error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>;
  }
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
      />
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
