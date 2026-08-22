import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  NATS_URL: z.string().default("nats://localhost:4222"),
  DATABASE_URL: z.string().optional(),
});
export type AppConfig = z.infer<typeof envSchema>;

export function loadEnv(env: NodeJS.ProcessEnv = process.env): AppConfig {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    console.error("Invalid environment variables:");

    console.error(result.error.flatten().fieldErrors);

    throw new Error("Invalid environment configuration");
  }
  return result.data;
}
