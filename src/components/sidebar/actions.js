import { useRouter } from "next/router";

export const useActions = ({ onDataPointClick }) => {
  const router = useRouter();

  const { selected, rail } = router.query;

  const active =
    typeof selected === "string"
      ? selected
      : router.query?.selected?.[selected?.length - 1];

  //
  const checkSelectedStates = (state) => {
    let selectedStates =
      typeof window !== "undefined"
        ? localStorage.getItem(active + "States")
        : false;
    if (selectedStates) {
      selectedStates = JSON.parse(selectedStates);
      return selectedStates.find((el) => el === state.shortName);
    } else return false;
  };

  //
  const checkSelectedDataPoints = (text) => {
    if (selected === null || selected === undefined) return false;
    if (typeof selected === "string") {
      if (selected === text) return true;
      else return false;
    } else if (selected.find((el) => el === text)) return true;
    else return false;
  };

  const handleDataSelect = (selected) => {
    if (rail === "true") return;

    let currSelected = router.query.selected || [];

    if (typeof currSelected === "string") {
      if (currSelected === selected) {
        currSelected = [];
      } else currSelected = [currSelected, selected];
    } else {
      if (currSelected?.find((el) => el === selected)) {
        currSelected = currSelected.filter((el) => el !== selected);
      } else currSelected = [...new Set([...currSelected, selected])];
    }

    router.push({
      query: {
        ...router.query,
        selected: currSelected,
      },
    });
  };

  //
  const handleDataToggle = (selected) => {
    let currSelected = router.query.selected || [];

    if (typeof currSelected !== "string") {
      currSelected = currSelected.filter((el) => el !== selected);
      currSelected.push(selected);
    }
    onDataPointClick(selected);

    router.push({
      query: {
        ...router.query,
        selected: currSelected,
      },
    });
  };

  return {
    active,
    selected,
    checkSelectedStates,
    handleDataSelect,
    handleDataToggle,
    checkSelectedDataPoints,
  };
};
