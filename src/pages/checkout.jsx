import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "../components/checkoutstep/checkout.css";
import shopCartContext from "../context/shopcartContext";

import CheckoutStep1 from "../components/checkoutstep/checkoutstep1";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  createTheme,
  PaletteColorOptions,
  ThemeProvider,
} from "@mui/material/styles";
import { Stack } from "@mui/material";

const steps = ["Order Summary", "Shopping Detials", "Payment"];

// export default function Checkout() {
//   return (
//     <div>
//       <div
//         style={{ width: "500px", height: "500px", backgroundColor: "pink" }}
//       ></div>

//       {/* <Link to="/checkout/step1">
//         <button>JUmp to 1</button>
//       </Link> */}
//       <Outlet></Outlet>
//     </div>
//   );
// }
export default function Checkout() {
  return (
    <div>
      <Outlet>
        <CheckoutStep1 />
      </Outlet>
    </div>
  );
  // const [activeStep, setActiveStep] = React.useState(0);
  // const [completed, setCompleted] = React.useState({});
  // const { shoppingCartList, setShoppingCartList } = useContext(shopCartContext);
  // const itemInCart = shoppingCartList;
  // //get total price
  // const subtotalPriceList = itemInCart.map((eachitem) => {
  //   return eachitem.price * eachitem.quantity;
  // });
  // const initial_subtotalPrice = 0;
  // const subtotalPrice = subtotalPriceList.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue,
  //   initial_subtotalPrice
  // );
  // let location = useLocation();
  // const totalSteps = () => {
  //   return steps.length;
  // };
  // const completedSteps = () => {
  //   return Object.keys(completed).length;
  // };
  // const isLastStep = () => {
  //   return activeStep === totalSteps() - 1;
  // };
  // const allStepsCompleted = () => {
  //   return completedSteps() === totalSteps();
  // };
  // const handleNext = () => {
  //   const newActiveStep =
  //     isLastStep() && !allStepsCompleted()
  //       ? // It's the last step, but not all steps have been completed,
  //         // find the first step that has been completed
  //         steps.findIndex((step, i) => !(i in completed))
  //       : activeStep + 1;
  //   setActiveStep(newActiveStep);
  // };
  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };
  // const handleStep = (step) => () => {
  //   setActiveStep(step);
  // };
  // const handleComplete = () => {
  //   const newCompleted = completed;
  //   newCompleted[activeStep] = true;
  //   setCompleted(newCompleted);
  //   handleNext();
  // };
  // const handleReset = () => {
  //   setActiveStep(0);
  //   setCompleted({});
  // };
  // return (
  //   <div className="checkout_Container">
  //     <button color="steelBlue" variant="contained">
  //       Click
  //     </button>
  //     <Box
  //       sx={{
  //         width: "50%",
  //         backgroundColor: "white",
  //         margin: "0 auto",
  //         minWidth: "650px",
  //       }}
  //     >
  //       <Stepper nonLinear activeStep={activeStep}>
  //         {steps.map((label, index) => (
  //           <Step key={label} completed={completed[index]}>
  //             <StepButton
  //               onClick={handleStep(index)}
  //               sx={{ width: "150px", height: "30px" }}
  //             >
  //               {label}
  //             </StepButton>
  //           </Step>
  //         ))}
  //       </Stepper>
  //       <div>
  //         {allStepsCompleted() ? (
  //           <React.Fragment>
  //             {/* <Typography sx={{ mt: 2, mb: 1 }}>
  //               All steps completed - you&apos;re finished
  //             </Typography> */}
  //             {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
  //               <Box sx={{ flex: "1 1 auto" }} />
  //               <Button onClick={handleReset}>Reset</Button>
  //             </Box> */}
  //           </React.Fragment>
  //         ) : (
  //           <React.Fragment>
  //             <div>
  //               {/* <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
  //                 Continue Shopping {activeStep + 1}
  //               </Typography> */}
  //               <h3 className="checkout_subtotal">Subtotal</h3>
  //               <h4 className="checkout_amount">${subtotalPrice}</h4>
  //               <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
  //                 {location.pathname === "/checkout/step1" ? (
  //                   <>
  //                     <Link to="/" style={{ textDecoration: "none" }}>
  //                       <button className="continueshop_butt">
  //                         <svg
  //                           t="1690677598244"
  //                           viewBox="0 0 1024 1024"
  //                           version="1.1"
  //                           xmlns="http://www.w3.org/2000/svg"
  //                           p-id="2302"
  //                           width="20"
  //                           height="20"
  //                         >
  //                           <path
  //                             d="M865.6 142.4c-0.8-8-8-14.4-16-14.4H174.4c-8 0-15.2 6.4-16 14.4 0 0-30.4 236.8-30.4 241.6 0 41.6 26.4 77.6 64 90.4V880c0 8.8 7.2 16 16 16h608c8.8 0 16-7.2 16-16V474.4c37.6-12.8 64-48.8 64-90.4 0-5.6-30.4-241.6-30.4-241.6zM424 385.6c-12.8 3.2-24 9.6-32 19.2-3.2 4-11.2 11.2-24 11.2s-20-7.2-24-11.2c-8-8.8-18.4-16-30.4-19.2L335.2 192H432l-8 193.6zM560 192l8 193.6a66.4 66.4 0 0 0-32 19.2c-3.2 4-11.2 11.2-24 11.2s-20-7.2-24-11.2c-8-9.6-19.2-16-32-19.2l8-192.8 96-0.8z m40 193.6L592 192h96.8l21.6 193.6c-12 3.2-22.4 9.6-30.4 19.2-3.2 4-11.2 11.2-24 11.2s-20-7.2-24-11.2a66.4 66.4 0 0 0-32-19.2z m-352 19.2c-4 4-11.2 11.2-24 11.2-16.8 0-30.4-12.8-32-29.6 2.4-19.2 14.4-115.2 24-194.4h87.2l-21.6 192.8c-12.8 3.2-24.8 10.4-33.6 20zM576 832H448V704h128v128z m192 0H640V640H384v192H256V474.4c15.2-5.6 29.6-15.2 40-27.2 17.6 20 43.2 32.8 72 32.8s54.4-12.8 72-32.8c17.6 20 43.2 32.8 72 32.8s54.4-12.8 72-32.8c17.6 20 43.2 32.8 72 32.8s54.4-12.8 72-32.8c10.4 12 24.8 21.6 40 27.2V832z m32-416c-12.8 0-20-7.2-24-11.2a68.96 68.96 0 0 0-33.6-20L720.8 192H808c10.4 78.4 22.4 175.2 24 194.4-0.8 16.8-15.2 29.6-32 29.6z"
  //                             p-id="2303"
  //                             fill="#7d7d7d"
  //                           ></path>
  //                         </svg>
  //                         &nbsp; Continue Shopping
  //                       </button>
  //                     </Link>
  //                   </>
  //                 ) : (
  //                   <>
  //                     <Button
  //                       color="inherit"
  //                       disabled={activeStep === 1}
  //                       onClick={handleBack}
  //                       sx={{ mr: 1 }}
  //                     >
  //                       Back
  //                     </Button>
  //                   </>
  //                 )}
  //                 <Box sx={{ flex: "1 1 auto" }} />
  //                 <Button
  //                   onClick={handleNext}
  //                   sx={{
  //                     display: "flex",
  //                   }}
  //                 >
  //                   Next Step &nbsp;
  //                   <svg
  //                     t="1690677862139"
  //                     viewBox="0 0 1024 1024"
  //                     version="1.1"
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     p-id="3321"
  //                     width="20"
  //                     height="20"
  //                   >
  //                     <path
  //                       d="M1024.2048 512c0 6.656-2.4576 13.2608-7.5264 18.2784l-325.8368 325.8368a25.6 25.6 0 1 1-36.1984-36.1984l282.5216-282.5216H25.8048a25.6 25.6 0 1 1 0-51.2h910.9504l-282.112-282.112a25.6 25.6 0 1 1 36.1984-36.1984l325.8368 325.8368c4.608 4.608 7.5264 11.008 7.5264 18.0736V512z"
  //                       fill="#ffffff"
  //                       p-id="3322"
  //                     ></path>
  //                   </svg>
  //                 </Button>
  //                 {/* {activeStep !== steps.length &&
  //                 (completed[activeStep] ? (
  //                   <Typography
  //                     variant="caption"
  //                     sx={{ display: "inline-block" }}
  //                   >
  //                     Step {activeStep + 1} already completed
  //                   </Typography>
  //                 ) : (
  // <Button onClick={handleComplete}>
  //   {completedSteps() === totalSteps() - 1 ? "Finish" : "Complete Step"}
  // </Button>;
  //                 ))} */}
  //               </Box>
  //             </div>
  //           </React.Fragment>
  //         )}
  //       </div>
  //     </Box>
  //   </div>
  // );
}
