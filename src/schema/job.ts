import Joi from "joi";

export const jobDefinitionSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.min": "Job name must be at least 3 characters long",
    }),

  job_type: Joi.string()
    .min(3)
    .required(),

  cron_expression: Joi.string()
    .allow(null)
    .default(null),

  default_payload: Joi.object()
    .pattern(Joi.string(), Joi.any())
    .default({}),

  max_retries: Joi.number()
    .integer()
    .min(0)
    .max(10)
    .default(3),

  timeout_seconds: Joi.number()
    .integer()
    .min(1)
    .max(3600)
    .default(60),
});

export const jobInstanceSchema = Joi.object({

  job_def_id: Joi.string()
    .uuid()
    .required(),

  idempotency_key: Joi.string()
    .min(3)
    .required()
    .messages({
      "string.min": "Idempotency key must be at least 3 characters long",
    }),

  payload: Joi.object()
    .pattern(Joi.string(), Joi.any())
    .default({}),

 next_run_time: Joi.date()
  .iso()
  .default(() => new Date().toISOString()),

  max_retries: Joi.number()
    .integer()
    .min(0)
    .max(10)
    .optional(),
});


