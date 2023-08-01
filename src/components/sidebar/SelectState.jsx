import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import styled from "styled-components";
import { nigeriaStates } from "./constants";
import { FcCheckmark } from "react-icons/fc";
import { useActions } from "./actions";

const SelectState = () => {
  const [stateSelect, setStateSelect] = useState(false);
  const [checked, setChecked] = useState(false);

  const {
    active,
    selected,
    checkSelectedStates,
    handleDataSelect,
    checkSelectedDataPoints,
  } = useActions({});

  const router = useRouter();
  const { rail, power } = router.query;

  const [railChecked, setRailChecked] = useState(
    rail === "true" ? true : false
  );
  const [powerChecked, setPowerChecked] = useState(
    power === "true" ? true : false
  );

  const handleView = (state) => {
    console.log(state);
    router.push({
      query: {
        ...router.query,
        view: true,
      },
    });
  };

  const handleBack = () => {
    router.push("/database");
  };

  //
  const selectState = (state) => {
    state = state.shortName;
    let selectedStates =
      JSON.parse(localStorage.getItem(active + "States")) || [];

    if (selectedStates?.find((el) => el === state)) {
      selectedStates = selectedStates.filter((el) => el !== state);
    } else {
      if (
        (active === "farms" && selectedStates.length > 0) ||
        (active === "markets" && selectedStates.length > 0) ||
        (active === "factory" && selectedStates.length > 0) ||
        (active === "electric" && selectedStates.length > 0)
      )
        return;
      selectedStates = [...selectedStates, state];
    }

    localStorage.setItem(active + "States", JSON.stringify(selectedStates));
    setStateSelect(!stateSelect);
  };

  //
  const seeRailTracks = (e) => {
    setRailChecked(!railChecked);
    router.push({
      query: {
        ...router.query,
        rail: !railChecked,
      },
    });
  };

  //
  const setPower = (e) => {
    setPowerChecked(!powerChecked);
    router.push({
      query: {
        ...router.query,
        power: !powerChecked,
      },
    });
  };

  //
  const selectAll = (e) => {
    setChecked(!checked);
    const statesShortName = nigeriaStates.map((el) => el.shortName);
    if (!checked) {
      localStorage.setItem(active + "States", JSON.stringify(statesShortName));
      setStateSelect(!stateSelect);
    } else {
      localStorage.removeItem(active + "States");
      setStateSelect(!stateSelect);
    }
  };

  const farmStates =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("farmsStates"))
      : [];
  const marketStates =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("marketsStates"))
      : [];
  const factoryStates =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("factoryStates"))
      : [];
  const electricStates =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("electricStates"))
      : [];

  useEffect(() => {
    if (active) {
      let selectedStates = localStorage.getItem(active + "States");
      selectedStates = selectedStates ? JSON.parse(selectedStates) : [];
      if (selectedStates?.length === 36) setChecked(true);
      else setChecked(false);
    }
  }, [router.query.selected, stateSelect]);

  const getDisabled = (state) => {
    return (
      (active === "farms" &&
        farmStates?.length > 0 &&
        state.shortName !== farmStates[0]) ||
      (active === "markets" &&
        marketStates?.length > 0 &&
        state.shortName !== marketStates[0]) ||
      (active === "factory" &&
        factoryStates?.length > 0 &&
        state.shortName !== factoryStates[0]) ||
      (active === "electric" &&
        electricStates?.length > 0 &&
        state.shortName !== electricStates[0])
    );
  };

  return (
    <SelectStateWrapper>
      <Title>
        <HiArrowLeft
          onClick={handleBack}
          style={{ cursor: "pointer", height: "25px" }}
        />{" "}
        Select datapoints and states
      </Title>

      <Main>
        <DataPoints>
          <DataPoint
            $active={active === "farms"}
            $selected={checkSelectedDataPoints("farms")}
            onClick={() => handleDataSelect("farms")}
            $disable={rail === "true" ? true : false}
          >
            Farms
          </DataPoint>
          <DataPoint
            $active={active === "airports"}
            $selected={checkSelectedDataPoints("airports")}
            onClick={() => handleDataSelect("airports")}
            hueSelected={170}
            hueActive={190}
            $disable={rail === "true" ? true : false}
          >
            Airports
          </DataPoint>
          <DataPoint
            $active={active === "seaports"}
            $selected={checkSelectedDataPoints("seaports")}
            onClick={() => handleDataSelect("seaports")}
            hueSelected={220}
            hueActive={240}
            $disable={rail === "true" ? true : false}
          >
            Seaports
          </DataPoint>
          <DataPoint
            $active={active === "markets"}
            $selected={checkSelectedDataPoints("markets")}
            onClick={() => handleDataSelect("markets")}
            hueSelected={260}
            hueActive={280}
            $disable={rail === "true" ? true : false}
          >
            Markets
          </DataPoint>
          <DataPoint
            $active={active === "factory"}
            $selected={checkSelectedDataPoints("factory")}
            onClick={() => handleDataSelect("factory")}
            hueSelected={290}
            hueActive={310}
            $disable={rail === "true" ? true : false}
          >
            Factories
          </DataPoint>
          <DataPoint
            $active={active === "electric"}
            $selected={checkSelectedDataPoints("electric")}
            onClick={() => handleDataSelect("electric")}
            hueSelected={340}
            hueActive={360}
            $disable={rail === "true" ? true : false}
          >
            Electricity Stations
          </DataPoint>
        </DataPoints>

        <SelectAll>
          <RailTrack disable={selected}>
            <label htmlFor="rail-tracks">Rail Tracks</label>
            <input
              type="checkbox"
              id="rail-tracks"
              onChange={seeRailTracks}
              checked={railChecked}
              disabled={selected}
            />{" "}
            <label htmlFor="power" style={{ color: "hsl(20, 54%, 58%" }}>
              Power Plants
            </label>
            <input
              type="checkbox"
              id="power"
              onChange={setPower}
              checked={powerChecked}
              style={{ accentColor: "hsl(20, 54%, 58%" }}
            />{" "}
          </RailTrack>
          {active &&
            active !== "farms" &&
            active !== "markets" &&
            active !== "factory" &&
            active !== "electric" && (
              <>
                <label htmlFor="select-all">Select All</label>
                <input
                  type="checkbox"
                  id="select-all"
                  onChange={selectAll}
                  checked={checked}
                />
              </>
            )}
        </SelectAll>
        <AllStates>
          {nigeriaStates.map((state, i) => (
            <EachState
              key={i}
              onClick={() => selected && selectState(state)}
              $selected={selected}
              $disable={getDisabled(state)}
            >
              {checkSelectedStates(state) && (
                <Icon>
                  <FcCheckmark />
                </Icon>
              )}
              <Short>{state.shortName}</Short>
              <FullName>{state.name}</FullName>
            </EachState>
          ))}
          <ViewOnMap>
            <button onClick={handleView} disabled={!selected}>
              View On Map
            </button>
          </ViewOnMap>
        </AllStates>
      </Main>
    </SelectStateWrapper>
  );
};

