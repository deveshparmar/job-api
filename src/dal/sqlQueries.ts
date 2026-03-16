export const JOB_QUERIES = {
    ADD_JOB_DEFINITION: `INSERT INTO job_definitions (name, cron_expression, job_type, default_payload, created_at, updated_at) 
    VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *`,
    GET_ALL_JOB_DEFINITIONS: `SELECT * from job_definitions`,
    GET_JOB_DEFINITION: `SELECT * from job_definitions WHERE id = $1`,
    UPDATE_JOB_DEFINITION: `UPDATE job_definitions SET name = $1, cron_expression = $2, job_type = $3, default_payload = $4, updated_at = NOW() WHERE id = $5 RETURNING *`,
    DELETE_JOB_DEFINITION: `DELETE from job_definitions WHERE id = $1 RETURNING *`,

    ADD_JOB_INSTANCE: `INSERT INTO job_instances (
  job_def_id,
  idempotency_key,
  status,
  retry_count,
  max_retries,
  payload,
  next_run_time
)
VALUES ($1,$2,$3,$4,$5,$6,$7)
RETURNING *;`,
    GET_ALL_JOB_INSTANCES: `SELECT * from job_instances`,
    GET_JOB_INSTANCE: `SELECT * from job_instances WHERE id = $1`,
    UPDATE_JOB_INSTANCE: `UPDATE job_instances SET job_def_id = $1, idempotency_key = $2, status = $3, retry_count = $4, max_retries = $5, payload = $6, next_run_time = $7, locked_at = $8, locked_by = $9, last_heartbeat = $10, updated_at = NOW() WHERE id = $11 RETURNING *`,
    DELETE_JOB_INSTANCE: `DELETE from job_instances WHERE id = $1 RETURNING *`,

    ADD_JOB_EXECUTION: `INSERT INTO job_executions (job_instance_id, attempt_number, status, worker_id, started_at, ended_at, error_message, execution_time_ms, created_at) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *`,
    GET_ALL_JOB_EXECUTIONS: `SELECT * from job_executions`,
    GET_JOB_EXECUTION: `SELECT * from job_executions WHERE id = $1`,
    UPDATE_JOB_EXECUTION: `UPDATE job_executions SET job_instance_id = $1, attempt_number = $2, status = $3, worker_id = $4, started_at = $5, ended_at = $6, error_message = $7, execution_time_ms = $8, updated_at = NOW() WHERE id = $9 RETURNING *`,
    DELETE_JOB_EXECUTION: `DELETE from job_executions WHERE id = $1 RETURNING *`,
    ADD_JOB_OUTBOX_EVENT: `INSERT INTO outbox_events (aggregate_type, aggregate_id, event_type, payload, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
    GET_JOB_OUTBOX_EVENT: ` SELECT *
      FROM outbox_events
      WHERE status = 'PENDING'
      ORDER BY created_at
      FOR UPDATE SKIP LOCKED
      LIMIT 10`,
    UPDATE_JOB_OUTBOX_EVENT: `UPDATE outbox_events SET status = 'PUBLISHED', published_at = NOW() WHERE id = $1 RETURNING *`,
}