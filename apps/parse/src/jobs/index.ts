import { createCron as createTorrentCron } from './update-torrents'
import { CronJob } from 'cron'

export const tasks: CronJob[] = [createTorrentCron()]

export function start(): void {
  tasks.forEach((job) => job.start())
}

export function stop(): void {
  tasks.forEach((job) => job.stop())
}
