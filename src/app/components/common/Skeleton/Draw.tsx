import React, { ReactNode } from 'react';
import css from './Skeleton.module.scss';

interface ILine { (x1: number, y1: number, length: number, t: number) : ReactNode }
interface IGetRnd { (min: number, max: number) : number }
interface IAreaContentInit {
  x: number,
  y: number,
  w: number,
  h: number,
  percentW?: number,
  percentH?: number,
  border?: number,
  percentWMin?: number,
}
interface IAreaContent { (argv: IAreaContentInit) : ReactNode }
interface IDraw {
  color: string,
  width: number,
  lineH: ILine,
  lineW: ILine,
  areaContent: IAreaContent,
  getRnd: IGetRnd,
  renderSvg: (drawing: ReactNode, height: number) => ReactNode,
}
interface IDrawInit {
  color?: string,
  width?: number,
}

export default class Draw implements IDraw {
  color = '#d1d5db';
  width = 1280;

  constructor({ color, width } : IDrawInit) {
    color && (this.color = color);
    width && (this.width = width);
  }

  // lineH: ILine = (x: number, y: number, length: number, t: number) => <rect x={x} y={y} width={length} height={t} fill={this.color} />;
  lineH: ILine = (x: number, y: number, length: number, t: number) => <path d={`M${x} ${y} H ${length}`} style={{ strokeWidth: t }} key={Math.random()} />;
  lineW: ILine = (x: number, y: number, length: number, t: number) => <path d={`M${x} ${y} V ${length}`} style={{ strokeWidth: t }} key={Math.random()} />;

  areaContent: IAreaContent = ({
    x, y, w, h, percentW = 80, percentH = 60, border = 10, percentWMin = 20,
  }) => {
    const H = h * (percentH / 100);
    const W = percentWMin ? w * (this.getRnd(percentWMin, percentW) / 100) : w * (percentW / 100);
    const [paddingW, paddingH] = [(w - W) / 2, (h - H) / 2];
    const [X, Y] = [x + paddingW, y + paddingH];
    return <rect x={X} y={Y} rx={border} ry={border} width={W} height={H} fill={this.color} key={Math.random()} />;
  };

  renderSvg = (drawing: ReactNode, height: number) : ReactNode => (
    <svg
      width={this.width}
      height={height + 10}
      xmlns="http://www.w3.org/2000/svg"
      stroke={this.color}
      style={{
        margin: '0 auto',
        display: 'flex',
      }}
      className={css.skeleton}
    >
      {drawing}
    </svg>
  );

  getRnd: IGetRnd = (min: number, max: number) => (Math.floor(Math.random() * (max - min + 1) + min));
}
