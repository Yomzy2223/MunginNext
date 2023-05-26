import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
// import "./Map.css";
import ReactDOM from "react-dom";
import Tooltip from "@/components/Tooltip";
import styles from "@/styles/map.module.css";
import MapHeader from "@/components/header/MapHeader";

mapboxgl.accessToken =
  "pk.eyJ1IjoieW9tenkyMjIzIiwiYSI6ImNsaHgyZ28xcjBwcGozcW50anYwd2owcTkifQ.-uQHl78lQyHAQf-wnBAplw";

const Map = () => {
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const map = useRef(null);
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  // Initialize map when component mounts
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-79.38, 43.65],
      zoom: 12.5,
    });

    map.current.on("load", () => {
      map.current.addLayer({
        id: "hospitals",
        type: "symbol",
        source: {
          type: "geojson",
          data: hospitals,
        },
        layout: {
          "icon-image": "hospital",
          "icon-allow-overlap": true,
        },
        paint: {},
      });

      map.current.addLayer({
        id: "libraries",
        type: "symbol",
        source: {
          type: "geojson",
          data: libraries,
        },
        layout: {
          "icon-image": "library",
          "icon-allow-overlap": true,
        },
        paint: {},
      });

      map.current.addSource("nearest-hospital", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      const popup = new mapboxgl.Popup();

      map.current.on("mousemove", (event) => {
        const features = map.current.queryRenderedFeatures(event.point, {
          layers: ["hospitals", "libraries"],
        });
        if (!features.length) {
          popup.remove();
          return;
        }

        const feature = features[0];
        console.log(feature);

        popup
          .setLngLat(feature.geometry.coordinates)
          .setHTML(feature.properties.Name)
          .addTo(map.current);

        map.current.getCanvas().style.cursor = features.length ? "pointer" : "";
      });

      map.current.on("click", (event) => {
        const libraryFeatures = map.current.queryRenderedFeatures(event.point, {
          layers: ["libraries"],
        });
        if (!libraryFeatures.length) {
          return;
        }

        const libraryFeature = libraryFeatures[0];

        const nearestHospital = turf.nearest(libraryFeature, hospitals);

        if (nearestHospital === null) return;
        map.current.getSource("nearest-hospital").setData({
          type: "FeatureCollection",
          features: [nearestHospital],
        });

        if (map.current.getLayer("nearest-hospital")) {
          map.current.removeLayer("nearest-hospital");
        }

        map.current.addLayer(
          {
            id: "nearest-hospital",
            type: "circle",
            source: "nearest-hospital",
            paint: {
              "circle-radius": 12,
              "circle-color": "#486DE0",
            },
          },
          "hospitals"
        );
      });
    });

    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.current.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(lng, lat, zoom);

  return (
    <div>
      <MapHeader lng={lng} lat={lat} zoom={zoom} />
      <div id="map" className={styles.container} ref={mapContainerRef} />
    </div>
  );
};

export default Map;

//

//

//

//

//
//

//

//

//

//

const hospitals = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        Name: "VA Medical Center -- Leestown Division",
        Address: "2250 Leestown Rd",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.539487, 38.072916],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "St. Joseph East",
        Address: "150 N Eagle Creek Dr",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.440434, 37.998757],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "Central Baptist Hospital",
        Address: "1740 Nicholasville Rd",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.512283, 38.018918],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "VA Medical Center -- Cooper Dr Division",
        Address: "1101 Veterans Dr",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.506483, 38.02972],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "Shriners Hospital for Children",
        Address: "1900 Richmond Rd",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.472941, 38.022564],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "Eastern State Hospital",
        Address: "627 W Fourth St",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.498816, 38.060791],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "Cardinal Hill Rehabilitation Hospital",
        Address: "2050 Versailles Rd",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.54212, 38.046568],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "St. Joseph Hospital",
        ADDRESS: "1 St Joseph Dr",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.523636, 38.032475],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "UK Healthcare Good Samaritan Hospital",
        Address: "310 S Limestone",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.501222, 38.042123],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "UK Medical Center",
        Address: "800 Rose St",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.508205, 38.031254],
      },
    },
  ],
};

//

//

//

//

//

//

//

const libraries = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        Name: "Village Branch",
        Address: "2185 Versailles Rd",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.548369, 38.047876],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "Northside Branch",
        ADDRESS: "1733 Russell Cave Rd",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.47135, 38.079734],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "Central Library",
        ADDRESS: "140 E Main St",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.496894, 38.045459],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "Beaumont Branch",
        Address: "3080 Fieldstone Way",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.557948, 38.012502],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "Tates Creek Branch",
        Address: "3628 Walden Dr",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.498679, 37.979598],
      },
    },
    {
      type: "Feature",
      properties: {
        Name: "Eagle Creek Branch",
        Address: "101 N Eagle Creek Dr",
      },
      geometry: {
        type: "Point",
        coordinates: [-84.442219, 37.999437],
      },
    },
  ],
};
