const ChevronUp = ({
  width = 24,
  height = 24,
  stroke = "#f9f8f6",
  style = {},
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    stroke={stroke}
    fill="none"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
    role="img"
    aria-label="Chevron Up Icon"
  >
    <path d="M6 15L12 9L18 15" />
  </svg>
);

export default ChevronUp;
