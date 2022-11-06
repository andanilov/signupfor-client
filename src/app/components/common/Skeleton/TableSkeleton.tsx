import React, { FC, ReactNode } from 'react';
import Draw from './Draw';
import Table from './Table';

interface ITableSceleton {
  width: number,
  cols?: number,
  rows?: number,
}

const TableSkeleton : FC<ITableSceleton> = ({ width, cols = 3, rows = 3 }) => {
  // const skeleton = new Draw({});
  const table = new Table({
    width,
    rowsCount: rows,
    colsCount: cols,
    color: '#d1d5db',
    rowHeight: 45,
    percentW: 70,
    percentWMin: 30,
    percentH: 35,
    isCols: false,
    border: 6,
  });

  return (<>{table.render()}</>);
};

export default TableSkeleton;
