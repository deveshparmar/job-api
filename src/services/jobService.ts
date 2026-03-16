import { JobDal } from "../dal/jobDal.js";
import pool from "../db/client.js";
import { publishJob } from "../kafka/client.js";
import type { IJobDefination, ICreateJobDefination, IUpdateJobDefination } from "../types/jobDefinations.js";
import type { IJobExecution } from "../types/jobExecution.js";
import type { IJobInstance, ICreateJobInstance } from "../types/jobInstances.js";
import { retryWithBackoff } from "../utils/retry.js";

export class JobService {
    async addJobDefination(data: ICreateJobDefination): Promise<IJobDefination> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const dal = new JobDal();
            const result = await dal.addJobDefination(data, client);
            await client.query("COMMIT");
            return result;
        } catch (error: any) {
            await client.query("ROLLBACK");
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async getJobDefination(id: string): Promise<IJobDefination> {
        const client = await pool.connect();
        try {
            const dal = new JobDal();
            const result = await dal.getJobDefination(id, client);
            return result;
        } catch (error: any) {
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async getAllJobDefinations(): Promise<IJobDefination[]> {
        const client = await pool.connect();
        try {
            const dal = new JobDal();
            const result = await dal.getAllJobDefinations(client);
            return result;
        } catch (error: any) {
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async updateJobDefination(data: IUpdateJobDefination): Promise<IJobDefination> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const dal = new JobDal();
            const result = await dal.updateJobDefination(data, client);
            await client.query("COMMIT");
            return result;
        } catch (error: any) {
            await client.query("ROLLBACK");
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async deleteJobDefination(id: string): Promise<IJobDefination> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const dal = new JobDal();
            const result = await dal.deleteJobDefination(id, client);
            await client.query("COMMIT");
            return result;
        } catch (error: any) {
            await client.query("ROLLBACK");
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async addJobInstance(data: ICreateJobInstance): Promise<IJobInstance> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const dal = new JobDal();
            const result = await dal.addJobInstance(data, client);
            retryWithBackoff(()=>publishJob(result.id),{retries:3,initialDelayMs:500,maxDelayMs:5000})
            await client.query("COMMIT");
            return result;
        } catch (error: any) {
            await client.query("ROLLBACK");
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async getJobInstance(id: string): Promise<IJobInstance> {
        const client = await pool.connect();
        try {
            const dal = new JobDal();
            const result = await dal.getJobInstance(id, client);
            return result;
        } catch (error: any) {
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async getAllJobInstances(): Promise<IJobInstance[]> {
        const client = await pool.connect();
        try {
            const dal = new JobDal();
            const result = await dal.getAllJobInstances(client);
            return result;
        } catch (error: any) {
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async updateJobInstance(data: IJobInstance): Promise<IJobInstance> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const dal = new JobDal();
            const result = await dal.updateJobInstance(data, client);
            await client.query("COMMIT");
            return result;
        } catch (error: any) {
            await client.query("ROLLBACK");
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async deleteJobInstance(id: string): Promise<IJobInstance> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const dal = new JobDal();
            const result = await dal.deleteJobInstance(id, client);
            await client.query("COMMIT");
            return result;
        } catch (error: any) {
            await client.query("ROLLBACK");
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async addJobExecution(data: IJobExecution): Promise<IJobExecution> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const dal = new JobDal();
            const result = await dal.addJobExecution(data, client);
            await client.query("COMMIT");
            return result;
        } catch (error: any) {
            await client.query("ROLLBACK");
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async getJobExecution(id: string): Promise<IJobExecution> {
        const client = await pool.connect();
        try {
            const dal = new JobDal();
            const result = await dal.getJobExecution(id, client);
            return result;
        } catch (error: any) {
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async getAllJobExecutions(): Promise<IJobExecution[]> {
        const client = await pool.connect();
        try {
            const dal = new JobDal();
            const result = await dal.getAllJobExecutions(client);
            return result;
        } catch (error: any) {
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async updateJobExecution(id: string, data: IJobExecution): Promise<IJobExecution> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const dal = new JobDal();
            const result = await dal.updateJobExecution(id, data, client);
            await client.query("COMMIT");
            return result;
        } catch (error: any) {
            await client.query("ROLLBACK");
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }

    async deleteJobExecution(id: string): Promise<IJobExecution> {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            const dal = new JobDal();
            const result = await dal.deleteJobExecution(id, client);
            await client.query("COMMIT");
            return result;
        } catch (error: any) {
            await client.query("ROLLBACK");
            throw new Error("Database error occured - " + error.message);
        } finally {
            client.release();
        }
    }
}