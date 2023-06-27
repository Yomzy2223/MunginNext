import { useRouter } from "next/router";
import React, { useState } from "react";
import { Puff } from "react-loading-icons";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

const MapSidebar = ({
  itemsPerPage = 1000,
  lists,
  handleListClick,
  listingRef,
  handleSearch,
  loading,
  handleChange = () => {},
}) => {
  const [itemOffset, setItemOffset] = useState(0);

  const { query } = useRouter();

  const { farm } = query;

  const items = lists?.features;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="sidebar">
      <MapSidebarHeader className="heading">
        <select name="locations" id="locations" onChange={handleChange}>
          <option value="farms">Farms</option>
          <option value="airports">Airports</option>
        </select>
        {/* <h1>Farms</h1> */}
        <input
          type="text"
          placeholder="Search location, farms..."
          onChange={handleSearch}
        />
      </MapSidebarHeader>
      {loading ? (
        <Loading>
          <Puff stroke="#00853e" fill="white" />
        </Loading>
      ) : (
        <div id="listings" className="listings">
          {currentItems?.map((store, i) => (
            <Listing
              key={i}
              id={`listing-${store.properties.id}`}
              className="item"
              ref={listingRef}
              active={farm === store.properties.name}
            >
              <a
                id={`link-${store.properties.id}`}
                href="#"
                className="title"
                onClick={() => handleListClick(store)}
              >
                {store.properties.name}, {store?.properties?.farmType}
              </a>
              <div>
                {store?.properties?.farmCategory}, {store?.properties?.region},{" "}
                {store.properties.state}
              </div>
            </Listing>
          ))}
        </div>
      )}
      <Pagination>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </Pagination>
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

  select {
    border: none;
    font-size: 16px;
    font-weight: 500;
  }
`;

export const Listing = styled.div`
  background-color: ${({ active }) => (active ? "#BAFFE655" : "transparent")};
`;

export const Pagination = styled.div`
  ul {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style-type: none;
    padding: 0 10px;

    li a {
      border-radius: 7px;
      padding: 4px 10px;
      /* border: #00853e 1px solid; */
      cursor: pointer;
    }
    li.previous a,
    li.next a,
    li.break a {
      border-color: transparent;
    }
    li.active a {
      background-color: #00853e;
      border-color: transparent;
      color: white;
      min-width: 32px;
    }
    li.disabled a {
      color: grey;
    }
    li.disable,
    li.disabled a {
      cursor: default;
    }
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding-block: 50px;
`;
