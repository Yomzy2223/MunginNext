import React, { useEffect, useState } from "react";
import logo from "../../assets/images/MUNGINLogo.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsArrowDown } from "react-icons/bs";
import { getCrops } from "../../services/map.service";
import Modal1 from "../../layout/Modal1";
import Analyzer from "../../components/CropDetails/Analyzer";
import Link from "next/link";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import { Container, CropName, Header, Main, Middle, MiddleLeft, MiddleRight, Top } from "./styled";

const DatabaseComponent = () => {
  const [open, setOpen] = useState(false);
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState("");

  const router = useRouter();

  useEffect(() => {
    handleCrops();
  }, []);

  const handleCrops = async () => {
    let crops = await getCrops();
    setCrops(crops);
  };

  const handleMapNavigate = () => {
    const selected = ["farms", "markets", "seaports", "airports"].filter(
      (el) => JSON.parse(localStorage.getItem(el + "States"))?.length > 0
    );

    router.push({
      pathname: "/map",
      query: {
        selected: selected || "",
      },
    });
  };

  return (
    <Container>
      <Header>
        <Top>
          <Link href="/">
            <Image src={logo} alt="" />
          </Link>
        </Top>

        <Middle>
          <Modal1 open={open} onClose={() => setOpen(false)}>
            <Analyzer setOpen={setOpen} />
          </Modal1>
          <MiddleLeft>
            <span>Show</span>
            <span>
              {crops?.length} <MdOutlineKeyboardArrowDown />
            </span>
          </MiddleLeft>
          <MiddleRight>
            <div>
              <input
                type="text"
                placeholder="Search crop..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* <button onClick={handleMapNavigate}>Check Map</button> */}
          </MiddleRight>
        </Middle>
      </Header>
      <Main>
        <div>
          <span> {crops?.length}</span>
          Search results
        </div>
        <table>
          <thead>
            <tr>
              <td>
                <span>
                  Crop <BsArrowDown />
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            {crops
              ?.filter((crop) => crop.cropName.includes(search))
              ?.map((crop, index) => (
                <tr key={index}>
                  <CropName>
                    <Link href={`/database/${crop?.id}/profile`}>{crop?.cropName}</Link>
                  </CropName>
                </tr>
              ))}
          </tbody>
        </table>
      </Main>
    </Container>
  );
};

export default DatabaseComponent;
