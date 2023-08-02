import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import shopCartContext from "../../context/shopcartContext";
import "./checkoutstep3.css";
import Paymentoption from "./paymentoption/paymentoption";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const steps = ["Order Summary", "Shopping Detials", "Payment"];
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function CheckoutStep3() {
  const [activeStep, setActiveStep] = React.useState(2);
  const [completed, setCompleted] = React.useState({});
  const {
    shoppingCartList,
    setShoppingCartList,
    shippingCost,
    setShippingCost,
  } = useContext(shopCartContext);
  const itemInCart = shoppingCartList;
  //get total price
  const subtotalPriceList = itemInCart.map((eachitem) => {
    return eachitem.price * eachitem.quantity;
  });
  const initial_subtotalPrice = 0;
  const subtotalPrice = subtotalPriceList.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initial_subtotalPrice
  );

  const totalSteps = () => {
    return steps.length;
  };
  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const handleNext = () => {
    setShoppingCartList([]);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  // const handleReset = () => {
  //   setActiveStep(0);
  //   setCompleted({});
  // };

  return (
    <div>
      <div className="checkout_Container">
        <Box
          sx={{
            width: "50%",
            backgroundColor: "white",
            margin: "0 auto",
            minWidth: "650px",
          }}
        >
          {/* checkout 栏目 */}
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton
                  // onClick={handleStep(index)}
                  sx={{ width: "150px", height: "30px" }}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            <div className="step1_title">Payment</div>
            <div className="paymentoption_butt">Payment Option</div>
          </div>
          <Paymentoption />
          <div className="paymentinformation">
            <h3 className="payment_title">Total</h3>
            <h4 className="payment_cost">${shippingCost + subtotalPrice}.00</h4>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              pt: 2,
              alignItems: "center",
            }}
          >
            <Link to="/checkout/step2" style={{ textDecoration: "none" }}>
              <button onClick={handleComplete} className="goback">
                <svg
                  t="1690684526879"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3076"
                  width="20"
                  height="20"
                >
                  <path
                    d="M896 544H250.4l242.4 242.4L448 832 173.6 557.6 128 512l45.6-45.6L448 192l45.6 45.6L250.4 480H896v64z"
                    p-id="3077"
                    fill="#7d7d7d"
                  ></path>
                </svg>
                &nbsp; Go Back
              </button>
            </Link>

            <Box sx={{ flex: "1 1 auto" }} />
            <Link
              to="/checkout/confirmation"
              style={{ textDecoration: "none" }}
            >
              <Button
                onClick={handleNext}
                sx={{
                  display: "flex",
                }}
              >
                <svg
                  t="1690835939538"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2262"
                  width="20"
                  height="20"
                >
                  <path
                    d="M74.24 526.21312a23.04 23.04 0 1 1 35.84-28.9792l215.98208 267.11552a28.16 28.16 0 0 0 41.79968 2.21184L920.6784 214.10304a23.04 23.04 0 0 1 32.57344 32.59392L400.44032 799.1552c-1.8432 1.8432-3.77856 3.584-5.80096 5.21728-31.88736 25.7792-78.63296 20.83328-104.41216-11.04896l-215.98208-267.1104z"
                    fill="#ffffff"
                    p-id="2263"
                  ></path>
                </svg>
                &nbsp; Confirm
              </Button>
            </Link>
          </Box>
        </Box>
      </div>
    </div>
  );
}
