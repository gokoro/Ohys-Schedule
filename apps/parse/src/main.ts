import * as job from './jobs'

async function entry(): Promise<void> {
  job.start()
}

entry()
