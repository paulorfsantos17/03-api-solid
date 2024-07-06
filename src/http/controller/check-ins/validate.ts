import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validation-ckeck-in-use-case'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = createCheckInParamsSchema.parse(request.params)

  const validateCheckInUseCase = makeValidateCheckInUseCase()
  await validateCheckInUseCase.execute({
    checkInId,
  })

  return reply.status(204).send()
}
