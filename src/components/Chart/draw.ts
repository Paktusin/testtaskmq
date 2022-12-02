import { ItemData } from "../../types";
import { ChartData, HistogramData } from "./Chart";

const symbolWidth = 12;

export function draw(
  data: ChartData<HistogramData>[],
  canvas: HTMLCanvasElement
) {
  const labelXCount = 5;
  const labelYCount = 5;
  const ctx = canvas.getContext("2d")!;
  const size = canvas.getBoundingClientRect();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const allData = data.reduce(
    (arr, cData) => arr.concat(cData.data),
    [] as HistogramData[]
  );
  if (!allData.length) {
    return;
  }
  const range = getRanges(allData);
  const xLabels = getLabels(range.minX, range.maxX, labelXCount).map((n) =>
    new Date(Math.floor(n)).toDateString()
  );
  const yLabels = getLabels(range.minY, range.maxY, labelYCount).map((n) =>
    n.toFixed(2)
  );
  drawGrid({
    ctx,
    size,
    xLabels,
    yLabels,
  });
}

function getLabels(min: number, max: number, count: number) {
  return [
    min,
    ...Array(count)
      .fill(null)
      .map((_, index) => min + ((index + 1) * (max - min)) / count),
  ];
}

function getRanges(data: HistogramData[]) {
  let maxX = data[0]?.time || 0,
    minX = data[0]?.time || 0,
    maxY = data[0]?.value || 0,
    minY = data[0]?.value || 0;
  for (let item of data) {
    if (item.time > maxX) {
      maxX = item.time;
    }
    if (item.time < minX) {
      minX = item.time;
    }
    if (item.value > maxY) {
      maxY = item.value;
    }
    if (item.value < minY) {
      minY = item.value;
    }
  }
  return { maxX, minX, maxY, minY };
}

interface Size {
  height: number;
  width: number;
}

interface GridProps {
  size: Size;
  ctx: CanvasRenderingContext2D;
  xLabels: string[];
  yLabels: string[];
}

function drawGrid({ ctx, size, xLabels, yLabels }: GridProps) {
  const maxYLabel = Math.max(...yLabels.map((l) => l.length)) * symbolWidth;
  const maxXLabel = Math.max(...xLabels.map((l) => l.length));
  ctx.moveTo(maxYLabel, size.height);
  ctx.lineTo(maxYLabel, 0);
  ctx.stroke();
}
