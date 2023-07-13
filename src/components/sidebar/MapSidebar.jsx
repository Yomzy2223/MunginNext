import { useRouter } from "next/router";
import React, { useState } from "react";
import { Puff } from "react-loading-icons";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import MapStateInfo from "./MapStateInfo";
import SelectState from "./SelectState";

const MapSidebar = ({
  itemsPerPage = 200,
  lists,
  handleListClick,
  listingRef,
  handleSearch,
  loading,
  handleChange = () => {},
  onDataPointClick,
}) => {
  const [itemOffset, setItemOffset] = useState(0);

  const { query } = useRouter();

  const { view } = query;

  return (
    <div className="sidebar">
      {view === "true" ? (
        <MapStateInfo
          itemsPerPage={itemsPerPage}
          lists={lists}
          handleListClick={handleListClick}
          listingRef={listingRef}
          handleSearch={handleSearch}
          loading={loading}
          handleChange={handleChange}
          onDataPointClick={onDataPointClick}
        />
      ) : (
        <SelectState />
      )}
    </div>
  );
};

export default MapSidebar;
