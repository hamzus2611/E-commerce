import React from "react";
import { Typography, Button, Divider } from "@mui/material";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentForm = ({
  shippingData,
  checkoutToken,
  backStep,
  onCaptureCheckout,
  nextStep,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;
    const cardElement = elements.getElement(cardElement);
    const { error, paymentMethode } = await stripe.createPaymentMethode({
      type: "card",
      card: cardElement,
    });
    if (error) {
      console.log(error);
    } else {
      const ordreData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastname,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.adress,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_methode: shippingData.shippingOption },
        payment: {
          getway: "stripe",
          stripe: {
            payment_methode_id: paymentMethode.id,
          },
        },
      };
      onCaptureCheckout(checkoutToken.id, ordreData);
      nextStep();
    }
  };
  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterButtom style={{ margin: "20px 0" }}>
        {" "}
        payment methods
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ duspaly: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" Onclick={backStep}>
                  back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
