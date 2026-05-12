import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from "../../generated/prisma/client"
import "dotenv/config"

const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaLibSql({url: connectionString})
export const prisma = new PrismaClient({adapter})