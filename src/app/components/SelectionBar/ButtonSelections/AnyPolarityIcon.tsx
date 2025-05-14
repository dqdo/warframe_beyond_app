import React from 'react';

type AnyPolarityIconProps = {
  className?: string;
};

const AnyPolarityIcon = ({ className = '' }: AnyPolarityIconProps) => (
  <svg
    className={`fill-current ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 52 52"
  >
    <g>
      <path
        d="M33.9,14.8c5.4,6.2,2.6,29.5-24.8,36C35.8,55,49.6,36.6,47.4,22.2C45.7,18.4,37.9,14.8,33.9,14.8z"
      />
      <path
        d="M18.2,37.3c-5.4-6.2-2.6-29.5,24.8-36C16.3-2.9,2.5,15.5,4.7,29.9C6.4,33.7,14.2,37.3,18.2,37.3z"
      />
    </g>
  </svg>
);

export default AnyPolarityIcon;
