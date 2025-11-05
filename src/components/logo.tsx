export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Medibridge Logo"
    >
      <path
        d="M4.774,12.771C2.968,11.33,2,9.261,2,7.5C2,4.462,4.462,2,7.5,2c2.1,0,3.933,1.108,4.918,2.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.226,11.229c1.806,1.441,2.774,3.51,2.774,5.271c0,3.038-2.462,5.5-5.5,5.5c-2.1,0-3.933-1.108-4.918-2.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8,12h2l1.5,3,3-6,1.5,3h2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
