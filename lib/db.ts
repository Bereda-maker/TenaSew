import {Pool, type QueryResultRow} from 'pg';
let pool: Pool | undefined;
export function getPool(){if(!process.env.DATABASE_URL) return null;if(!pool) pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.NODE_ENV==='production'?{rejectUnauthorized:false}:undefined,max:5,idleTimeoutMillis:30000,connectionTimeoutMillis:5000});return pool;}
export async function query<T extends QueryResultRow=QueryResultRow>(text:string, values:unknown[]=[]){const db=getPool();if(!db) throw new Error('DATABASE_NOT_CONFIGURED');return db.query<T>(text,values);}
