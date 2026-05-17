import express from 'express'
import prisma from '../prismaClient.js'


const router = express.Router()


// Gets Visitor logs
router.get('/visitorlogs', async (req, res) => {
 try {
    const { date } = req.query;

    if (!date) {
      const visitorLogs = await prisma.visitorLog.findMany({
        orderBy: {
          timeIn: "desc",
        },
      });

      return res.json(visitorLogs);
    }

    const startOfDay = new Date(`${date}T00:00:00.000Z`);
    const endOfDay = new Date(startOfDay);

    endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);

    const visitorLogs = await prisma.visitorLog.findMany({
      where: {
        timeIn: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      orderBy: {
        timeIn: "desc",
      },
    });

    res.json(visitorLogs);
  } catch (error) {
    res.status(500).json({
      message: "Could not get visitor logs",
    });
  }})

//Adds Visitor log
router.post('/visitorlogs', async (req, res) => {
  try {
    const { name, organisation, nature, contact, tag } = req.body

    if (!name || !organisation || !nature || !contact || !tag) {
      return res.status(400).json({
        message: 'Please provide all visitor details',
      })
    }

    const visitorLog = await prisma.visitorLog.create({
      data: {
        name,
        organisation,
        nature,
        contact,
        tag,
      },
    })

    res.status(201).json(visitorLog)
  } catch (error) {
    res.status(500).json({
      message: 'Could not create visitor log',
    })
  }

})


//Updates sign in status
router.put('/visitorlogs:id', (req, res) => {

})

export default router

