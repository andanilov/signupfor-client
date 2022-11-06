import React, { ReactNode } from 'react';
import Draw from './Draw';

// Types
interface IDrawRow { (x: number, y: number, isCols?: boolean, isGrid?: boolean) : ReactNode }
interface ITable {
  rowHeight: number,
  colsCount: number,
  rowsCount: number,
  percentW: number,
  percentH: number,
  drawRow: IDrawRow,
  drawRows: IDrawRow,
}
interface ITableInit {
  width?: number,
  rowHeight?: number,
  colsCount?: number,
  rowsCount?: number,
  thickness?: number,
  color?: string,
  percentW?: number,
  percentH?: number,
  border?: number,
  percentWMin?: number,
  isCols?: boolean,
}

export default class Table extends Draw implements ITable {
  rowHeight = 100;
  colsCount = 5;
  rowsCount = 5;
  thickness = 1;
  percentW = 80; // Content width size in cell by percent
  percentH = 45; // Content height size in cell by percent
  border = 10; // Content border radius
  percentWMin = 0; // (If no 0) Content width compute by random from percentWMin to percentW
  isCols = true;

  constructor(props : ITableInit) {
    super({ width: props?.width, color: props?.color });
    props?.rowHeight && (this.rowHeight = props.rowHeight);
    props?.colsCount && (this.colsCount = props.colsCount);
    props?.rowsCount && (this.rowsCount = props.rowsCount);
    props?.thickness && (this.thickness = props.thickness);
    props?.percentW && (this.percentW = props.percentW);
    props?.percentH && (this.percentH = props.percentH);
    props?.border && (this.border = props.border);
    props?.percentWMin && (this.percentWMin = props.percentWMin);
    props?.isCols !== undefined && (this.isCols = props.isCols);
    this.width -= this.thickness * 2;
  }

  drawRow : IDrawRow = (x, y, isCols = true, isGrid = true) => (
    <React.Fragment key={Math.random()}>
      {isGrid && this.lineH(0, y, this.width, this.thickness)}
      {isGrid && this.lineH(0, y + this.rowHeight, this.width, this.thickness)}
      {[...Array(this.colsCount)].map((el, i) => this.areaContent({
        x: i * (this.width / this.colsCount),
        y,
        w: this.width / this.colsCount,
        h: this.rowHeight,
        percentW: this.percentW,
        percentH: this.percentH,
        percentWMin: this.percentWMin,
        border: this.border,
      }))}
      {isCols && this.colsCount > 1 && [...Array(this.colsCount + 1)].map((el, i) => this.lineW(i * (this.width / this.colsCount), y, this.rowHeight, this.thickness))}
    </React.Fragment>
  );

  drawRows : IDrawRow = (x, y) => (
    <>
      {this.drawRow(x, y, false, false)}
      {[...Array(this.rowsCount)].map((el, i) => this.drawRow(x, y + ((i + 1) * this.rowHeight), this.isCols))}
    </>
  );

  render = () => this.renderSvg(this.drawRows(0, 0), this.rowHeight * this.colsCount);
}
