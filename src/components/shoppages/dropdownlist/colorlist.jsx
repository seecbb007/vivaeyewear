import * as React from "react";
import Box from "@mui/joy/Box";
// import FormLabel from "@mui/joy/FormLabel";
import Radio, { radioClasses } from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import Done from "@mui/icons-material/Done";

export default function ExampleProductAttributes({
  currentColorlist,

  setSelectedColor,
}) {
  return (
    <Box sx={{ resize: "horizontal", px: 2 }}>
      <RadioGroup
        aria-labelledby="product-color-attribute"
        defaultValue="warning"
        sx={{ gap: 2, flexDirection: "row" }}
      >
        {/* ["primary", "neutral", "danger", "info", "success", "warning"] */}
        {currentColorlist.map((color) => (
          <Sheet
            key={color}
            sx={{
              position: "relative",
              top: "10px",
              left: "-15px",
              width: 35,
              height: 35,
              flexShrink: 0,
              bgcolor: `${color}.solidBg`,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <Radio
              overlay
              variant="solid"
              color={color}
              checkedIcon={<Done fontSize="xl2" />}
              value={color}
              slotProps={{
                input: { "aria-label": color },
                radio: {
                  sx: {
                    display: "contents",
                    "&, &.Mui-checked": {
                      color: "white",
                      fontSize: "25px",
                    },
                    "--variant-borderWidth": "2px",
                  },
                },
              }}
              sx={{
                "--joy-focus-outlineOffset": "4px",
                "--joy-palette-focusVisible": (theme) =>
                  // theme.vars.palette[color][500],
                  theme.vars.palette[color],
                [`& .${radioClasses.action}.${radioClasses.focusVisible}`]: {
                  outlineWidth: "2px",
                },
              }}
            />
          </Sheet>
        ))}
      </RadioGroup>
      <br />
    </Box>
  );
}
