import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { locationValidationSchema } from 'validationSchema/locations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.location
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getLocationById();
    case 'PUT':
      return updateLocationById();
    case 'DELETE':
      return deleteLocationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getLocationById() {
    const data = await prisma.location.findFirst(convertQueryToPrismaUtil(req.query, 'location'));
    return res.status(200).json(data);
  }

  async function updateLocationById() {
    await locationValidationSchema.validate(req.body);
    const data = await prisma.location.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteLocationById() {
    const data = await prisma.location.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
