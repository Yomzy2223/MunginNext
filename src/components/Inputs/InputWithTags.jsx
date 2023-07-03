import React, { useRef, useState } from "react";
import { MdClear } from "react-icons/md";
import { Container, EachOption, InputWrapper, Options, Tags } from "./styled";

const InputWithTags = ({
  type,
  options,
  handleSelect,
  handleRemove,
  tags,
  placeholder,
}) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const inputRef = useRef();

  const handleEnter = (e) => {
    if (e.key === "Enter") {
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
  };

  const normalize = (text) => text.toLowerCase().trim();

  options = options?.filter((el) => normalize(el)?.includes(normalize(value)));

  console.log(tags);
  return (
    <Container>
      <InputWrapper>
        <input
          ref={inputRef}
          type={type || "text"}
          onKeyDown={handleEnter}
          onChange={handleChange}
          onClick={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
        />
      </InputWrapper>
      {tags.length > 0 && (
        <Tags>
          {tags?.map((el, i) => (
            <span key={i}>
              {el}{" "}
              <MdClear
                onClick={() => handleRemove(el)}
                style={{ cursor: "pointer" }}
              />
            </span>
          ))}
        </Tags>
      )}
      {inputRef.current === document.activeElement && (
        <Options>
          {options?.map((el, i) => (
            <EachOption key={i} onMouseDown={() => handleSelect(el)}>
              {el}
            </EachOption>
          ))}
        </Options>
      )}
    </Container>
  );
};

export default InputWithTags;
