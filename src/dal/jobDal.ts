import type { PoolClient } from "pg";
import { JOB_QUERIES } from "./sqlQueries.js";
import type { IJobInstance, ICreateJobInstance } from "../types/jobInstances.js";
import type { IJobDefination, ICreateJobDefination, IUpdateJobDefination } from "../types/jobDefinations.js";
import type { IJobExecution } from "../types/jobExecution.js";

export class JobDal {

    // async getAllPoems(limit: number, offset: number, client: PoolClient): Promise<{ poems: IPoem[], total: number }> {
    // try {
    //     const query = POEM_QUERIES.GET_ALL;
    //     const values = [limit, offset];
    //     const result = await client.query(query, values);

    //     const total = result.rows.length > 0 ? parseInt(result.rows[0].total_count) : 0;

    //     return {
    //         poems: result.rows as IPoem[],
    //         total
    //     };
    // } catch (error: any) {
    //     throw new Error(`Database error occurred - ${error.message}`);
    // }

    async addJobDefination(data: ICreateJobDefination, client: PoolClient): Promise<IJobDefination> {
        try {
            const query = JOB_QUERIES.ADD_JOB_DEFINITION;
            const values = [data.name, data.cron_expression, data.job_type, data.default_payload];
            const result = await client.query(query, values);
            return result.rows[0] as IJobDefination;
        } catch (error: any) {
            console.log(error);
            throw new Error("Database error occured - ", error);
        }
    }

    async getJobDefination(id: string, client: PoolClient): Promise<IJobDefination> {
        try {
            const query = JOB_QUERIES.GET_JOB_DEFINITION;
            const values = [id];
            const result = await client.query(query, values);
            return result.rows[0] as IJobDefination;
        } catch (error: any) {
            throw new Error("Database error occured - ", error);
        }
    }

    async getAllJobDefinations(client: PoolClient): Promise<IJobDefination[]> {
        try {
            const query = JOB_QUERIES.GET_ALL_JOB_DEFINITIONS;
            const result = await client.query(query);
            return result.rows as IJobDefination[];
        } catch (error: any) {
            throw new Error("Database error occured - ", error);
        }
    }

    async updateJobDefination(data: IUpdateJobDefination, client: PoolClient): Promise<IJobDefination> {
        try {
            const query = JOB_QUERIES.UPDATE_JOB_DEFINITION;
            const values = [data.name, data.cron_expression, data.job_type, data.default_payload, data.id];
            const result = await client.query(query, values);
            return result.rows[0] as IJobDefination;
        } catch (error: any) {
            throw new Error("Database error occured - ", error);
        }
    }

    async deleteJobDefination(id: string, client: PoolClient): Promise<IJobDefination> {
        try {
            const query = JOB_QUERIES.DELETE_JOB_DEFINITION;
            const values = [id];
            const result = await client.query(query, values);
            return result.rows[0] as IJobDefination;
        } catch (error: any) {
            throw new Error("Database error occured - ", error);
        }
    }

   async addJobInstance(
  data: ICreateJobInstance,
  client: PoolClient
): Promise<IJobInstance> {

  try {

    const query = JOB_QUERIES.ADD_JOB_INSTANCE;

    const values = [
      data.job_def_id,
      data.idempotency_key,
      "PENDING",
      0,
      data.max_retries ?? 3,
      data.payload ?? {},
      data.next_run_time ?? new Date()
    ];

    const result = await client.query(query, values);

    return result.rows[0] as IJobInstance;

  } catch (error: any) {

    throw new Error(`Database error occurred: ${error.message}`);

  }
}

    async getJobInstance(id: string, client: PoolClient): Promise<IJobInstance> {
        try {
            const query = JOB_QUERIES.GET_JOB_INSTANCE;
            const values = [id];
            const result = await client.query(query, values);
            return result.rows[0] as IJobInstance;
        } catch (error: any) {
            throw new Error("Database error occured - ", error);
        }
    }

