import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
// import "./Map.css";
import ReactDOM from "react-dom";
import Tooltip from "@/components/Tooltip";
import MapSidebar from "@/components/sidebar/MapSidebar";
// import { airportStore, farmStore } from "@/utils/config";
import { useRouter } from "next/router";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import logo from "../assets/images/MUNGINLogo.png";
import { getMapInfo } from "@/services/auth.service";
import { airportStore } from "@/utils/config";

mapboxgl.accessToken =
  "pk.eyJ1IjoieW9tenkyMjIzIiwiYSI6ImNsaHgyZ28xcjBwcGozcW50anYwd2owcTkifQ.-uQHl78lQyHAQf-wnBAplw";

const Map = () => {
  const [selected, setSelected] = useState("farms");
  const [farmStore, setFarmStore] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [clickedPoint, setClickedPoint] = useState({});
  const [loading, setLoading] = useState(false);

  const defaultStore = selected === "farms" ? farmStore : airportStore;

  const [stores, setStores] = useState(defaultStore);

  const router = useRouter();
  const { state } = router.query;
  const mapContainerRef = useRef(null);

  let map = useRef();
  const listingRef = useRef();

  const storesCoordinates = stores?.features?.map(
    (el) => el?.geometry?.coordinates
  );

  useEffect(() => {
    if (state) handleMapInfo();
  }, [state]);

  const handleMapInfo = async () => {
    setLoading(true);
    const response = await getMapInfo(state);
    setLoading(false);
    console.log(response);
    if (response?.length > 0) {
      setFarmStore({
        type: "FeatureCollection",
        features: response,
      });
      setStores({
        type: "FeatureCollection",
        features: response,
      });
    }
  };

  // const handleMapInfo = async () => {
  //   let mapPromise = [];
  //   for (let i = 1; i <= 45; i++) {
  //     let eachPromise = getMapInfo(i);
  //     mapPromise.push(eachPromise);
  //   }
  //   setLoading(true);
  //   const response2 = await Promise.all(mapPromise);
  //   setLoading(false);
  //   let farms = [];
  //   response2?.map((el) => {
  //     if (el?.farm?.length > 0) farms = [...farms, ...el.farm];
  //   });
  //   if (farms.length > 0)
  //     setFarmStore({
  //       type: "FeatureCollection",
  //       features: farms,
  //     });
  //   setStores({
  //     type: "FeatureCollection",
  //     features: farms,
  //   });
  // };

  // Initialize map when component mounts
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [8.6753, 9.082],
      // center: [8.6753, 9.082],
      zoom: 6,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,

      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
      },

      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: "draw_polygon",
    });
    map.current.addControl(draw);
    map.current.addControl(new mapboxgl.NavigationControl());

    // Event handling for draw.create
    map.current.on("draw.create", (e) => {
      const feature = e.features[0];
      const coordinates = feature.geometry.coordinates;
      const inside = getCoordinatesInsidePolygon(
        storesCoordinates,
        coordinates[0]
      );
      const newStore = defaultStore.features.filter((el) =>
        inside.find(
          (val) =>
            JSON.stringify(val) === JSON.stringify(el.geometry.coordinates)
        )
      );
      setStores({
        type: "FeatureCollection",
        features: newStore,
      });
      console.log("Feature updated:", newStore);
    });

    // Event handling for draw.update
    map.current.on("draw.update", (e) => {
      const feature = e.features[0];
      const coordinates = feature.geometry.coordinates;
      const inside = getCoordinatesInsidePolygon(
        storesCoordinates,
        coordinates[0]
      );
      const newStore = defaultStore.features.filter((el) =>
        inside.find(
          (val) =>
            JSON.stringify(val) === JSON.stringify(el.geometry.coordinates)
        )
      );
      setStores({
        type: "FeatureCollection",
        features: newStore,
      });
      console.log("Feature updated:", newStore);
    });

    // Event handling for draw.delete
    map.current.on("draw.delete", (e) => {
      const feature = e.features[0];
      setStores(defaultStore);
      console.log("Feature deleted:", feature);
    });

    map.current.on("load", () => {
      if (state) {
        /* Add the data to your map as a layer */
        map.current.addLayer({
          id: "locations",
          type: "circle",
          /* Add a GeoJSON source containing place coordinates and information. */
          source: {
            type: "geojson",
            data: stores,
          },
        });
        addMarkers();

        // buildLocationList(stores);
      }
    });

    stores.features.forEach(function (store, i) {
      store.properties.id = i;
    });

    map.current.on("click", (event) => {
      /* Determine if a feature in the "locations" layer exists at that point. */
      const features = map.current.queryRenderedFeatures(event.point, {
        layers: ["locations"],
      });

      /* If it does not exist, return */
      if (!features?.length) return;

      const clickedPoint = features[0];

      /* Fly to the point */
      flyToStore(clickedPoint);

      /* Close all other popups and display popup for clicked store */
      createPopUp(clickedPoint);

      /* Highlight listing in sidebar (and remove highlight for all other listings) */
      const activeItem = document.getElementsByClassName("active");
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      const listing = document.getElementById(
        `listing-${clickedPoint.properties.id}`
      );
      if (listing) listing.classList.add("active");
    });

    // Clean up on unmount
    return () => map.current.remove();
  }, [selected, farmStore]); // eslint-disable-line react-hooks/exhaustive-deps

  //
  const addMarkers = () => {
    /* For each feature in the GeoJSON object above: */
    for (const marker of stores.features) {
      /* Create a div element for the marker. */
      const el = document.createElement("div");
      /* Assign a unique `id` to the marker. */
      el.id = `marker-${marker.properties.id}`;
      /* Assign the `marker` class to each marker for styling. */
      el.className = "marker";
      console.log(marker);

      /**
       * Create a marker using the div element
       * defined above and add it to the map.
       **/
      new mapboxgl.Marker(el, { offset: [0, -23] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map.current);

      el.addEventListener("click", (e) => {
        router.push({
          query: { state, farm: marker.properties.name },
        });
        /* Fly to the point */
        flyToStore(marker);
        /* Close all other popups and display popup for clicked store */
        createPopUp(marker);
        /* Highlight listing in sidebar */
        const activeItem = document.getElementsByClassName("active");
        e.stopPropagation();
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        const listing = document.getElementById(
          `listing-${marker.properties.id}`
        );
        listing.classList.add("active");
      });
    }
  };

  //
  const handleListClick = (point) => {
    const id = `link-${point.properties.id}`;

    router.push({
      query: { state, farm: point.properties.name },
    });
    console.log(point);

    for (const feature of stores.features) {
      if (id === `link-${feature.properties.id}`) {
        flyToStore(feature);
        createPopUp(feature);
      }
    }
    const activeItem = document.getElementsByClassName("active");
    if (activeItem[0]) {
      activeItem[0].classList.remove("active");
    }
    if (listingRef.current)
      listingRef.current.parentNode.classList.add("active");
  };

  const flyToStore = (currentFeature) => {
    map.current.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15,
    });
  };

  const createPopUp = (currentFeature) => {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h3>${currentFeature.properties.name}</h3><h4>${currentFeature.properties.farmCategory}</h4>`
      )
      .addTo(map.current);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      const filteredStore = defaultStore.features.filter(
        (el) =>
          checkInclude(el?.properties?.name, value) ||
          checkInclude(el?.properties?.farmType, value) ||
          checkInclude(el?.properties?.farmCategory, value) ||
          checkInclude(el?.properties?.region, value) ||
          checkInclude(el?.properties?.state, value)
      );

      setStores({ ...stores, features: filteredStore });
    } else {
      setStores(defaultStore);
    }
  };

  const checkInclude = (text, searchValue) =>
    text?.toLowerCase()?.includes(searchValue?.toLowerCase()) ? true : false;

  function isPointInsidePolygon(point, polygon) {
    const x = point[0],
      y = point[1];
    let isInside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0],
        yi = polygon[i][1];
      const xj = polygon[j][0],
        yj = polygon[j][1];

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) {
        isInside = !isInside;
      }
    }

    return isInside;
  }

  function getCoordinatesInsidePolygon(coordinates, polygon) {
    const coordinatesInside = [];

    for (let i = 0; i < coordinates.length; i++) {
      const coordinate = coordinates[i];
      if (isPointInsidePolygon(coordinate, polygon)) {
        coordinatesInside.push(coordinate);
      }
    }

    console.log(coordinatesInside);
    return coordinatesInside;
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    if (value === "farms") setStores(farmStore);
    else setStores(airportStore);
  };

  return (
    <div>
      {/* <Top>
        <Link href="/">
          <Image src={logo} alt="" />
        </Link>
      </Top> */}
      <div className="container">
        <MapSidebar
          lists={stores}
          handleListClick={handleListClick}
          listingRef={listingRef}
          handleSearch={handleSearch}
          handleChange={handleChange}
          loading={loading}
        />

        <div
          ref={mapContainerRef}
          style={{
            height: "100vh",
            position: "absolute",
            left: "33.3333%",
            width: "66.6666%",
            overflow: "hidden",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Map;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 10px;
  border-bottom: 1px solid #ccc;

  a {
    text-decoration: none;
    color: inherit;
  }
`;
