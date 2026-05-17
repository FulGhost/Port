-- CreateTable
CREATE TABLE "VisitorLog" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organisation" TEXT NOT NULL,
    "nature" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "timeIn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeOut" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'in-building',

    CONSTRAINT "VisitorLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VisitorLog_timeIn_idx" ON "VisitorLog"("timeIn");
