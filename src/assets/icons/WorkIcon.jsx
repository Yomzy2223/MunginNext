import React from "react";

const WorkIcon = ({ hover }) => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.0938 5.3407V7.42038C19.0938 8.7782 18.2344 9.63757 16.8766 9.63757H13.9375V3.63054C13.9375 2.67663 14.7195 1.9032 15.6734 1.9032C16.6102 1.91179 17.4695 2.28992 18.0883 2.90867C18.707 3.53601 19.0938 4.39539 19.0938 5.3407Z"
        stroke={hover ? "#fff" : "#83BF4F"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.61475 7.94463L10.2679 7.2915"
        stroke={hover ? "#fff" : "#83BF4F"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.57568 11.9837L7.4835 10.0759L7.92178 9.63757"
        stroke={hover ? "#fff" : "#83BF4F"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.90625 9.63757V18.2313C1.90625 18.9446 2.71406 19.3485 3.28125 18.9188L4.75078 17.8188C5.09453 17.561 5.57578 17.5954 5.88516 17.9048L7.31172 19.3399C7.64688 19.6751 8.19687 19.6751 8.53203 19.3399L9.97578 17.8962C10.2766 17.5954 10.7578 17.561 11.093 17.8188L12.5625 18.9188C13.1297 19.3399 13.9375 18.936 13.9375 18.2313V3.62195C13.9375 2.67664 14.7109 1.9032 15.6562 1.9032H6.20312H5.34375C2.76562 1.9032 1.90625 3.44148 1.90625 5.3407V6.20007"
        stroke={hover ? "#fff" : "#83BF4F"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4352 11.786H10.4429"
        stroke={hover ? "#fff" : "#83BF4F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.51115 7.48914H5.51887"
        stroke={hover ? "#fff" : "#83BF4F"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default WorkIcon;
