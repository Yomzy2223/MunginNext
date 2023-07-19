import React, { useRef, useEffect, useState, createContext } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
// import "./Map.css";
import ReactDOM from "react-dom";
import Tooltip from "@/components/Tooltip";
import MapSidebar from "@/components/sidebar/MapSidebar";
import { useRouter } from "next/router";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import logo from "../assets/images/MUNGINLogo.png";
import {
  getMapAirportInfo,
  getMapInfo,
  getMapSeaportInfo,
  getMarketInfo,
  getRailTracks,
} from "@/services/auth.service";
import farmImg from "../assets/farmIcon.png";
import { TbZoomReplace } from "react-icons/tb";
import { MdClear } from "react-icons/md";

mapboxgl.accessToken =
  "pk.eyJ1IjoieW9tenkyMjIzIiwiYSI6ImNsaHgyZ28xcjBwcGozcW50anYwd2owcTkifQ.-uQHl78lQyHAQf-wnBAplw";

export const MapContext = createContext();

const Map = () => {
  const [farmStore, setFarmStore] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [airportStore, setAirportStore] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [seaportStore, setSeaportStore] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [marketStore, setMarketStore] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [railTracks, setRailTracks] = useState([]);
  const [activeStore, setActiveStore] = useState([]);
  const [activeStoreFiltered, setActiveStoreFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);

  const router = useRouter();
  const { view, selected, rail } = router.query;

  const active =
    typeof selected === "string" ? selected : selected?.[selected?.length - 1];

  const mapContainerRef = useRef(null);

  let map = useRef();
  const listingRef = useRef();

  const storesCoordinates = activeStore?.features?.map(
    (el) => el?.geometry?.coordinates
  );

  useEffect(() => {
    if (view) handleMapInfo();
  }, [view]);

  const findDataPoint = (dataPoint) => {
    if (typeof selected === "string") {
      return dataPoint === selected;
    } else {
      return selected?.find((el) => el === dataPoint);
    }
  };

  const handleMapInfo = async () => {
    let stores = {
      type: "FeatureCollection",
      features: [],
    };
    const farmState = JSON.parse(localStorage.getItem("farmsStates"))?.[0];
    const marketState = JSON.parse(localStorage.getItem("marketsStates"))?.[0];

    setLoading(true);
    const farms = findDataPoint("farms") ? await getMapInfo(farmState) : [];
    const airports = findDataPoint("airports") ? await getMapAirportInfo() : [];
    const seaports = findDataPoint("seaports") ? await getMapSeaportInfo() : [];
    const markets = findDataPoint("markets")
      ? await getMarketInfo(marketState)
      : [];
    const rails = await getRailTracks();
    setLoading(false);

    resetStores();

    setRailTracks(rails);
    if (farms?.length > 0) {
      setFarmStore({
        type: "FeatureCollection",
        features: farms,
      });
      if (active === "farms") {
        setActiveStore({
          type: "FeatureCollection",
          features: farms,
        });
        setActiveStoreFiltered({
          type: "FeatureCollection",
          features: farms,
        });
      }
    }
    if (airports?.length > 0) {
      setAirportStore({
        type: "FeatureCollection",
        features: airports,
      });
      if (active === "airports") {
        setActiveStore({
          type: "FeatureCollection",
          features: airports,
        });
        setActiveStoreFiltered({
          type: "FeatureCollection",
          features: airports,
        });
      }
    }
    if (seaports?.length > 0) {
      setSeaportStore({
        type: "FeatureCollection",
        features: seaports,
      });
      if (active === "seaports") {
        setActiveStore({
          type: "FeatureCollection",
          features: seaports,
        });
        setActiveStoreFiltered({
          type: "FeatureCollection",
          features: seaports,
        });
      }
    }
    if (markets?.length > 0) {
      setMarketStore({
        type: "FeatureCollection",
        features: markets,
      });
      if (active === "markets") {
        setActiveStore({
          type: "FeatureCollection",
          features: markets,
        });
        setActiveStoreFiltered({
          type: "FeatureCollection",
          features: markets,
        });
      }
    }
  };

  //
  const resetStores = () => {
    setActiveStore({
      type: "FeatureCollection",
      features: [],
    });
    setActiveStoreFiltered({
      type: "FeatureCollection",
      features: [],
    });
    setFarmStore({
      type: "FeatureCollection",
      features: [],
    });
    setAirportStore({
      type: "FeatureCollection",
      features: [],
    });
    setSeaportStore({
      type: "FeatureCollection",
      features: [],
    });
    setMarketStore({
      type: "FeatureCollection",
      features: [],
    });
  };

  // Initialize map when component mounts
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [8.6753, 9.082],
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
      // defaultMode: "draw_polygon",
    });
    map.current.addControl(draw);
    map.current.addControl(new mapboxgl.NavigationControl());

    // Event handling for draw.create
    map.current.on("draw.create", (e) => {
      const feature = e.features[0];
      const coordinates = feature.geometry.coordinates;
      setPolygonCoordinates(coordinates[0]);
      // const inside = getCoordinatesInsidePolygon(
      //   storesCoordinates,
      //   coordinates[0]
      // );
      // const newStore = activeStore.features.filter((el) =>
      //   inside.find(
      //     (val) =>
      //       JSON.stringify(val) === JSON.stringify(el.geometry.coordinates)
      //   )
      // );
      // setActiveStoreFiltered({
      //   type: "FeatureCollection",
      //   features: newStore,
      // });
      // console.log("Feature updated:", newStore);
    });

    // Event handling for draw.update
    map.current.on("draw.update", (e) => {
      const feature = e.features[0];
      const coordinates = feature.geometry.coordinates;
      setPolygonCoordinates(coordinates[0]);
      // const inside = getCoordinatesInsidePolygon(
      //   storesCoordinates,
      //   coordinates[0]
      // );
      // console.log(inside);
      // const newStore = activeStore.features.filter((el) =>
      //   inside.find(
      //     (val) =>
      //       JSON.stringify(val) === JSON.stringify(el.geometry.coordinates)
      //   )
      // );
      // console.log(newStore);
      // setActiveStoreFiltered({
      //   type: "FeatureCollection",
      //   features: newStore,
      // });
      // console.log("Feature updated:", newStore);
    });

    // Event handling for draw.delete
    map.current.on("draw.delete", (e) => {
      const feature = e.features[0];
      setActiveStoreFiltered(activeStore);
      setPolygonCoordinates([]);
      // console.log("Feature deleted:", feature);
    });

    map.current.on("load", () => {
      if (view) {
        /* Add the data to your map as a layer */
        // map.current.addLayer({
        //   id: "locations",
        //   type: "circle",
        //   /* Add a GeoJSON source containing place coordinates and information. */
        //   source: {
        //     type: "geojson",
        //     data: stores,
        //   },
        // });
        findDataPoint("farms") && addMarkers(farmStore, "farm-marker");
        findDataPoint("airports") && addMarkers(airportStore, "airport-marker");
        findDataPoint("seaports") && addMarkers(seaportStore, "seaport-marker");
        findDataPoint("markets") && addMarkers(marketStore, "market-marker");

        // map.current.addSource("route", {
        //   type: "geojson",
        //   data: {
        //     type: "Feature",
        //     properties: {},
        //     geometry: {
        //       type: "LineString",
        //       coordinates: [
        //         [8.6753, 9.082],
        //         [8.6853, 9.182],
        //         [8.6753, 9.282],
        //         [8.6753, 9.382],
        //         [8.6753, 9.482],
        //         [8.6753, 9.582],
        //         [8.6753, 9.582],
        //         [8.6753, 9.682],
        //         [8.6753, 9.082],
        //         [8.6753, 9.082],
        //         [8.6753, 9.082],
        //         [8.6753, 9.082],
        //         [8.6753, 9.082],
        //         [8.6753, 9.082],
        //         [8.6753, 9.082],
        //         [8.6753, 9.082],
        //         [8.6753, 9.082],
        //         [8.6753, 9.082],
        //         [8.6753, 9.082],
        //         [8.6753, 9.082],
        //       ],
        //     },
        //   },
        // });
        // map.current.addLayer({
        //   id: "route",
        //   type: "line",
        //   source: "route",
        //   layout: {
        //     "line-join": "round",
        //     "line-cap": "round",
        //   },
        //   paint: {
        //     "line-color": "#888",
        //     "line-width": 8,
        //   },
        // });
        // buildLocationList(stores);
      }
    });

    // activeStore.features.forEach(function (store, i) {
    //   store.properties.id = i;
    // });

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
  }, [farmStore, marketStore, airportStore]); // eslint-disable-line react-hooks/exhaustive-deps

  //
  const addMarkers = (dataPointStore, className) => {
    /* For each feature in the GeoJSON object above: */
    for (const marker of dataPointStore?.features) {
      // console.log(marker.properties);
      /* Create a div element for the marker. */
      const el = document.createElement("div");
      /* Assign a unique `id` to the marker. */
      el.id = `marker-${marker.properties.id}`;
      /* Assign the `marker` class to each marker for styling. */
      // el.className = `marker ${
      //   marker.properties.farmCategory ? "farm-marker" : ""
      // } ${marker.properties.scheduled_service ? "airport-marker" : ""}`;
      el.className = `marker ${className}`;

      /**
       * Create a marker using the div element
       * defined above and add it to the map.
       **/
      new mapboxgl.Marker(el, { offset: [0, 0] })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map.current);

      el.addEventListener("click", (e) => {
        router.push({
          query: { ...router.query, view, name: marker.properties.name },
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
        if (listing) listing.classList.add("active");
      });
    }
  };

  //
  const handleListClick = (point) => {
    const id = `link-${point.id}`;

    router.push({
      query: { ...router.query, view, name: point.properties.name },
    });

    for (const feature of activeStoreFiltered.features) {
      if (id === `link-${feature.id}`) {
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

    const popup = new mapboxgl.Popup({
      closeOnClick: true,
      closeButton: true,
    })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(
        `<h3>${
          currentFeature.properties.farmCategory ||
          currentFeature?.properties?.type ||
          currentFeature?.properties?.source ||
          currentFeature.properties.state
        } <button class="popup-close-button" >X</button></h3>
        
        <h4>${
          currentFeature.properties.name || currentFeature.properties.port
        }</h4>`
      )
      .addTo(map.current);
    // Add a click event listener to the close button
    document
      .querySelector(".popup-close-button")
      ?.addEventListener("click", () => {
        popup.remove();
      });
  };

  //
  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      const filteredStore = activeStore.features.filter(
        (el) =>
          checkInclude(el?.properties?.name, value) ||
          checkInclude(el?.properties?.farmType, value) ||
          checkInclude(el?.properties?.farmCategory, value) ||
          checkInclude(el?.properties?.region, value) ||
          checkInclude(el?.properties?.state, value) ||
          checkInclude(el?.properties?.type, value) ||
          checkInclude(el?.properties?.product_desc, value) ||
          checkInclude(el?.properties?.type_goods, value) ||
          checkInclude(el?.properties?.source, value) ||
          checkInclude(el?.properties?.frequency, value) ||
          checkInclude(el?.properties?.port, value)
      );
      setActiveStoreFiltered({
        type: "FeatureCollection",
        features: filteredStore,
      });
    } else {
      setActiveStoreFiltered(activeStore);
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

    return coordinatesInside;
  }

  // const handleChange = (tags) => {
  //   setSelected(tags);
  //   if (tags.length === 0) {
  //     setStores({ type: "FeatureCollection", features: [] });
  //     return;
  //   }
  //   console.log(airportStore);

  //   let newStore = { type: "FeatureCollection", features: [] };
  //   tags.map((el) => {
  //     if (el.toLowerCase() === "farms") {
  //       newStore.features = [...newStore.features, ...farmStore.features];
  //     } else if (el.toLowerCase() === "airports") {
  //       newStore.features = [...newStore.features, ...airportStore.features];
  //     }
  //   });
  //   setStores(newStore);
  // };

  const resetZoom = () => {
    map.current.setZoom(6);
    // map.current.setCenter([8.6753, 9.082]);
  };

  const handleDataPointClick = (selected) => {
    if (selected === "airports") {
      setActiveStore(airportStore);
      setActiveStoreFiltered(airportStore);
    } else if (selected === "farms") {
      setActiveStore(farmStore);
      setActiveStoreFiltered(farmStore);
    } else if (selected === "markets") {
      setActiveStore(marketStore);
      setActiveStoreFiltered(marketStore);
    } else if (selected === "seaports") {
      setActiveStore(seaportStore);
      setActiveStoreFiltered(seaportStore);
    }
  };

  const handleRailTracks = (display) => {
    railTracks.forEach((el) => {
      if (display) {
        map.current.addSource("route" + el.id, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: el.geometry.coordinates,
            },
          },
        });
        map.current.addLayer({
          id: "route" + el.id,
          type: "line",
          source: "route" + el.id,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
        });
      } else {
        map.current.removeLayer("route" + el.id);
        map.current.removeSource("route" + el.id);
      }
    });
  };

  useEffect(() => {
    if (storesCoordinates?.length > 0 && polygonCoordinates?.length > 0) {
      const insidePolygon = getCoordinatesInsidePolygon(
        storesCoordinates,
        polygonCoordinates
      );
      let newStore = activeStore?.features?.filter((el) =>
        insidePolygon?.find(
          (val) =>
            JSON.stringify(val) === JSON.stringify(el.geometry.coordinates)
        )
      );
      newStore = {
        type: "FeatureCollection",
        features: newStore,
      };
      setActiveStoreFiltered(newStore);
    }
  }, [polygonCoordinates, activeStore]);

  useEffect(() => {
    if (rail === "true") {
      handleRailTracks(true);
    } else {
      handleRailTracks(false);
    }
  }, [rail]);

  console.log(railTracks);
  return (
    <div>
      {/* <Top>
        <Link href="/">
          <Image src={logo} alt="" />
        </Link>
      </Top> */}
      <MapContext.Provider>
        <div className="container">
          <MapSidebar
            lists={activeStoreFiltered}
            handleListClick={handleListClick}
            listingRef={listingRef}
            handleSearch={handleSearch}
            loading={loading}
            onDataPointClick={handleDataPointClick}
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
          <ResetZoom>
            <TbZoomReplace color="#000" size={18} onClick={resetZoom} />
          </ResetZoom>
        </div>
      </MapContext.Provider>
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

export const ResetZoom = styled.div`
  cursor: pointer;
  position: absolute;
  top: 175px;
  right: 8px;
  z-index: 1000;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 5px;

  :hover {
    background-color: #eee;
  }
`;
