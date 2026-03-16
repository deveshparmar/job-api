export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options?: {
    retries?: number;
    initialDelayMs?: number;
    maxDelayMs?: number;
  }
): Promise<T> {
  const retries = options?.retries ?? 5;
  const initialDelay = options?.initialDelayMs ?? 500;
  const maxDelay = options?.maxDelayMs ?? 5000;

  let attempt = 0;
  let delay = initialDelay;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;

      if (attempt > retries) {
        throw error;
      }

      console.warn(
        `Retry attempt ${attempt}/${retries} after ${delay}ms`
      );

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );

      delay = Math.min(delay * 2, maxDelay);
    }
  }
}
