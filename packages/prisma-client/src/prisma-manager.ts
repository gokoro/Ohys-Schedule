import { PrismaClient } from '../.generated/client'

export class PrismaManager {
  private static Instance: PrismaClient
  constructor() {}

  static getInstance(createPrismaClient: () => PrismaClient) {
    PrismaManager.Instance = createPrismaClient()

    return PrismaManager.Instance
  }
}
