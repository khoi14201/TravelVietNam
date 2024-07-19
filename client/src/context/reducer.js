const reducer = (state, action, location) => {
  switch (action.type) {
    case "OPEN_LOGIN":
      return { ...state, openLogin: true };
    case "CLOSE_LOGIN":
      return { ...state, openLogin: false };
    case "START_LOADING":
      return { ...state, loading: true };
    case "END_LOADING":
      return { ...state, loading: false };

    case "UPDATE_ALERT":
      return { ...state, alert: action.payload };
    case "UPDATE_PROFILE":
      return { ...state, profile: action.payload };
    case "UPDATE_USER":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, currentUser: action.payload };

    case "UPDATE_IMAGES":
      return { ...state, images: [...state.images, action.payload] };

    case "DELETE_IMAGE":
      return {
        ...state,
        images: state.images.filter((image) => image !== action.payload),
      };

    case "UPDATE_DETAILS":
      return { ...state, details: { ...state.details, ...action.payload } };

    case "UPDATE_COST_TYPE":
      return {
        ...state,
        costType: action.payload,
      };
    case "UPDATE_STEP_COMPLETION":
      const updatedSteps = [...state.steps];
      updatedSteps[action.payload.stepIndex].completed =
        action.payload.completed;
      return { ...state, steps: updatedSteps };

    case "UPDATE_LOCATION":
      return { ...state, location: action.payload };

    case "RESET_FOOD":
      return {
        ...state,
        images: [],
        details: { title: "", description: "", price: 0 },
        location: { lng: 0, lat: 0 },
      };

    case "UPDATE_FOODS":
      return {
        ...state,
        foods: action.payload,
        addressFilter: null,
        priceFilter: 50000,
        filteredFoods: action.payload,
      };

    case "FILTER_PRICE":
      return {
        ...state,
        priceFilter: action.payload,
        filteredFoods: applyFilter(
          state.foods,
          state.addressFilter,
          action.payload
        ),
      };

    case "FILTER_ADDRESS":
      return {
        ...state,
        addressFilter: action.payload,
        filteredFoods: applyFilter(
          state.foods,
          action.payload,
          state.priceFilter
        ),
      };

    case "CLEAR_ADDRESS":
      return {
        ...state,
        addressFilter: null,
        priceFilter: 50000,
        filteredFoods: state.foods,
      };

    case "UPDATE_FOOD":
      return { ...state, foodinfo: action.payload };

    default:
      throw new Error("No mathced action!");
  }
};

export default reducer;

const applyFilter = (foods, address, price) => {
  let filterFoods = foods;
  if (address) {
    const { lng, lat } = address;
    filterFoods = filterFoods.filter((food) => {
      const lngDifference = lng > food.lng ? lng - food.lng : food.lng - lng;
      const latDifference = lat > food.lat ? lat - food.lat : food.lat - lat;
      return lngDifference <= 1 && latDifference <= 1;
    });
  }

  if (price < 50000) {
    filterFoods = filterFoods.filter((food) => food.price <= price);
  }

  return filterFoods;
};
