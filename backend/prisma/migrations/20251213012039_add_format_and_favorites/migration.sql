-- AlterTable
ALTER TABLE "consumptions" ADD COLUMN     "format" TEXT,
ADD COLUMN     "volumeConsumed" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "user_favorites" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "alcoholId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_favorites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_favorites_userId_alcoholId_key" ON "user_favorites"("userId", "alcoholId");

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_alcoholId_fkey" FOREIGN KEY ("alcoholId") REFERENCES "alcohols"("id") ON DELETE CASCADE ON UPDATE CASCADE;
