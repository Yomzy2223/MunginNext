import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import { Puff } from "react-loading-icons";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import InputWithTags from "../Inputs/InputWithTags";
import { useActions } from "./actions";
import { DataPoint, DataPoints } from "./SelectState";

const MapStateInfo = ({
  itemsPerPage,
  lists,
  handleListClick,
  listingRef,
  handleSearch,
  loading,
  handleChange = () => {},
  onDataPointClick = () => {},
}) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [tags, setTags] = useState(["Farms"]);

  const { active, checkSelectedDataPoints, handleDataToggle } = useActions({
    onDataPointClick,
  });

  const router = useRouter();
  const { query } = useRouter();

  const { name, state } = query;

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

  const handleBack = () => {
    router.push({
      pathname: "/map",
      query: {
        ...router.query,
        view: false,
      },
    });
  };

  const handleTagSelect = (tag) => {
    console.log(tag);
    if (!tags.find((el) => el === tag)) {
      setTags([...tags, tag]);
      handleChange([...tags, tag]);
    }
  };

  const handleTagRemove = (tag) => {
    const newTags = tags.filter((el) => el !== tag);
    setTags(newTags);
    handleChange(newTags);
  };

  return (
    <SidebarInfoWrapper>
      <MapSidebarHeader className="heading">
        <DataPoints>
          {checkSelectedDataPoints("farms") && (
            <DataPoint
              $active={active === "farms"}
              $selected={true}
              onClick={() => handleDataToggle("farms")}
            >
              Farms
            </DataPoint>
          )}
          {checkSelectedDataPoints("airports") && (
            <DataPoint
              $active={active === "airports"}
              $selected={true}
              onClick={() => handleDataToggle("airports")}
              hueSelected={170}
              hueActive={190}
            >
              Airports
            </DataPoint>
          )}
          {checkSelectedDataPoints("seaports") && (
            <DataPoint
              $active={active === "seaports"}
              $selected={true}
              onClick={() => handleDataToggle("seaports")}
              hueSelected={220}
              hueActive={240}
            >
              Seaports
            </DataPoint>
          )}
          {checkSelectedDataPoints("markets") && (
            <DataPoint
              $active={active === "markets"}
              $selected={true}
              onClick={() => handleDataToggle("markets")}
              hueSelected={260}
              hueActive={280}
            >
              Markets
            </DataPoint>
          )}
        </DataPoints>
        <SubHeader>
          <HiArrowLeft
            onClick={handleBack}
            style={{
              cursor: "pointer",
              height: "25px",
              justifySelf: "flex-start",
            }}
          />
          <input
            type="text"
            placeholder="Search location, farms..."
            onChange={handleSearch}
          />
          {currentItems && items && (
            <Count>{currentItems?.length + "/" + items?.length}</Count>
          )}
        </SubHeader>
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
              active={name === store.properties.name}
            >
              <a
                id={`link-${store.properties.id}`}
                href="#"
                className="title"
                onClick={() => handleListClick(store)}
              >
                {store.properties.name},{" "}
                {store?.properties?.farmType ||
                  store?.properties?.type ||
                  store?.properties?.source}
              </a>
              <div>
                {store?.properties?.farmCategory}{" "}
                {store?.properties?.farmCategory && ","}{" "}
                {store?.properties?.region} {store?.properties?.region && ","}{" "}
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
    </SidebarInfoWrapper>
  );
};

export default MapStateInfo;

export const SidebarInfoWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-flow: column;
  justify-content: space-between;
`;

export const MapSidebarHeader = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

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

export const Count = styled.p`
  padding: 5px;
  line-height: 20px;
  font-size: 10px;
  font-weight: 600;
  width: max-content;
  color: #305913;
  background-color: #e7ffd6;
  border-radius: 8px;
`;

export const Listing = styled.div`
  background-color: ${({ active }) => (active ? "#BAFFE655" : "transparent")};
`;

export const SubHeader = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  border-bottom: 1px solid #eee;
  padding: 12px 24px;
  width: 100%;
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
