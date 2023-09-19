import React, { useRef, useEffect, useState, createContext } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapSidebar from "@/components/sidebar/MapSidebar";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  getElectricityInfo,
  getFactoryInfo,
  getMapAirportInfo,
  getMapInfo,
  getMapSeaportInfo,
  getMarketInfo,
  getPowerInfo,
  getRailTracks,
  getWeatherInfo,
} from "@/services/map.service";
import { TbZoomReplace } from "react-icons/tb";
import { getStateFullName } from "@/utils/globalFunctions";
import * as turf from "@turf/turf";
// import mapboxGLDrawRectangleDrag from "mapboxgl-draw-rectangle-drag";

mapboxgl.accessToken =
  "pk.eyJ1IjoieW9tenkyMjIzIiwiYSI6ImNsaHgyZ28xcjBwcGozcW50anYwd2owcTkifQ.-uQHl78lQyHAQf-wnBAplw";

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
  const [factoryStore, setFactoryStore] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [electricStore, setElectricStore] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [railTracks, setRailTracks] = useState([]);
  const [powerInfo, setPowerInfo] = useState([]);
  const [activeStore, setActiveStore] = useState([]);
  const [activeStoreFiltered, setActiveStoreFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [powerMarkers, setPowerMarkers] = useState([]);

  const router = useRouter();
  const { view, selected, rail, power } = router.query;

  const active = typeof selected === "string" ? selected : selected?.[selected?.length - 1];

  const mapContainerRef = useRef(null);

  let map = useRef();
  const listingRef = useRef();

  const storesCoordinates = activeStore?.features?.map((el) => el?.geometry?.coordinates);

  useEffect(() => {
    if (view) handleMapInfo();
  }, [view]);

  useEffect(() => {
    saveRailTracks();
    savePowerInfo();
  }, []);

  const findDataPoint = (dataPoint) => {
    if (typeof selected === "string") {
      return dataPoint === selected;
    } else {
      return selected?.find((el) => el === dataPoint);
    }
  };

  const saveRailTracks = async () => {
    const rails = await getRailTracks();
    setRailTracks(rails);
  };

  const savePowerInfo = async () => {
    const power = await getPowerInfo();
    console.log(power);
    setPowerInfo(power);
  };

  //
  const handleMapInfo = async () => {
    const farmState = JSON.parse(localStorage.getItem("farmsStates"))?.[0];
    const marketState = JSON.parse(localStorage.getItem("marketsStates"))?.[0];
    const factoryState = JSON.parse(localStorage.getItem("factoryStates"))?.[0];
    const electricState = JSON.parse(localStorage.getItem("electricStates"))?.[0];

    setLoading(true);
    const farms = findDataPoint("farms") ? await getMapInfo(farmState) : [];
    const airports = findDataPoint("airports") ? await getMapAirportInfo() : [];
    const seaports = findDataPoint("seaports") ? await getMapSeaportInfo() : [];
    const markets = findDataPoint("markets") ? await getMarketInfo(marketState) : [];
    const factories = findDataPoint("factory") ? await getFactoryInfo(factoryState) : [];
    const electricity = findDataPoint("electric") ? await getElectricityInfo(electricState) : [];
    setLoading(false);

    resetStores();

    handleDataPoint("farms", farms, setFarmStore);
    handleDataPoint("airports", airports, setAirportStore);
    handleDataPoint("seaports", seaports, setSeaportStore);
    handleDataPoint("markets", markets, setMarketStore);
    handleDataPoint("factory", factories, setFactoryStore);
    handleDataPoint("electric", electricity, setElectricStore);
  };

  const handleDataPoint = (name, data, setStore) => {
    if (data?.length > 0) {
      setStore({
        type: "FeatureCollection",
        features: data,
      });
      handleActive(name, data);
    }
  };

  const handleActive = (name, features) => {
    if (active === name) {
      setActiveStore({
        type: "FeatureCollection",
        features,
      });
      setActiveStoreFiltered({
        type: "FeatureCollection",
        features,
      });
    }
  };

  //
  const resetStores = () => {
    const defaultObj = {
      type: "FeatureCollection",
      features: [],
    };
    setActiveStore(defaultObj);
    setActiveStoreFiltered(defaultObj);
    setFarmStore(defaultObj);
    setAirportStore(defaultObj);
    setSeaportStore(defaultObj);
    setMarketStore(defaultObj);
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
      // modes: {
      //   ...MapboxDraw.modes,
      //   draw_rectangle_drag: mapboxGLDrawRectangleDrag,
      // },
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
        line_string: true,
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
      const isPolygon = coordinates[0]?.[0]?.[0];
      isPolygon && setPolygonCoordinates(coordinates[0]);

      // isPolygon
      //   ? createPopUp2(coordinates[0], "polygon")
      //   : createPopUp2(coordinates, "line");
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
      const isPolygon = coordinates[0]?.[0]?.[0];
      isPolygon && setPolygonCoordinates(coordinates[0]);
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
      if (view && rail !== "true") {
        findDataPoint("farms") && addMarkers(farmStore, "farm-marker");
        findDataPoint("airports") && addMarkers(airportStore, "airport-marker");
        findDataPoint("seaports") && addMarkers(seaportStore, "seaport-marker");
        findDataPoint("markets") && addMarkers(marketStore, "market-marker");
        findDataPoint("factory") && addMarkers(factoryStore, "factory-marker");
        findDataPoint("electric") && addMarkers(electricStore, "electric-marker");
      }
    });

    // activeStore.features.forEach(function (store, i) {
    //   store.properties.id = i;
    // });

    map.current.on("click", (event) => {
      const clickedFeatures = map.current.queryRenderedFeatures(event.point);
      const clickedPolygons = clickedFeatures.filter(
        (feature) =>
          feature.layer.source.includes("mapbox-gl-draw-cold") &&
          feature.geometry.type === "Polygon"
      );
      const clickedPoint = clickedFeatures.filter(
        (feature) =>
          feature.layer.source.includes("mapbox-gl-draw-cold") &&
          feature.geometry.type === "LineString"
      );

      console.log(clickedFeatures);
      if (clickedPolygons.length > 0) {
        const coordinates = clickedPolygons[0].geometry.coordinates[0];
        createPopUp2(coordinates, "polygon", event.lngLat);
      }
      if (clickedPoint.length > 0) {
        const coordinates = clickedPoint[0].geometry.coordinates;
        createPopUp2(coordinates, "line", event.lngLat);
      }
      /* Determine if a feature in the "locations" layer exists at that point. */
      const features = map.current.queryRenderedFeatures(event.point, {
        layers: ["locations"],
      });

      /* If it does not exist, return */
      if (!features?.length) return;

      /* Fly to the point */
      // flyToStore(clickedPoint);

      /* Close all other popups and display popup for clicked store */
      createPopUp(features[0]);

      /* Highlight listing in sidebar (and remove highlight for all other listings) */
      const activeItem = document.getElementsByClassName("active");
      if (activeItem[0]) {
        activeItem[0].classList.remove("active");
      }
      const listing = document.getElementById(`listing-${clickedPoint.properties.id}`);
      if (listing) listing.classList.add("active");
    });

    // Clean up on unmount
    return () => map.current.remove();
  }, [farmStore, marketStore, airportStore, factoryStore, electricStore]); // eslint-disable-line react-hooks/exhaustive-deps

  //
  const addMarkers = (dataPointStore, className) => {
    let markers = [];
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
      if (marker?.geometry?.coordinates) {
        const each = new mapboxgl.Marker(el, { offset: [0, 0] })
          .setLngLat(marker.geometry.coordinates)
          .addTo(map.current);
        markers.push(each);
      }

      if (marker?.electricGeometry?.coordinates) {
        const each = new mapboxgl.Marker(el, { offset: [0, 0] })
          .setLngLat(marker?.geometry?.coordinates || marker?.electricGeometry.coordinates)
          .addTo(map.current);
        markers.push(each);
      }

      el.addEventListener("click", (e) => {
        router.push({
          query: { ...router.query, view, name: marker.properties.name },
        });
        /* Fly to the point */
        // flyToStore(marker);
        /* Close all other popups and display popup for clicked store */
        createPopUp(marker);
        /* Highlight listing in sidebar */
        const activeItem = document.getElementsByClassName("active");
        e.stopPropagation();
        if (activeItem[0]) {
          activeItem[0].classList.remove("active");
        }
        const listing = document.getElementById(`listing-${marker.properties.id}`);
        if (listing) listing.classList.add("active");
      });
    }
    return markers;
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
    if (listingRef.current) listingRef.current.parentNode.classList.add("active");
  };

  const flyToStore = (currentFeature) => {
    map.current.flyTo({
      center: currentFeature?.geometry?.coordinates || currentFeature?.electricGeometry.coordinates,
      zoom: 15,
    });
  };

  const getAreaMeters = (coordinates) => {
    return turf.area({
      type: "Polygon",
      coordinates: [coordinates],
    });
  };

  const getDistance = (coordinates) => {
    let totalDistance = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      const fromPoint = turf.point(coordinates[i]);
      const toPoint = turf.point(coordinates[i + 1]);
      const distance = turf.distance(fromPoint, toPoint, {
        units: "meters",
      }); // You can use other units like 'miles', 'meters', etc.
      totalDistance += distance;
    }
    return totalDistance;
  };

  const createPopUp2 = async (coordinates, type, clickedCoordinate) => {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();

    let distance;
    let areaMeters;

    if (type === "polygon") {
      areaMeters = getAreaMeters(coordinates);
    } else if (type === "line") {
      distance = getDistance(coordinates).toFixed(2);
    }

    const popup = new mapboxgl.Popup({
      closeOnClick: true,
      closeButton: true,
    })
      .setLngLat(clickedCoordinate)
      .setHTML(
        type === "polygon"
          ? `
           <h4>X</h4>
            <ul>
              <li>
                <span>Sq. Meters</span
                <span>${areaMeters.toFixed(2) || "--"}</span
              </li>
              <li>
                <span>Sq. Kilometers</span
                <span>${areaMeters ? (areaMeters / 1000000).toFixed(2) : "--"}
              </li>
              <li>
                <span>Sq. Feet</span
                <span>${areaMeters ? (areaMeters * 10.7639).toFixed(2) : "--"}</span
              </li>
              <li>
                <span>Acres</span
                <span>${(areaMeters / 4046.86).toFixed(2) || "--"}
              </li>
              <li>
                <span>Sq. Miles</span
                <span>${areaMeters ? (areaMeters / 2589988.110336).toFixed(2) : "--"}</span
              </li>
             </ul>
          `
          : `
          <h4>X</h4>
          <ul>
            <li>
              <span>Meters</span
              <span>${distance || "--"}</span
            </li>
            <li>
              <span>Kilometers</span
              <span>${distance ? ((distance * 1) / 1000).toFixed(2) : "--"}</span
            </li>
            <li>
              <span>Feet</span
              <span>${distance ? (distance * 3.28084).toFixed(2) : "--"}</span
            </li>
            <li>
              <span>Yards</span
              <span>${distance ? (distance * 1.09361).toFixed(2) : "--"}</span
            </li>
            <li>
              <span>Miles</span
              <span>${distance ? (distance * 0.000621371).toFixed(2) : "--"}</span
            </li>
          </ul>
          `
      )
      .addClassName("cm-popup")
      .addTo(map.current);
    // Add a click event listener to the close button
    document.querySelector(".popup-close-button")?.addEventListener("click", () => {
      popup.remove();
    });

    document
      .querySelector(".cm-popup")
      .querySelectorAll("div")[1]
      .querySelector("h4")
      ?.addEventListener("click", () => {
        popup.remove();
      });
    // console.log(document.querySelector(".cm-popup"));
  };

  const createPopUp = async (currentFeature) => {
    const popUps = document.getElementsByClassName("mapboxgl-popup");
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove();
    let state = currentFeature?.properties?.state;
    state = getStateFullName(state);

    const weather = await getWeatherInfo(state);

    const popup = new mapboxgl.Popup({
      closeOnClick: true,
      closeButton: true,
    })
      .setLngLat(
        currentFeature?.geometry?.coordinates || currentFeature?.electricGeometry.coordinates
      )
      .setHTML(
        currentFeature.properties.farmCategory
          ? `<h3>${
              currentFeature.properties.farmCategory ||
              currentFeature?.properties?.type ||
              currentFeature?.properties?.source ||
              currentFeature.properties.state
            } <button class="popup-close-button" >X</button></h3>
        
        <h4>${currentFeature.properties.name || currentFeature.properties.port}</h4> 
        
        <div>
        <span>Cloud: ${weather.current.cloud + "%"}</span>
        <span>Feels like: ${weather.current.feelslike_c + "°C"}</span>
        <span>Feels like: ${weather.current.feelslike_f + "°F"}</span>
        <span>Wind gusts speed: ${weather.current.gust_kph + "km/h"}</span>
        <span>Wind gusts speed: ${weather.current.gust_mph + "mph"}</span>
        <span>Humidity: ${weather.current.humidity + "%"}</span>
        <span>Precipitation amount: ${weather.current.precip_in + "in"}</span>
        <span>Precipitation amount: ${weather.current.precip_mm + "mm"}</span>
        <span>Atmospheric pressure: ${weather.current.pressure_in + "inHg"}</span>
        <span>Atmospheric pressure: ${weather.current.pressure_mb + "mb"}</span>
       <span>Temperature: ${weather.current.temp_c + "°C"}</span>
        <span>Temperature: ${weather.current.temp_f + "°F"}</span>
        <span>Ultraviolet index: ${weather.current.uv + "UV"}</span>
        <span>Visibility: ${weather.current.vis_km + "km"}</span>
        <span>Visibility: ${weather.current.vis_miles + "mi"}</span>
        <span>Wind: ${weather.current.wind_degree + "°"}</span>
        <span>Wind): ${weather.current.wind_dir}</span>
        <span>Wind speed: ${weather.current.wind_kph + "km/h"}</span>
        <span>Wind speed : ${weather.current.wind_mph + "mph"}</span>
        </div>
        `
          : `<h3>${
              currentFeature?.properties?.type ||
              currentFeature?.properties?.source ||
              currentFeature.properties.state ||
              currentFeature.properties.typesOfPlants
            } <button class="popup-close-button" >X</button></h3>
        
        <h4>${
          currentFeature.properties.name ||
          currentFeature.properties.port ||
          currentFeature.properties.description
        }</h4> `
      )
      .addTo(map.current);
    // Add a click event listener to the close button
    document.querySelector(".popup-close-button")?.addEventListener("click", () => {
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

      const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

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
    } else if (selected === "factory") {
      setActiveStore(factoryStore);
      setActiveStoreFiltered(factoryStore);
    } else if (selected === "electric") {
      setActiveStore(electricStore);
      setActiveStoreFiltered(electricStore);
    }
  };

  const handleRailTracks = (display) => {
    railTracks.forEach((el) => {
      if (display) {
        console.log(railTracks);
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
        map.current?.removeLayer("route" + el.id);
        map.current?.removeSource("route" + el.id);
      }
    });
  };

  const handlePower = (display) => {
    const features = powerInfo?.map((el, i) => ({
      ...el,
      properties: { ...el.property, id: i },
    }));

    if (display) {
      const markers = addMarkers({ features }, "power-marker");
      setPowerMarkers(markers);
    } else {
      powerMarkers.map((el) => el.remove());
    }
  };

  useEffect(() => {
    if (storesCoordinates?.length > 0 && polygonCoordinates?.length > 0) {
      const insidePolygon = getCoordinatesInsidePolygon(storesCoordinates, polygonCoordinates);
      let newStore = activeStore?.features?.filter((el) =>
        insidePolygon?.find(
          (val) => JSON.stringify(val) === JSON.stringify(el.geometry.coordinates)
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

  useEffect(() => {
    if (power === "true") {
      handlePower(true);
    } else {
      handlePower(false);
    }
  }, [power]);

  return (
    <div>
      {/* <Top>
        <Link href="/">
          <Image src={logo} alt="" />
        </Link>
      </Top> */}
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
  top: 200px;
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
