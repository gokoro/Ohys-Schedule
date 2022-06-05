import { PrismaClient, PrismaManager } from '@ohys/prisma-client'

export function getPrismaClient(): PrismaClient {
  const prismaClient = PrismaManager.getInstance(() => {
    return new PrismaClient()
  })

  return prismaClient
}

export const prisma = getPrismaClient()
