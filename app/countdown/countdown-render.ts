import { TimeRange } from './time-range';

export interface OnRenderEvent {
  timeRange: TimeRange;
  time?: number;
}

export interface Render {
  render(d: OnRenderEvent): void;
}
