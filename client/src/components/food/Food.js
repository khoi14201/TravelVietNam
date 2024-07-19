import {
  Avatar,
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
} from "@mui/material";
import { useValue } from "../../context/ContextProvider";
import { StarBorder } from "@mui/icons-material";

const Food = () => {
  const {
    state: { filteredFoods },
    dispatch,
  } = useValue();

  return (
    <Container>
      <ImageList
        gap={12}
        sx={{
          mb: 8,
          gridTemplateColumns:
            "repeat(auto-fill, minmax(280px, 1fr))!important",
        }}
      >
        {filteredFoods.map((food) => (
          <Card key={food._id}>
            <ImageListItem sx={{ height: "100% !important" }}>
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
                }}
                title={
                  food.price === 0
                    ? "Free Stay"
                    : food.price.toLocaleString("vi-VN") + " VND"
                }
                actionIcon={
                  <Tooltip title={food.uName} sx={{ mr: "5px" }}>
                    <Avatar src={food.uPhoto} />
                  </Tooltip>
                }
                position="top"
              />

              <img
                src={food.images[0]}
                alt={food.title}
                loading="lazy"
                style={{ cursor: "pointer" }}
                onClick={() => dispatch({ type: "UPDATE_FOOD", payload: food })}
              />
              <ImageListItemBar
                title={food.title}
                actionIcon={
                  <Rating
                    sx={{ color: "rgba(255,255,255,0.8)", mr: "5px" }}
                    name="food-rating"
                    defaultValue={3.5}
                    precision={0.5}
                    emptyIcon={
                      <StarBorder sx={{ color: "rgba(255,255,255,0.8)" }} />
                    }
                  />
                }
              />
            </ImageListItem>
          </Card>
        ))}
      </ImageList>
    </Container>
  );
};

export default Food;