export default SelectState;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 12px 24px;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 1px solid #eee;
`;

export const SelectStateWrapper = styled.div`
  max-height: 100vh;
`;

export const DataPoints = styled.div`
  display: flex;
  gap: 16px;
  border-bottom: 1px solid #eee;
  padding: 12px 24px;
  width: 100%;
  overflow-x: auto;

  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    border-left: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-track {
    background: none;
  }

  ::-webkit-scrollbar-thumb {
    background: #00853e;
    border-radius: 0;
  }
`;

export const DataPoint = styled.p`
  cursor: pointer;
  padding: 5px;
  color: hsl(148, 100%, 26%);
  border-radius: 8px;
  transition: 0.2s ease all;
  box-shadow: 5px 0 5px #e5e5e5;

  :hover {
    opacity: 0.95;
  }

  :active {
    scale: 0.9;
  }

  ${({ $selected, $active, hueActive, hueSelected, $disable }) => {
    if ($active)
      return `
        background-color:  hsl( ${hueActive || "140"}, 72%, 28%);
        box-shadow: 0 10px 15px hsl( ${hueActive || "140"}, 72%, 70%);
        color: #fff
    `;
    if ($selected)
      return `
        background-color:  hsl( ${hueSelected || "100"}, 54%, 58%);
        border-bottom: 1px solid hsl( ${hueSelected || "100"}, 54%, 58%);
        color: #fff
      `;
    if ($disable)
      return `
      cursor: not-allowed;
      opacity: 0.5;
      color:  hsl(148, 100%, 26%);

      :hover {
        opacity: 0.5;
      }
      :active {
        scale: 1;
      }
    `;
  }}
`;

export const SelectAll = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #eee;
  padding: 12px 24px;
  font-size: 14px;

  input {
    accent-color: #6f972d;
  }
`;

export const RailTrack = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  label:nth-of-type(1) {
    opacity: ${({ disable }) => disable && 0.5};
    cursor: ${({ disable }) => disable && "not-allowed"};
  }

  input:nth-of-type(1) {
    margin: 0;
    cursor: ${({ disable }) => disable && "not-allowed"};
  }
`;

export const Main = styled.div`
  display: flex;
  flex-flow: column;
`;

export const AllStates = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  flex-flow: row wrap;
  flex: 1;
  gap: 32px;
  padding: 12px 24px;

  max-height: calc(100vh - 146px);
  overflow: auto;

  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    border-left: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-track {
    background: none;
  }

  ::-webkit-scrollbar-thumb {
    background: #00853e;
    border-radius: 0;
  }
`;

export const EachState = styled.div`
  position: relative;
  cursor: not-allowed;

  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  height: 110px;
  width: 100%;
  opacity: 0.6;

  padding: 10px;
  border-radius: 8px;
  border: 1px solid #dffff0;
  box-shadow: 5px 0 5px #e5e5e5;
  transition: 0.2s ease all;

  ${({ $selected, $disable }) =>
    $selected &&
    !$disable &&
    `
    cursor: pointer;
    opacity: 1;

    :hover {
      opacity: 0.9;
    }
    :focus {
      opacity: 0.8;
    }
    :active {
      opacity: 0.8;
      scale: 0.9;
    }
    
  `}
`;

export const Icon = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const FullName = styled.p`
  text-align: center;
`;

export const Short = styled.p`
  padding: 10px;
  border-radius: 50%;
  background-color: #dffff0;
  color: hsl(148, 100%, 26%);
  font-weight: 700;
  font-size: 18px;
`;

export const ViewOnMap = styled.div`
  position: sticky;
  bottom: 0;
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;

  button {
    background-color: hsl(118, 100%, 26%);
    border: none;
    outline: none;
    padding: 12px 16px;
    color: #fff;
    border-radius: 12px;
    transition: 0.2s ease all;

    box-shadow: 0 0 15px hsl(118, 100%, 90%);

    cursor: pointer;
    opacity: 1;

    :hover {
      opacity: 0.9;
    }
    :focus {
      opacity: 0.8;
    }
    :active {
      opacity: 0.8;
      scale: 0.9;
    }
    :disabled {
      opacity: 0.7;
      scale: 1;
      cursor: not-allowed;
    }
  }
`;
