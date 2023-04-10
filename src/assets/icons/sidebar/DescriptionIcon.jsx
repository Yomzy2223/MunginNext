import React from "react";

const DescriptionIcon = ({ active }) => {
  return (
    <div>
      {active ? (
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.33325 12.5002V5.16683C2.33325 2.50016 2.99992 1.8335 5.66659 1.8335H10.3333C12.9999 1.8335 13.6666 2.50016 13.6666 5.16683V11.8335C13.6666 11.9268 13.6666 12.0202 13.6599 12.1135"
            stroke="#778761"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.23325 10.5H13.6666V12.8333C13.6666 14.12 12.6199 15.1667 11.3333 15.1667H4.66659C3.37992 15.1667 2.33325 14.12 2.33325 12.8333V12.4C2.33325 11.3533 3.18659 10.5 4.23325 10.5Z"
            stroke="#778761"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.33325 5.1665H10.6666"
            stroke="#778761"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.33325 7.5H8.66659"
            stroke="#778761"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.33325 12.5002V5.16683C2.33325 2.50016 2.99992 1.8335 5.66659 1.8335H10.3333C12.9999 1.8335 13.6666 2.50016 13.6666 5.16683V11.8335C13.6666 11.9268 13.6666 12.0202 13.6599 12.1135"
            stroke="#EEEEEE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.23325 10.5H13.6666V12.8333C13.6666 14.12 12.6199 15.1667 11.3333 15.1667H4.66659C3.37992 15.1667 2.33325 14.12 2.33325 12.8333V12.4C2.33325 11.3533 3.18659 10.5 4.23325 10.5Z"
            stroke="#EEEEEE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.33325 5.1665H10.6666"
            stroke="#EEEEEE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.33325 7.5H8.66659"
            stroke="#EEEEEE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default DescriptionIcon;
