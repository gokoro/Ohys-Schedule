import { CronJob } from 'cron'
import { createCron as createTorrentCron } from './update-torrents'

export const tasks: CronJob[] = [createTorrentCron()]

export function start(): void {
  tasks.forEach((job) => job.start())
}

export function stop(): void {
  tasks.forEach((job) => job.stop())
}
