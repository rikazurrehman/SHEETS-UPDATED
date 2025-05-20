import React, { memo } from 'react';
import { LucideProps } from 'lucide-react';

const ThreeDCubeSphere: React.FC<LucideProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
      <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" />
      <path d="M3 7l4-2" />
      <path d="M17 3l4 2" />
      <path d="M21 17l-4 2" />
      <path d="M7 21l-4-2" />
    </svg>
  );
};

// Export as memoized component to prevent unnecessary re-renders
export default memo(ThreeDCubeSphere);
