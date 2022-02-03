export interface PollTimer {
  pollCount: number;
  interval: NodeJS.Timeout | null;
}
