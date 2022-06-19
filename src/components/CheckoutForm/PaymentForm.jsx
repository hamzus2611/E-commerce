import React from 'react'
import { Typography , Button ,Divider} from"@mui/material"
import {Elements , CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'
const stripePromise=loadStripe('...')
const PaymentForm = ({shippingData, checkoutToken ,backStep}) => {
  return (
    <>
            <Review checkoutToken={checkoutToken}/>
            <Divider />
            <Typography variant="h6" gutterButtom style={{margin : '20px 0'}}> payment methods</Typography>
            <Elements stripe={stripePromise}>
                <ElementsConsumer>
                    {({elements , stripe})=>(
                        <form>
                            <CardElement />
                            <br /><br />
                            <div style={{duspaly:'flex', justifyContent:'space-between'}}>
                                <Button variant='outlined' Onclick={backStep}>back</Button>
                                <Button type="submit" variant='contained' disabled={!stripe} color="primary">
                                    Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                                </Button>
                            </div>
                        </form>
                            
                    )}
                </ElementsConsumer>
            </Elements>
    </>
  )
}

export default PaymentForm