import { z } from 'zod';

/** Resposta de `GET /api/health` (specs/apps/crm/contracts/auth.md). */
export const healthResponseSchema = z.object({
  ok: z.literal(true),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
