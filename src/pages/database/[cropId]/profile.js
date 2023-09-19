import ImageWithLabel from "@/components/CropDetails/ImageWithLabel";
import DetailsLayout from "@/layout/DetailsLayout";
import { storeTitle } from "@/redux/slices";
import { store } from "@/redux/store";
import { getCrops } from "@/services/map.service";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [crops, setCrops] = useState([]);

  // Get crop Id from the location pathname
  const { query } = useRouter();
  let cropId = query.cropId;

  useEffect(() => {
    store.dispatch(storeTitle("Profile"));
    handleCrops();
  }, [cropId]);

  // Get all crops and set the selected crop
  const handleCrops = async () => {
    let crops = await getCrops();
    let selectedCrop = crops?.filter((crop) => crop?.id?.toString() === cropId?.toString());
    setCrops(selectedCrop ? selectedCrop[0] : []);
  };

  // This formats the list to display under the image
  let list = [
    { property: "common name", value: crops?.commonName },
    { property: "crop name", value: crops?.cropName },
    {
      property: "scientific name",
      value: crops?.scientificName,
      valueStyle: { fontStyle: "italic" },
    },
    { property: "yeild rate", value: crops?.yieldRate },
  ];

  return (
    <DetailsLayout>
      <ImageWithLabel image={crops?.imageUrl} list={list} />
    </DetailsLayout>
  );
};

export default Profile;
