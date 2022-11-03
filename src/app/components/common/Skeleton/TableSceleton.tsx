import React, { FC } from 'react';

interface ITableSceleton {
  cols?: number,
  rows?: number,
}

const TableSceleton : FC<ITableSceleton> = ({ cols = 3, rows = 3 }) => {
  const width = 1280;

  // const h = (x: number, y: number, w: number, t: number) => <path d={`M${x} ${y} H${w} V${t} H0 L${x} ${y}`} />;
  const h = (x: number, y: number, w: number, t: number) => <rect x={x} y={y} rx="1" ry="1" width={w} height={t} />;

  return (
    <svg width="100%" xmlns="http://www.w3.org/2000/svg" stroke="#d8d8d8">
      {h(0, 0, width, 1)}
      {h(0, 20, width, 1)}
      {h(0, 40, width, 1)}
      {h(0, 60, width, 1)}
      {/* {h(0, 20, width, 2)} */}
      {/* <path d={`M0 0 H${width} V5 H10 L 10 10`} /> */}
      {/* <rect x="8" y="6" rx="4" ry="4" width="35" height="38" />
      <rect x="50" y="6" rx="4" ry="4" width="343" height="38" /> */}
    </svg>
  );
};

export default TableSceleton;
