import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import shopCartContext from "../../context/shopcartContext";
import "./checkoutstep2.css";
import { useSelector, useDispatch } from "react-redux";
import { setLoginData, setUserInfoData } from "../../actions/loginActions";

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

export default function CheckoutStep2() {
  //get data from redux reducer
  const dispatch = useDispatch();
  const shoppingCartData = useSelector((state) => {
    return state?.shoppingCartReducer?.shoppingCartList;
  });
  const userInfoData = useSelector((state) => {
    return state?.loginReducer?.userInfo;
  });

  const [activeStep, setActiveStep] = React.useState(1);
  const [completed, setCompleted] = React.useState({});

  const {
    shoppingCartList,
    setShoppingCartList,
    shippingCost,
    setShippingCost,
  } = useContext(shopCartContext);
  const itemInCart = shoppingCartData;
  //get total price
  const subtotalPriceList = itemInCart?.map((eachitem) => {
    return eachitem.price * eachitem.quantity;
  });
  const initial_subtotalPrice = 0;
  const subtotalPrice = subtotalPriceList.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    initial_subtotalPrice
  );
  let location = useLocation();

  const totalSteps = () => {
    return steps?.length;
  };
  const completedSteps = () => {
    return Object.keys(completed)?.length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };
  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };
  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStep = (step) => () => {
    setActiveStep(step);
  };
  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleShipping = () => {
    shippingCost === 0 ? setShippingCost(50) : setShippingCost(0);
  };
  let totalprice = subtotalPrice + shippingCost;
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
            {steps?.map((label, index) => (
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
            <div className="step1_title">Shipping Details</div>

            <div className="display_shoppingcartlist">
              <Box sx={{ width: "100%" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 3, md: 4 }}
                >
                  <Grid
                    item
                    xs={6}
                    sx={{
                      height: "45px",
                      marginBottom: "60px",
                      padding: "1px solid #c5c5c5!important",
                    }}
                  >
                    <div className="shippinginfo">*Full Name</div>
                    <TextField
                      id="outlined-size-small"
                      defaultValue={
                        // userInfoData?.fullname
                        JSON.parse(localStorage.getItem("fullname"))
                      }
                      size="medium"
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      height: "45px",
                      padding: "1px solid #c5c5c5!important",
                    }}
                  >
                    {" "}
                    <div className="shippinginfo">*Email Address</div>
                    <TextField
                      id="outlined-size-small"
                      defaultValue={
                        JSON.parse(localStorage.getItem("email"))
                        // userInfoData?.email
                      }
                      size="medium"
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      height: "45px",
                      padding: "1px solid #c5c5c5!important",
                    }}
                  >
                    {" "}
                    <div className="shippinginfo">*Shipping Address</div>
                    <TextField
                      id="outlined-size-small"
                      defaultValue=""
                      size="medium"
                      placeholder="Enter Full Shipping Address"
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{
                      height: "45px",
                      padding: "1px solid #c5c5c5!important",
                    }}
                  >
                    {" "}
                    <div className="shippinginfo">*Mobile Number</div>
                    <TextField
                      id="outlined-size-small"
                      defaultValue=""
                      size="medium"
                      sx={{
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </div>
            <div className="shippingoption">
              <div className="shippingoption_butt">Shipping Option</div>
              <div className="shippingoption_cost">
                <Box
                  sx={{
                    bgcolor: "#f1f1f1",
                    height: "80px",
                    marginTop: "20px",
                    border: "1px solid #e1e1e1",
                  }}
                >
                  <FormGroup sx={{}}>
                    <div
                      className="shippingcostBar"
                      onClick={() => handleShipping()}
                    >
                      {shippingCost === 0 ? (
                        <div className="isshipmentcost">
                          <div className="circle">
                            <svg
                              t="1690870206936"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="2259"
                              width="15"
                              height="15"
                            >
                              <path
                                d="M74.24 526.21312a23.04 23.04 0 1 1 35.84-28.9792l215.98208 267.11552a28.16 28.16 0 0 0 41.79968 2.21184L920.6784 214.10304a23.04 23.04 0 0 1 32.57344 32.59392L400.44032 799.1552c-1.8432 1.8432-3.77856 3.584-5.80096 5.21728-31.88736 25.7792-78.63296 20.83328-104.41216-11.04896l-215.98208-267.1104z"
                                fill="#c5c5c5"
                                p-id="2260"
                              ></path>
                            </svg>
                          </div>

                          <div className="shipping_text">
                            International Shipping 7-14 days
                          </div>
                        </div>
                      ) : (
                        <div className="isshipmentcost">
                          <div
                            className="circle"
                            style={{
                              backgroundColor: "black",
                              border: " 2px solid black",
                            }}
                          >
                            <svg
                              t="1690870206936"
                              viewBox="0 0 1024 1024"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              p-id="2259"
                              width="15"
                              height="15"
                            >
                              <path
                                d="M74.24 526.21312a23.04 23.04 0 1 1 35.84-28.9792l215.98208 267.11552a28.16 28.16 0 0 0 41.79968 2.21184L920.6784 214.10304a23.04 23.04 0 0 1 32.57344 32.59392L400.44032 799.1552c-1.8432 1.8432-3.77856 3.584-5.80096 5.21728-31.88736 25.7792-78.63296 20.83328-104.41216-11.04896l-215.98208-267.1104z"
                                fill="white"
                                p-id="2260"
                              ></path>
                            </svg>
                          </div>

                          <div className="shipping_text">
                            International Shipping 7-14 days
                          </div>
                        </div>
                      )}

                      <div className="shippingcost">$50.00</div>
                    </div>
                    {/* <FormControlLabel
                      control={
                       
                      }
                      label="International Shipping 7-14 days"
                      sx={{
                        height: "80px",
                        width: "100%",
                      }}
                    ></FormControlLabel> */}
                  </FormGroup>
                </Box>
              </div>
            </div>
            <React.Fragment>
              <div>
                <div className="shipping_internationalcost">
                  <h3 className="shipping_internationalcost_title">
                    International Shipping
                  </h3>
                  <h4 className="shipping_internationalcost_cost">
                    ${shippingCost}.00
                  </h4>
                </div>
                <div className="shipping_currentsubtotal">
                  <h3 className="shipping_internationalcost_title">Subtotal</h3>
                  <h4 className="shipping_internationalcost_cost">
                    ${subtotalPrice}.00
                  </h4>
                </div>
                <div className="shipping_total">
                  <h3 className="shipping_internationalcost_title">Total</h3>
                  <div className="finalprice">${totalprice}.00</div>
                </div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                    alignItems: "center",
                  }}
                >
                  <Link to="/checkout/step1" style={{ textDecoration: "none" }}>
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
                    to="/checkout/step3"
                    style={{ textDecoration: "none" }}
                    totalprice={totalprice}
                  >
                    <Button
                      onClick={handleNext}
                      sx={{
                        display: "flex",
                      }}
                    >
                      Next Step &nbsp;
                      <svg
                        t="1690677862139"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="3321"
                        width="20"
                        height="20"
                      >
                        <path
                          d="M1024.2048 512c0 6.656-2.4576 13.2608-7.5264 18.2784l-325.8368 325.8368a25.6 25.6 0 1 1-36.1984-36.1984l282.5216-282.5216H25.8048a25.6 25.6 0 1 1 0-51.2h910.9504l-282.112-282.112a25.6 25.6 0 1 1 36.1984-36.1984l325.8368 325.8368c4.608 4.608 7.5264 11.008 7.5264 18.0736V512z"
                          fill="#ffffff"
                          p-id="3322"
                        ></path>
                      </svg>
                    </Button>
                  </Link>
                </Box>
              </div>
            </React.Fragment>
          </div>
        </Box>
      </div>
    </div>
  );
}