    async getAllJobInstances(client: PoolClient): Promise<IJobInstance[]> {
        try {
            const query = JOB_QUERIES.GET_ALL_JOB_INSTANCES;
            const result = await client.query(query);
            return result.rows as IJobInstance[];
        } catch (error: any) {
            throw new Error("Database error occured - ", error);
        }
    }

    async updateJobInstance(data: IJobInstance, client: PoolClient): Promise<IJobInstance> {
        try {
            const query = JOB_QUERIES.UPDATE_JOB_INSTANCE;
            const values = [data.job_def_id, data.idempotency_key, data.status, data.retry_count, data.max_retries, data.payload, data.next_run_time, data.locked_at, data.locked_by, data.last_heartbeat, data.id];
            const result = await client.query(query, values);
            return result.rows[0] as IJobInstance;
        } catch (error: any) {
            throw new Error("Database error occured - ", error);
        }
    }

    async deleteJobInstance(id: string, client: PoolClient): Promise<IJobInstance> {
        try {
            const query = JOB_QUERIES.DELETE_JOB_INSTANCE;
            const values = [id];
            const result = await client.query(query, values);
            return result.rows[0] as IJobInstance;
        } catch (error: any) {
            throw new Error("Database error occured - ", error);
        }
    }

    async addJobExecution(data: IJobExecution, client: PoolClient): Promise<IJobExecution> {
        try {
            const query = JOB_QUERIES.ADD_JOB_EXECUTION;
            const values = [data.job_instance_id, data.attempt_number, data.status, data.worker_id, data.started_at, data.ended_at, data.error_message, data.execution_time_ms];
            const result = await client.query(query, values);
            return result.rows[0] as IJobExecution;
        } catch (error: any) {
            throw new Error("Database error occured - ", error);
        }
    }

    async getJobExecution(id: string, client: PoolClient): Promise<IJobExecution> {
        try {
            const query = JOB_QUERIES.GET_JOB_EXECUTION;
            const values = [id];
            const result = await client.query(query, values);
            return result.rows[0] as IJobExecution;
        } catch (error: any) {
            throw new Error("Database error occured - ", error);
        }
    }

    async getAllJobExecutions(client: PoolClient): Promise<IJobExecution[]> {
        try {
            const query = JOB_QUERIES.GET_ALL_JOB_EXECUTIONS;
            const result = await client.query(query);
            return result.rows as IJobExecution[];
        } catch (error: any) {
            throw new Error("Database error occured - ", error);
        }
    }

    async updateJobExecution(id: string, data: IJobExecution, client: PoolClient): Promise<IJobExecution> {
        try {
            const query = JOB_QUERIES.UPDATE_JOB_EXECUTION;
            const values = [data.job_instance_id, data.attempt_number, data.status, data.worker_id, data.started_at, data.ended_at, data.error_message, data.execution_time_ms, id];
            const result = await client.query(query, values);
            return result.rows[0] as IJobExecution;
        } catch (error: any) {
            throw new Error("Database error occured - ", error);
        }
    }

    async deleteJobExecution(id: string, client: PoolClient): Promise<IJobExecution> {
        try {
            const query = JOB_QUERIES.DELETE_JOB_EXECUTION;
            const values = [id];
            const result = await client.query(query, values);
            return result.rows[0] as IJobExecution;
        } catch (error: any) {
            throw new Error("Database error occured - ", error);
        }
    }

    async addJobOutboxEvent(job_id: string, client: PoolClient): Promise<IJobInstance> {

        try {
            const query = JOB_QUERIES.ADD_JOB_OUTBOX_EVENT;
            const values = ['JOB_INSTANCE', job_id, 'JOB_CREATED', JSON.stringify({job_id})];
            const result = await client.query(query, values);
            return result.rows[0];
        } catch (error: any) {
            console.log(error);
            throw new Error("Database error occured - ", error);
        }
    }


}