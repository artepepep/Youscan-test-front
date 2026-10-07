import { Sector, type PieSectorShapeProps } from "recharts";

import { getPieSliceColor } from "./pie-chart-colors";

export function CustomSector(props: PieSectorShapeProps, index: number) {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    cornerRadius,
  } = props;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      cornerRadius={cornerRadius}
      fill={getPieSliceColor(index)}
    />
  );
}
