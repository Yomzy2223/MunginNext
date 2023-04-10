import React from "react";

const CropProfileIcon = ({ active }) => {
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
            d="M8.40653 1.9735C8.16653 1.78683 7.83322 1.78683 7.59322 1.9735C6.32655 2.94016 2.58653 6.0935 2.60653 9.76683C2.60653 12.7402 5.02655 15.1668 8.00655 15.1668C10.9865 15.1668 13.4065 12.7468 13.4065 9.7735C13.4132 6.1535 9.66653 2.94683 8.40653 1.9735Z"
            stroke="#778761"
            strokeWidth="1.5"
            strokeMiterlimit="10"
          />
          <path
            d="M8 1.8335V15.1668"
            stroke="#778761"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 13.1398L13.1333 10.6465"
            stroke="#778761"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 9.80659L12.9133 7.41992"
            stroke="#778761"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 6.47318L11.3534 4.83984"
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
            d="M8.40653 1.9735C8.16653 1.78683 7.83322 1.78683 7.59322 1.9735C6.32655 2.94016 2.58653 6.0935 2.60653 9.76683C2.60653 12.7402 5.02655 15.1668 8.00655 15.1668C10.9865 15.1668 13.4065 12.7468 13.4065 9.7735C13.4132 6.1535 9.66653 2.94683 8.40653 1.9735Z"
            stroke="#EEEEEE"
            strokeWidth="1.5"
            strokeMiterlimit="10"
          />
          <path
            d="M8 1.8335V15.1668"
            stroke="#EEEEEE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 13.1398L13.1333 10.6465"
            stroke="#EEEEEE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 9.80659L12.9133 7.41992"
            stroke="#EEEEEE"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 6.47318L11.3534 4.83984"
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

export default CropProfileIcon;
