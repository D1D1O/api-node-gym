import 'dotenv/config'
import { randomUUID } from "node:crypto";
import { Environment } from "vitest";
import { execSync } from 'node:child_process';
import { PrismaClient } from '@prisma/client';


function generateDataBaseURL(schema: string) {
  if(!process.env.DATABASE_URL){
    throw new Error('DATABASE_URL is not set')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()

}
const prisma = new PrismaClient()

export default<Environment>{
  name:'prisma',
  transformMode:"web",
  async setup(){
    console.log('setup')

    const schema = randomUUID();

    console.log(generateDataBaseURL(schema));

    process.env.DATABASE_URL = generateDataBaseURL(schema);

    execSync(`npx prisma migrate deploy`)

    return {
      async teardown(){
        console.log('teardown')
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
        await prisma.$disconnect()
      },
    }

  },
}