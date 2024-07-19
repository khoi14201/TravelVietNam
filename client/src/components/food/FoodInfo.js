import {
  AppBar,
  Avatar,
  Box,
  Container,
  Dialog,
  IconButton,
  Rating,
  Slide,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import { forwardRef, useEffect, useState } from "react";
import { Close, StarBorder } from "@mui/icons-material";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Zoom, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/zoom";
import "swiper/css/autoplay";
import "./swiper.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FoodInfo = () => {
  const {
    state: { foodinfo },
    dispatch,
  } = useValue();

  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (foodinfo) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${foodinfo.lng}, ${foodinfo.lat}.json?access_token=${process.env.REACT_APP_MAP_TOKEN}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setPlace(data.features[0]));
    }
  }, [foodinfo]);

  const handleClose = () => {
    dispatch({ type: "UPDATE_FOOD", payload: null });
  };

  return (
    <Dialog
      fullScreen
      open={Boolean(foodinfo)}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="h3" sx={{ ml: 2, flex: 1 }}>
            {foodinfo?.title}
          </Typography>
          <IconButton color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ pt: 5 }}>
        <Swiper
          modules={[Navigation, EffectCoverflow, Autoplay, Zoom]}
          centeredSlides
          slidesPerView={2}
          grabCursor
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          lazy="true"
          zoom
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 2,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {foodinfo?.images?.map((url) => (
            <SwiperSlide key={url}>
              <div className="swiper-zoom-container">
                <img src={url} alt="food" loading="lazy" />
              </div>
            </SwiperSlide>
          ))}
          <Tooltip
            title={foodinfo?.uName || ""}
            sx={{
              position: "absolute",
              bottom: "8px",
              left: "8px",
              zIndex: 2,
            }}
          >
            <Avatar src={foodinfo?.uPhoto} />
          </Tooltip>
        </Swiper>
        <Stack sx={{ p: 3 }} spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {"Food Price: "}
              </Typography>
              <Typography component="span">
                {foodinfo?.price === 0 ? "Free" : foodinfo?.price + " VND"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="span">
                {"Ratings: "}
              </Typography>

              <Rating
                name="food-ratings"
                defaultValue={3.5}
                precision={0.5}
                emptyIcon={<StarBorder />}
              />
            </Box>
          </Stack>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Typography variant="h6" component="span">
                {"Food Name: "}
              </Typography>
              <Typography component="span">{place?.text}</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="span">
                {"Address: "}
              </Typography>

              <Typography component="span">{place?.place_name}</Typography>
            </Box>
          </Stack>
          <Stack>
            <Typography variant="h6" component="span">
              {"Details: "}
            </Typography>
            <Typography component="span">{foodinfo?.description}</Typography>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  );
};

export default FoodInfo;
