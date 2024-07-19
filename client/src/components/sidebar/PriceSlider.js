import { Box, Slider, Typography } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";

const marks = [
  { value: 0, label: "0K" },
  { value: 50000, label: "50K" },
  { value: 100000, label: "100K" },
];

const PriceSlider = () => {
  const {
    state: { priceFilter },
    dispatch,
  } = useValue();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography>Max Price: {formatPrice(priceFilter) + "VND"}</Typography>
      <Slider
        min={0}
        max={100000}
        step={5000}
        defaultValue={50000}
        valueLabelDisplay="auto"
        marks={marks}
        value={priceFilter}
        onChange={(e, price) =>
          dispatch({ type: "FILTER_PRICE", payload: price })
        }
      />
    </Box>
  );
};

export default PriceSlider;
