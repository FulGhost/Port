import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// Gets Visitor logs
router.get("/visitorlogs", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      const visitorLogs = await prisma.visitorLog.findMany({
        orderBy: {
          timeIn: "desc",
        },
        select: {
          id: true,
          name: true,
          organisation: true,
          nature: true,
          contact: true,
          tag: true,
          timeIn: true,
          timeOut: true,
          status: true,
        },
      });

      return res.json(visitorLogs);
    }

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(startOfDay);

    endOfDay.setDate(endOfDay.getDate() + 1);

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
      select: {
        id: true,
        name: true,
        organisation: true,
        nature: true,
        contact: true,
        tag: true,
        timeIn: true,
        timeOut: true,
        status: true,
      },
    });

    res.json(visitorLogs);
  } catch (error) {
    res.status(500).json({
      message: "Could not get visitor logs",
    });
  }
});

//Adds Visitor log
router.post("/visitorlogs", async (req, res) => {
  try {
    const { name, organisation, nature, contact, tag } = req.body;

    if (!name || !organisation || !nature || !contact || !tag) {
      return res.status(400).json({
        message: "Please provide all visitor details",
      });
    }

    const visitorLog = await prisma.visitorLog.create({
      data: {
        name,
        organisation,
        nature,
        contact,
        tag,
      },
    });

    res.status(201).json(visitorLog);
  } catch (error) {
    res.status(500).json({
      message: "Could not create visitor log",
    });
  }
});

//Updates sign in status
router.put("/visitorlogs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedVisitorLog = await prisma.visitorLog.update({
      where: {
        id: id,
      },
      data: {
        status: "signed-out",
        timeOut: new Date(),
      },
      select: {
        id: true,
        name: true,
        organisation: true,
        nature: true,
        contact: true,
        tag: true,
        timeIn: true,
        timeOut: true,
        status: true,
      },
    });

    res.json(updatedVisitorLog);
  } catch (error) {
    res.status(500).json({
      message: "Could not sign visitor out",
    });
  }
});

// Deletes Visitor log
router.delete("/visitorlogs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.visitorLog.delete({
      where: {
        id: id,
      },
    });

    res.json({
      message: "Visitor log deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Could not delete visitor log",
    });
  }
});

export default router;
