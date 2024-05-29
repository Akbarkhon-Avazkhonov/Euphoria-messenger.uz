/*
  Warnings:

  - You are about to drop the column `unique_id` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Message` table. All the data in the column will be lost.
  - You are about to alter the column `message_id` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to drop the column `operator_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `client_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operator_id` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "operator_id" BIGINT NOT NULL,
    "message_id" INTEGER NOT NULL,
    "client_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "other" TEXT NOT NULL
);
INSERT INTO "new_Message" ("id", "is_deleted", "message_id", "other") SELECT "id", "is_deleted", "message_id", "other" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "telegram_id" TEXT,
    "name" TEXT,
    "username" TEXT,
    "phoneNumber" TEXT,
    "status" TEXT,
    "password" TEXT,
    "session" TEXT,
    "role_id" INTEGER NOT NULL DEFAULT 2,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "id", "name", "password", "phoneNumber", "role_id", "session", "status", "telegram_id", "updatedAt", "username") SELECT "createdAt", "id", "name", "password", "phoneNumber", "role_id", "session", "status", "telegram_id", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
