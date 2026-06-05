import express from 'express'
import prisma from '../prismaClient.js'


const router = express.Router();

router.get('/dashboard', async (req, res) => {
try {
    const organisationId = req.organisation.id;

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);

    const [totalVisitors, visitorsToday, inBuilding, signedOut] = await Promise.all([
      prisma.visitorLog.count({
        where: {
          organisationId,
        },
      }),
      prisma.visitorLog.count({
        where: {
          organisationId,
          timeIn: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
      }),
      prisma.visitorLog.count({
        where: {
          organisationId,
          status: 'in-building',
          timeIn: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
      }),
      prisma.visitorLog.count({
        where: {
          organisationId,
          status: 'signed-out',
          timeIn: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
      }),
    ]);

    res.json({
      organisation: req.organisation.username,
      totalVisitors,
      visitorsToday,
      inBuilding,
      signedOut,
      lastSync: new Date(),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Could not get dashboard data',
    });
  }})


export default router
