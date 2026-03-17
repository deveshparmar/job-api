# Distributed Job Scheduler — Job API

This service is the **entry point of the Distributed Job Scheduler system**.
It is responsible for:

* Creating job definitions
* Scheduling job instances
* Publishing jobs to Kafka
* Ensuring idempotent job creation
* Applying rate limiting
* Persisting jobs into PostgreSQL

The API acts as the **producer layer** in the system.

---

# 🧠 System Overview

This project demonstrates how modern distributed job schedulers work internally (similar to systems used by companies like Uber, Airbnb, and Netflix).

Architecture:

Client → Job API → PostgreSQL → Kafka → Worker Nodes

---

# ⚙️ Tech Stack

Node.js
TypeScript
Express.js
PostgreSQL
Kafka
Redis (Rate Limiting)
Prometheus (Metrics)
Docker

---

# 🏗 High Level Architecture

The Job API is responsible for **reliably accepting jobs and publishing them to Kafka**.

Flow:

1. Client creates job definition
2. Client schedules job instance
3. API stores job in PostgreSQL
4. API publishes job event to Kafka
5. Workers consume the job

This architecture ensures:

* Decoupled workers
* Horizontal scaling
* Reliable retry mechanisms

---

# 🔁 Idempotency Support

Jobs include an **idempotency key**.

This prevents duplicate jobs when:

* API retries happen
* client retries requests
* network failures occur

Unique constraint:

(job_def_id, idempotency_key)

---

# ⚡ Rate Limiting

Rate limiting is implemented using Redis.

This protects the API from:

* abuse
* job floods
* accidental high load

---

# 📊 Observability

Metrics are exposed for Prometheus.

Example metrics:

jobs_created_total
jobs_failed_total
api_request_duration_seconds

---

# 🐳 Running Locally

Start infrastructure:

docker-compose up -d

Services started:

PostgreSQL
Kafka
Redis
Prometheus
Grafana

---

# ▶ Run API

npm install
npm run dev

Server runs on:

http://localhost:8000

---

# 🧪 Load Testing

Run the load test script:

node test-load.js

This submits 100+ jobs to test the system.

---

# 🔐 Reliability Guarantees

The system guarantees:

* Idempotent job creation
* Reliable event publishing
* Safe retries
* Horizontal scaling

---

# 👨‍💻 Author

Built as a distributed systems project demonstrating production-grade backend architecture.
