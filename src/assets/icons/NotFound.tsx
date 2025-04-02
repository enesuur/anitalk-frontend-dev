import { SVGProps } from "react";

export function NotFound(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24' {...props}>
      {/* Icon from Iconoir by Luca Burgio - https://github.com/iconoir-icons/iconoir/blob/main/LICENSE */}
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M12 8v4m0 4.01l.01-.011M9 3H4v3m0 5v2m16-2v2M15 3h5v3M9 21H4v-3m11 3h5v-3'
      ></path>
    </svg>
  );
}
