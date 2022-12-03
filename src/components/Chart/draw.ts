import { ChartData, HistogramData } from "./Histrogram/Histogram";
import { RangeProps } from "./useRanges";

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
    const minBarWidth = 1;
    const possibleBarWidth = Math.ceil(canvas.width / items.length);
    const barWidth =
      possibleBarWidth > minBarWidth ? possibleBarWidth : minBarWidth;
    const xScale = (items.length * barWidth) / canvas.width;
    const rangeY = range.maxY - range.minY;
    const scaleValue = rangeY / canvas.height;
    console.table({
      everyElement: xScale,
      height: canvas.height,
      lengh: items.length,
      barWidth,
    });
    for (let i = 0; i < Math.floor(items.length * xScale); i++) {
      const lastIndex = Math.floor(i * xScale);
      const item = items[lastIndex];
      if (!item) {
        continue;
      }
      ctx.rect(
        i * barWidth,
        canvas.height -
          (rangeY - Math.max(Math.abs(range.maxY), Math.abs(range.minY))) /
            scaleValue,
        barWidth,
        item.value / -scaleValue
      );
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}
