import { ChartData, HistogramData } from "./Histrogram/Histogram";
import { RangeProps, useRanges } from "./useRanges";

export function draw(
  data: ChartData<HistogramData>[],
  canvas: HTMLCanvasElement,
  range: RangeProps
) {
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  for (let charData of data) {
    const { data: items, color } = charData;
    if (!items.length) {
      continue;
    }
    const w = Math.floor(canvas.width / items.length);
    const barWidth = w > 2 ? w : 2;
    const everyElement = Math.ceil((items.length * barWidth) / canvas.width);
    const rangeY = range.maxY - range.minY;
    const scaleValue = rangeY / canvas.height;
    for (let i = 0; i < items.length; i += everyElement) {
      ctx.rect(
        (i / everyElement) * barWidth,
        rangeY / 2 / scaleValue,
        barWidth,
        items[i].value / scaleValue
      );
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}
