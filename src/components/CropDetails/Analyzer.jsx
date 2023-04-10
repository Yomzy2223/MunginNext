import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import styled from "styled-components";
import { analyzeCrop } from "../../services/auth.service";

const Analyzer = ({ setOpen }) => {
  const [analysed, setAnalysed] = useState(false);
  const [result, setResult] = useState("");
  // const [params, setParams] = useSearchParams();

  // const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    let required = {
      rainfall: Number(e.target[2].value) * 1.0,
      soil: e.target[1].value,
      crop: e.target[0].value,
    };
    setParams(required);
    setAnalysed(true);
  };

  const handleAnalysis = async () => {
    let response = await analyzeCrop(location.search);
    setResult(response);
  };

  useEffect(() => {
    if (analysed === true) handleAnalysis();
  }, [analysed]);

  return (
    <AnalyzerContainer>
      <Back onClick={() => setOpen(false)}>
        <MdKeyboardArrowLeft /> <span to="">Back</span>
      </Back>
      <Content>
        <Top>
          <p>Analyze Crop Yield</p>
          {!analysed && (
            <p>
              Input your crop information in the fields provided below to
              calculate a possible yield
            </p>
          )}
        </Top>
        <Middle onSubmit={handleSubmit}>
          {!analysed && (
            <Input>
              <p>Crop Name</p>
              <input
                type="text"
                placeholder="Rice"
                disabled={analysed}
                required
              />
            </Input>
          )}
          <Input>
            <p>Soil Type</p>
            <input
              type="text"
              placeholder="Sandy Soil"
              disabled={analysed}
              required
            />
          </Input>
          <Input>
            <p>Rainfall Value</p>
            <input
              type="text"
              placeholder="300 mm/annum"
              disabled={analysed}
              required
            />
            {analysed && (
              <Result>
                <span>Result:</span>
                <span>{result}</span>
              </Result>
            )}
          </Input>
          {!analysed && <Button>Analyze Crop Yield</Button>}
        </Middle>
      </Content>
    </AnalyzerContainer>
  );
};

export default Analyzer;

export const AnalyzerContainer = styled.div`
  padding: 38px 24px;
  border-radius: 12px;
  background-color: #ffffff;
  width: 100%;
  max-width: 90vw;
`;

export const Back = styled.div`
  display: flex;
  align-items: center;
  color: #888888;
  font-weight: 400;
  font-size: 12px;
  line-height: 13px;
  margin-bottom: 23px;
  cursor: pointer;
  max-width: max-content;
`;

export const Content = styled.div``;

export const Top = styled.div`
  padding-bottom: 16px;
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 16px;

  p {
    :nth-of-type(1) {
      font-weight: 700;
      font-size: 14px;
      line-height: 18px;
      color: #313131;
      margin-bottom: 8px;
    }
    :nth-of-type(2) {
      font-weight: 400;
      font-size: 12px;
      line-height: 13px;
      color: #888888;
    }
  }
`;

export const Middle = styled.form`
  display: flex;
  flex-flow: column;
  gap: 16px;
`;

export const Input = styled.div`
  p {
    font-weight: 500;
    font-size: 12px;
    line-height: 13px;
    color: #313131;
  }
  input {
    padding: 10px 12px;
    border: 1px solid #eeeeee;
    outline: none;
    border-radius: 5px;
    width: 100%;
    font-size: 12px;
    margin-block: 4px;
    text-transform: capitalize;

    :placeholder-shown {
      font-size: 12px;
    }
    :disabled {
      background-color: #eaeaea;
    }
  }
`;

export const Result = styled.div`
  span {
    font-weight: 700;
    font-size: 10px;
    line-height: 10px;

    :nth-of-type(1) {
      color: #778761;
      margin-right: 4px;
    }
    :nth-of-type(2) {
      color: #565656;
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  background: #17233c;
  border-radius: 4px;
  padding: 12px;
  color: white;
  margin-top: 8px;
  border: none;
`;
