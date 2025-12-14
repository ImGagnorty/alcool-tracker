-- AlterTable
ALTER TABLE "users" ADD COLUMN     "acceptedRules" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "acceptedTerms" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "termsAcceptedAt" TIMESTAMP(3);
