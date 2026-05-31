import express from "express";
import prisma from "../prismaClient.js";

const router = express.Router();

// Gets Visitor logs
router.get("/visitorlogs", async (req, res) => {
  try {
    const { date } = req.query;
    const organisationId = req.organisation.id;

    if (!date) {
      const visitorLogs = await prisma.visitorLog.findMany({
        where: {
          organisationId,
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

      return res.json(visitorLogs);
    }

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(startOfDay);

    endOfDay.setDate(endOfDay.getDate() + 1);

    const visitorLogs = await prisma.visitorLog.findMany({
      where: {
        organisationId,
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
    const organisationId = req.organisation.id;

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
        organisationId,
      },
    });

    res.status(201).json(visitorLog);
  } catch (error) {
    console.error("POST /visitorlogs error:", error);
    res.status(500).json({
      message: "Could not create visitor log",
    });
  }
});

//Updates sign in status
router.put("/visitorlogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const organisationId = req.organisation.id;

    const updatedVisitorLog = await prisma.visitorLog.updateMany({
      where: {
        id,
        organisationId,
      },
      data: {
        status: "signed-out",
        timeOut: new Date(),
      },
    });

    if (updatedVisitorLog.count === 0) {
      return res.status(404).json({
        message: "Visitor log not found",
      });
    }

    const visitorLog = await prisma.visitorLog.findFirst({
      where: {
        id,
        organisationId,
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

    res.json(visitorLog);
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
    const organisationId = req.organisation.id;

    const deletedVisitorLog = await prisma.visitorLog.deleteMany({
      where: {
        id,
        organisationId,
      },
    });

    if (deletedVisitorLog.count === 0) {
      return res.status(404).json({
        message: "Visitor log not found",
      });
    }

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
