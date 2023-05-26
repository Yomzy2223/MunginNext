import ImageWithLabel from "@/components/CropDetails/ImageWithLabel";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Anatomy = () => {
  const { cropDetails } = useSelector((store) => store.database);

  useEffect(() => {
    store.dispatch(storeTitle("Anatomy"));
  }, []);

  const anatomyObj = cropDetails.anatomy ? cropDetails?.anatomy : {};
  const anatomyArr = Object.entries(anatomyObj);

  let listArr = anatomyArr?.filter(
    (each) => each[0] !== "id" && each[0] !== "structure"
  );

  let loaded = listArr?.length > 0;

  const list = [
    {
      property: loaded ? listArr[0][0] : "",
      value: loaded ? listArr[0][1] : "",
    },
    {
      property: loaded ? listArr[1][0] : "",
      value: loaded ? listArr[1][1] : "",
    },
    {
      property: loaded ? listArr[2][0] : "",
      value: loaded ? listArr[2][1] : "",
    },
  ];
  // const list = listArr.map((list) => ({ property: [list[0]], value: list[1] }));

  console.log(anatomyArr);

  const image = anatomyObj?.structure;
  return (
    <DetailsLayout>
      <ImageWithLabel
        image={image}
        // list={list}
        imgStyle={{ maxHeight: "100%" }}
      />
    </DetailsLayout>
  );
};

export default Anatomy;
