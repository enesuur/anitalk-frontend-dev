'use client';
import React from 'react';
import ReactCountryFlag, { type ReactCountryFlagProps } from 'react-country-flag';

export interface FlagIconProps extends Omit<ReactCountryFlagProps, 'countryCode'> {
  country_code: string;
  size?: number;
  label?: string;
}

const CountryFlag: React.FC<FlagIconProps> = ({ country_code, size = 24, label, ...rest }) => {
  const code = /^[A-Z]{2}$/.test(country_code.toUpperCase()) ? country_code.toUpperCase() : 'TR';

  return (
    <ReactCountryFlag
      countryCode={code}
      svg
      title={label || code}
      aria-label={label || code}
      style={{ width: size, height: size, lineHeight: 1 }}
      {...rest}
    />
  );
};

export default React.memo(CountryFlag);
