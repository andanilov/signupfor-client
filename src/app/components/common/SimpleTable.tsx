import React, { FC, ReactNode, useCallback } from 'react';

export interface ISimpleTableHead {
  title: string,
  sort?: boolean,
  sortToggle?: () => {}
}
export interface ISimpleTable {
  body: string[][] | number[][] | ReactNode[][],
  head?: ISimpleTableHead[],
  className?: string
}

const SimpleTable : FC<ISimpleTable> = ({ body, head = [], className = '' }) => (
  <table className={`${className || ''} table`}>
    {head.length && (
      <thead>
        <tr>
          {head.map(({ title, sort, sortToggle = () => {} }) => (
            <th
              onClick={sortToggle}
              className={`${['DESC', 'ASC']?.[Number(sort)] ?? ''} table__th`}
              key={Math.random()}
            >
              {title}
            </th>
          ))}
        </tr>
      </thead>
    )}
    {body.length && (
      <tbody>
        {body.length && body.map((row) => row.length
          && (
          <tr key={Math.random()}>
            {row.map((col) => <td key={Math.random()} className="table__td">{col}</td>)}
          </tr>
          ))}
      </tbody>
    )}
  </table>
);

export default SimpleTable;
