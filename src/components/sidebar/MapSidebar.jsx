import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const MapSidebar = ({ lists, handleListClick, listingRef, handleSearch }) => {
  const { query } = useRouter();

  const { farm } = query;
  console.log(farm);

  return (
    <div className="sidebar">
      <MapSidebarHeader className="heading">
        <h1>Farms</h1>
        <input
          type="text"
          placeholder="Search location, farms..."
          onChange={handleSearch}
        />
      </MapSidebarHeader>
      <div id="listings" className="listings">
        {lists.features?.map((store, i) => (
          <Listing
            key={i}
            id={`listing-${store.properties.id}`}
            className="item"
            ref={listingRef}
            active={farm === store.properties.farmName}
          >
            <a
              id={`link-${store.properties.id}`}
              href="#"
              className="title"
              onClick={() => handleListClick(store)}
            >
              {store.properties.cropName}, {store?.properties?.livestockName}
            </a>
            <div>
              {store?.properties?.farmName}, {store?.properties?.address},{" "}
              {store.properties.city}
            </div>
          </Listing>
        ))}
      </div>
    </div>
  );
};

export default MapSidebar;

export const MapSidebarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  input {
    flex: 1;
    height: 30px;
    border-radius: 8px;
    border: 1px solid #ccc;
    padding: 0 8px;
  }
`;

export const Listing = styled.div`
  background-color: ${({ active }) => (active ? "#BAFFE655" : "transparent")};
`;
