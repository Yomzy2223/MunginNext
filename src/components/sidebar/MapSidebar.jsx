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
}) => {
  const [itemOffset, setItemOffset] = useState(0);

  const { query } = useRouter();

  const { state } = query;

  return (
    <div className="sidebar">
      {state ? (
        <MapStateInfo
          itemsPerPage={itemsPerPage}
          lists={lists}
          handleListClick={handleListClick}
          listingRef={listingRef}
          handleSearch={handleSearch}
          loading={loading}
          handleChange={handleChange}
        />
      ) : (
        <SelectState />
      )}
    </div>
  );
};

export default MapSidebar;
