/* eslint-disable @typescript-eslint/no-explicit-any */
export const REQUIRED_VALIDATION = (label:any) => {
    return `${label} is required!`;
  };
  

  export const LENGTH_VALIDATION = (label:any) => {
    return `${label} is required!`;
  };
  

  export const EMAIL_VALIDATION =
/^\s*[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\s*$/;
