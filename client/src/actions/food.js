import fetchData from "./utills/fetchData";

const url = process.env.REACT_APP_SERVER_URL + "/food";

export const createFood = async (food, currentUser, dispatch, setPage) => {
  dispatch({ type: "START_LOADING" });

  const result = await fetchData(
    { url, body: food, token: currentUser?.token },
    dispatch
  );
  if (result) {
    dispatch({
      type: "UPDATE_ALERT",
      payload: {
        open: true,
        severity: "success",
        message: "Food has been added successfully",
      },
    });
    dispatch({ type: "RESET_FOOD" });
    setPage(0);
    dispatch({ type: "UPDATE_FOOD", payload: result });
  }

  dispatch({ type: "END_LOADING" });
};

export const getFoods = async (dispatch) => {
  const result = await fetchData({ url, method: "GET" }, dispatch);
  console.log("Fetched foods:", result);
  if (result) {
    dispatch({ type: "UPDATE_FOODS", payload: result });
  }
};
