const { nigeriaStates } = require("@/components/sidebar/constants");

export const getStateFullName = (short) => {
  const full = nigeriaStates?.find((el) => el.shortName === short);
  return full?.name;
};
