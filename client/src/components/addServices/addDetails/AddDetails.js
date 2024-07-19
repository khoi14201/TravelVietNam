import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useValue } from "../../../context/ContextProvider";
import InfoField from "./InfoField";

const AddDetails = () => {
  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  const {
    state: {
      details: { title, description, price },
      costType,
    },
    dispatch,
  } = useValue();

  const [displayPrice, setDisplayPrice] = useState(
    price ? formatNumber(price) : ""
  );

  const handleCostTypeChange = (e) => {
    const newCostType = Number(e.target.value);
    dispatch({ type: "UPDATE_COST_TYPE", payload: newCostType });
    if (newCostType === 0) {
      dispatch({ type: "UPDATE_DETAILS", payload: { price: 0 } });
      setDisplayPrice("");
    } else {
      dispatch({ type: "UPDATE_DETAILS", payload: { price: undefined } });
      setDisplayPrice("");
    }
  };

  const handlePriceChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Loại bỏ các ký tự không phải là số
    if (value === "") {
      setDisplayPrice("");
    } else if (!isNaN(value)) {
      // Chuyển đổi thành số và định dạng thành tiền tệ
      value = parseInt(value, 10);
      setDisplayPrice(formatNumber(value));
    }
  };

  const handleBlur = () => {
    const numberValue = parseInt(displayPrice.replace(/\D/g, ""), 10);
    if (!isNaN(numberValue)) {
      dispatch({ type: "UPDATE_DETAILS", payload: { price: numberValue } });
      setDisplayPrice(formatNumber(numberValue)); // Bạn có thể xóa dòng này để không cần định dạng lại
    }
  };
  useEffect(() => {
    const detailsCompleted = title.length > 4 && description.length > 9;
    const priceCompleted = costType === 0 || (costType === 1 && price > 0);
    dispatch({
      type: "UPDATE_STEP_COMPLETION",
      payload: { stepIndex: 1, completed: detailsCompleted && priceCompleted },
    });
  }, [title, description, price, costType, dispatch]);

  return (
    <Stack
      sx={{
        alignItems: "center",
        "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
      }}
    >
      <FormControl>
        <RadioGroup
          name="costType"
          value={costType}
          row
          onChange={handleCostTypeChange}
        >
          <FormControlLabel value={0} control={<Radio />} label="Free Stay" />
          <FormControlLabel value={1} control={<Radio />} label="Nominal Fee" />
          {Boolean(costType) && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                sx={{
                  width: "10ch !important",
                  "& input[type=text]::-webkit-outer-spin-button, & input[type=text]::-webkit-inner-spin-button":
                    {
                      display: "none",
                    },
                  "& input[type=text]": {
                    MozAppearance: "textfield",
                  },
                }}
                variant="standard"
                inputProps={{ type: "text", maxLength: 10 }}
                value={displayPrice}
                onChange={handlePriceChange}
                onBlur={handleBlur}
                name="price"
              />
              <Typography sx={{ marginLeft: 1 }}>VND</Typography>
            </Box>
          )}
        </RadioGroup>
      </FormControl>
      <InfoField
        mainProps={{ name: "title", label: "Title", value: title }}
        minLength={5}
      />
      <InfoField
        mainProps={{
          name: "description",
          label: "Description",
          value: description,
        }}
        minLength={10}
        optionalProps={{ multiline: true, rows: 4 }}
      />
    </Stack>
  );
};

export default AddDetails;
