// import React, { useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';

// mapboxgl.accessToken = 'pk.eyJ1IjoieW9tenkyMjIzIiwiYSI6ImNrdjJoZWV4cDFyeHYyb3FxajV0dnJnZGgifQ.ueRpbzKRePcKJD6V_uzRoQ';

// const Mapbox = () => {
//   useEffect(() => {
//     const map = new mapboxgl.Map({
//       container: 'map',
//       style: 'mapbox://styles/mapbox/light-v11',
//       center: [-77.034084142948, 38.909671288923],
//       zoom: 13,
//       scrollZoom: false
//     });

//     const stores = {
//       type: 'FeatureCollection',
//       features: [
//         // ... store data
//       ]
//     };

//     stores.features.forEach((store, i) => {
//       store.properties.id = i;
//     });

//     map.on('load', () => {
//       map.addSource('places', {
//         type: 'geojson',
//         data: stores
//       });

//       buildLocationList(stores);
//       addMarkers();
//     });

//     function addMarkers() {
//       for (const marker of stores.features) {
//         const el = document.createElement('div');
//         el.id = `marker-${marker.properties.id}`;
//         el.className = 'marker';

//         new mapboxgl.Marker(el, { offset: [0, -23] })
//           .setLngLat(marker.geometry.coordinates)
//           .addTo(map);

//         el.addEventListener('click', (e) => {
//           flyToStore(marker);
//           createPopUp(marker);
//           const activeItem = document.getElementsByClassName('active');
//           e.stopPropagation();
//           if (activeItem[0]) {
//             activeItem[0].classList.remove('active');
//           }
//           const listing = document.getElementById(`listing-${marker.properties.id}`);
//           listing.classList.add('active');
//         });
//       }
//     }

//     function buildLocationList(stores) {
//       for (const store of stores.features) {
//         const listings = document.getElementById('listings');
//         const listing = document.createElement('div');
//         listing.id = `listing-${store.properties.id}`;
//         listing.className = 'item';

//         const link = document.createElement('a');
//         link.href = '#';
//         link.className = 'title';
//         link.id = `link-${store.properties.id}`;
//         link.innerHTML = `${store.properties.address}`;

//         const details = document.createElement('div');
//         details.innerHTML = `${store.properties.city}`;
//         if (store.properties.phone) {
//           details.innerHTML += ` &middot; ${store.properties.phoneFormatted}`;
//         }

//         link.addEventListener('click', function () {
//           for (const feature of stores.features) {
//             if (this.id === `link-${feature.properties.id}`) {
//               flyToStore(feature);
//               createPopUp(feature);
//             }
//           }
//           const activeItem = document.getElementsByClassName('active');
//           if (activeItem[0]) {
//             activeItem[0].classList.remove('active');
//           }
//           this.parentNode.classList.add('active');
//         });

//         listing.appendChild(link);
//         listing.appendChild(details);
//         listings.appendChild(listing);
//       }
//     }

//     function flyToStore(currentFeature) {
//       map.flyTo({
//         center: currentFeature.geometry.coordinates,
//         zoom: 15
//       });
//     }

//     function createPopUp(currentFeature) {
//       const popUps = document.getElementsByClassName('mapboxgl-popup');
//       if (popUps[0]) popUps[0].remove();
//       const popup = new mapboxgl.Popup({ closeOnClick: false })
//         .set      /**
//        * Assign a unique id to each store. You'll use this `id`
//        * later to associate each point on the map with a listing
//        * in the sidebar.
//        */
//       stores.features.forEach((store, i) => {
//         store.properties.id = i;
//       });

//       /**
//        * Wait until the map loads to make changes to the map.
//        */
//       map.on('load', () => {
//         /**
//          * This is where your '.addLayer()' used to be, instead
//          * add only the source without styling a layer
//          */
//         map.addSource('places', {
//           'type': 'geojson',
//           'data': stores
//         });

//         /**
//          * Add all the things to the page:
//          * - The location listings on the side of the page
//          * - The markers onto the map
//          */
//         buildLocationList(stores);
//         addMarkers();
//       });

//       /**
//        * Add a marker to the map for every store listing.
//        **/
//       function addMarkers() {
//         /* For each feature in the GeoJSON object above: */
//         for (const marker of stores.features) {
//           /* Create a div element for the marker. */
//           const el = document.createElement('div');
//           /* Assign a unique `id` to the marker. */
//           el.id = `marker-${marker.properties.id}`;
//           /* Assign the `marker` class to each marker for styling. */
//           el.className = 'marker';

//           /**
//            * Create a marker using the div element
//            * defined above and add it to the map.
//            **/
//           new mapboxgl.Marker(el, { offset: [0, -23] })
//             .setLngLat(marker.geometry.coordinates)
//             .addTo(map);

//           /**
//            * Listen to the element and when it is clicked, do three things:
//            * 1. Fly to the point
//            * 2. Close all other popups and display popup for clicked store
//            * 3. Highlight listing in sidebar (and remove highlight for all other listings)
//            **/
//           el.addEventListener('click', (e) => {
//             /* Fly to the point */
//             flyToStore(marker);
//             /* Close all other popups and display popup for clicked store */
//             createPopUp(marker);
//             /* Highlight listing in sidebar */
//             const activeItem = document.getElementsByClassName('active');
//             e.stopPropagation();
//             if (activeItem[0]) {
//               activeItem[0].classList.remove('active');
//             }
//             const listing = document.getElementById(
//               `listing-${marker.properties.id}`
//             );
//             listing.classList.add('active');
//           });
//         }
//       }

//       /**
//        * Add a listing for each store to the sidebar.
//        **/
//       function buildLocationList(stores) {
//         for (const store of stores.features) {
//           /* Add a new listing section to the sidebar. */
//           const listings = document.getElementById('listings');
//           const listing = listings.appendChild(document.createElement('div'));
//           /* Assign a unique `id` to the listing. */
//           listing.id = `listing-${store.properties.id}`;
//           /* Assign the `item` class to each listing for styling. */
//           listing.className = 'item';

//           /* Add the link to the individual listing created above. */
//           const link = listing.appendChild(document.createElement('a'));
//           link.href = '#';
//           link.className = 'title';
//           link.id = `link-${store.properties.id}`;
//           link.innerHTML = `${store.properties.address}`;

//           /* Add details to the individual listing. */
//           const details = listing.appendChild(document.createElement('div'));
//           details.innerHTML = `${store.properties.city}`;
//           if (store.properties.phone) {
//             details            .innerHTML += ` | ${store.properties.phone}`;
//           }
//         }
//       }

//       /**
//        * Use Mapbox GL JS's `flyTo` to move the camera smoothly
//        * in relation to a clicked symbol/pin on the map.
//        **/
//       function flyToStore(currentFeature) {
//         map.flyTo({
//           center: currentFeature.geometry.coordinates,
//           zoom: 15
//         });
//       }

//       /**
//        * Create a Mapbox GL JS `Popup`.
//        **/
//       function createPopUp(currentFeature) {
//         const popUps = document.getElementsByClassName('mapboxgl-popup');
//         if (popUps[0]) popUps[0].remove();

//         const popup = new mapboxgl.Popup({ closeOnClick: false })
//           .setLngLat(currentFeature.geometry.coordinates)
//           .setHTML(
//             `<h3>${currentFeature.properties.address}</h3>
//             <h4>${currentFeature.properties.city}</h4>`
//           )
//           .addTo(map);
//       }
