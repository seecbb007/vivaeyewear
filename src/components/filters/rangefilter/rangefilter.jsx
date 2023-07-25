import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

const Separator = styled("div")(
  ({ theme }) => `
  height: ${theme.spacing(3)};
`
);

const marks = [
  {
    value: 0,
    label: "",
  },
  {
    value: 100,
    label: "100",
  },
  {
    value: 200,
    label: "200",
  },
  {
    value: 300,
    label: "300",
  },
  {
    value: 400,
    label: "400",
  },
  {
    value: 500,
    label: "500",
  },
  {
    value: 600,
    label: "600",
  },
  {
    value: 674,
    label: "",
  },
];
// const slider = styled(Slider)({
//   color: "green",
// });
function valuetext(value) {
  return `${value}°C`;
}

export default function TrackInvertedSlider({
  setSelectedFilterValue,
  selectedFilterValue,
}) {
  const [priceleft, setPriceleft] = useState(67);
  const [priceright, setPriceright] = useState(674);
  const handleSliderChange = (e) => {
    let valueleft = e.target.value[0];
    let valueright = e.target.value[1];
    setPriceleft(valueleft);
    setPriceright(valueright);

    //Enter code here
    setSelectedFilterValue({
      ...selectedFilterValue,
      priceMin: valueleft,
      priceMax: valueright,
    });

    // setSelectedFilterPricemax(priceright);
  };
  return (
    <Box
      sx={{
        width: 520,

        "& .MuiSlider-thumb": {
          backgroundColor: "black",
        },
        "& .MuiSlider-rail": {
          color: "#D0D0D0",
          height: "15px",

          borderRadius: "15px",
        },
        "& .MuiSlider-track": {
          backgroundColor: "#FFA500",
          height: "15px",
          border: "none",
          borderRadius: "3px",
        },
        "& .MuiSlider-marked": {
          color: "#FFA500",
        },
        // "& .MuiSlider-mark": {
        //   color: "#D0D0D0",
        // },
      }}
    >
      <Separator />
      <Typography
        id="track-inverted-range-slider"
        gutterBottom
        className="pricerange"
      >
        Price Range
      </Typography>
      <div className="priceRangeDisplay">
        <div className="priceRangeDisplay_center">
          <span> ${priceleft}</span>
          <span> - </span>
          <span>${priceright}</span>
        </div>
      </div>
      <Slider
        track="inverted"
        aria-labelledby="track-inverted-range-slider"
        getAriaValueText={valuetext}
        defaultValue={[67, 674]}
        marks={marks}
        min={67}
        max={674}
        onChange={(e) => handleSliderChange(e)}
      />
    </Box>
  );
}
