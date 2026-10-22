-- Phone number from the public contact form (older messages have none)
ALTER TABLE "ContactMessage" ADD COLUMN "phone" TEXT;
