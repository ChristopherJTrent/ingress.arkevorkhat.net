/*
  Warnings:

  - Added the required column `description` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fqn" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Role" ("fqn", "id") SELECT "fqn", "id" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
CREATE UNIQUE INDEX "Role_fqn_key" ON "Role"("fqn");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
