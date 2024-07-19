import { Box } from "@mui/material";
import ReactMapGl, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useValue } from "../../../context/ContextProvider";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import Geocoder from "./Geocoder";

const AddLocation = () => {
  const {
    state: {
      location: { lng, lat },
    },
    dispatch,
  } = useValue();

  const defaultLng = 106.6297; // Default longitude for TP HCM
  const defaultLat = 10.8231; // Default latitude for TP HCM

  const [viewState, setViewState] = useState({
    longitude: lng || defaultLng,
    latitude: lat || defaultLat,
    zoom: 8,
  });

  const mapRef = useRef();

  useEffect(() => {
    const fetchLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch({
              type: "UPDATE_LOCATION",
              payload: { lng: longitude, lat: latitude },
            });
          },
          (error) => {
            console.error("Error fetching geolocation:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    if (!lng && !lat) {
      fetchLocation();
    }
  }, [dispatch, lng, lat]);

  useEffect(() => {
    if (lng && lat) {
      setViewState((prevState) => ({
        ...prevState,
        longitude: lng,
        latitude: lat,
      }));
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [lng, lat],
          essential: true,
        });
      }
    }
  }, [lng, lat]);

  return (
    <Box
      sx={{
        height: 400,
        position: "relative",
      }}
    >
      <ReactMapGl
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onMoveEnd={(evt) => {
          const { longitude, latitude } = evt.viewState;
          dispatch({
            type: "UPDATE_LOCATION",
            payload: { lng: longitude, lat: latitude },
          });
        }}
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={viewState.latitude}
          longitude={viewState.longitude}
          draggable
          onDragEnd={(e) => {
            const { lngLat } = e;
            const newLongitude = lngLat.lng;
            const newLatitude = lngLat.lat;
            dispatch({
              type: "UPDATE_LOCATION",
              payload: { lng: newLongitude, lat: newLatitude },
            });
            setViewState((prevState) => ({
              ...prevState,
              longitude: newLongitude,
              latitude: newLatitude,
            }));
          }}
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          showUserLocation
          onGeolocate={(e) => {
            const { longitude, latitude } = e.coords;
            dispatch({
              type: "UPDATE_LOCATION",
              payload: { lng: longitude, lat: latitude },
            });
            setViewState((prevState) => ({
              ...prevState,
              longitude,
              latitude,
            }));
            if (mapRef.current) {
              mapRef.current.flyTo({
                center: [longitude, latitude],
                essential: true,
              });
            }
          }}
        />
        <Geocoder />
      </ReactMapGl>
    </Box>
  );
};

export default AddLocation;
