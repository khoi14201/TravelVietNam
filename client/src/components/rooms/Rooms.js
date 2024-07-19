import React from "react";

const Rooms = () => {
  return <div>Rooms</div>;
};

export default Rooms;
// import {
//   Avatar,
//   Card,
//   Container,
//   ImageList,
//   ImageListItem,
//   ImageListItemBar,
//   Rating,
//   Tooltip,
// } from "@mui/material";
// import { useValue } from "../../context/ContextProvider";
// import { StarBorder } from "@mui/icons-material";

// const Rooms = () => {
//   const {
//     state: { filteredFoods },
//   } = useValue();
//   return (
//     <Container>
//       <ImageList
//         gap={12}
//         sx={{
//           mb: 8,
//         }}
//       >
//         {filteredFoods.map((food) => {
//           <Card key={food._id}>
//             <ImageListItem sx={{ height: "100% !important" }}>
//               <ImageListItemBar
//                 sx={{
//                   background:
//                     "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
//                 }}
//                 title={food.price === 0 ? "Free Stay" : "VND" + food.price}
//                 actionIcon={
//                   <Tooltip title={food.uName} sx={{ mr: "5px" }}>
//                     <Avatar src={food.uPhoto} />
//                   </Tooltip>
//                 }
//                 position="top"
//               />

//               <img
//                 src={food.images[0]}
//                 alt={food.title}
//                 loading="lazy"
//                 style={{ cursor: "pointer" }}
//               />
//               <ImageListItemBar
//                 title={food.title}
//                 actionIcon={
//                   <Rating
//                     sx={{ color: "rgba(255,255,255,0.8)", mr: "5px" }}
//                     name="food-rating"
//                     defaultValue={3.5}
//                     precision={0.5}
//                     emptyIcon={
//                       <StarBorder sx={{ color: "rgba(255,255,255,0.8)" }} />
//                     }
//                   />
//                 }
//               />
//             </ImageListItem>
//           </Card>;
//         })}
//       </ImageList>
//     </Container>
//   );
// };

// export default Rooms;
