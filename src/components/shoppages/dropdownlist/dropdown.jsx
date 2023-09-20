import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
    sx: {
      "& .MuiMenuItem-root.Mui-selected": {
        backgroundColor: "#2684ff",
      },
      "& .MuiMenuItem-root:hover": {
        backgroundColor: "#deebff",
      },
    },
  },
};

// const names = ["28 mm", "36 mm", "42 mm"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectPlaceholder({
  names,
  inputLable,
  dropdownwith,
  setSelectedFilterValue,
  selectedFilterValue,
  dropdownName,
  setSelectedFrameSize,
}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    if (dropdownName === "brandlist") {
      const {
        target: { value },
      } = event;
      setSelectedFilterValue({ ...selectedFilterValue, brand: value });
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    } else if (dropdownName === "sortbylist") {
      const {
        target: { value },
      } = event;
      setSelectedFilterValue({ ...selectedFilterValue, sortBy: value });
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    } else {
      const {
        target: { value },
      } = event;
      setPersonName(typeof value === "string" ? value.split(",") : value);
    }
  };

  // console.log("props", props);
  // console.log(1111, setSelectedFrameSize);
  // console.log("selectedFilterValue", selectedFilterValue);
  // console.log(222, setSelectedFilterValue);
  // console.log("dropdownName", dropdownName);
  return (
    <div>
      <FormControl sx={{ m: 1, width: dropdownwith, mt: 3 }}>
        <Select
          displayEmpty
          value={personName}
          onChange={(e) => handleChange(e)}
          input={<OutlinedInput />}
          renderValue={(selected) => {
            // console.log("selected", selected);
            if (selected?.length === 0) {
              return <em>{inputLable}</em>;
            }

            return selected.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
          onClick={
            (selected) => {
              // 需要通过 dropdownName 为Sizelist时，才会执行setSelectedFrameSize(selected.target.dataset.value);
              dropdownName === "sizelist" &&
                setSelectedFrameSize(selected.target.dataset.value);
            }
            // setSelectedFrameSize()
            //   ? setSelectedFrameSize(selected.target.dataset.value)
            //   : null
          }
        >
          {/* <MenuItem disabled value="">
            <em>{inputLable}</em>
          </MenuItem> */}
          {names?.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
