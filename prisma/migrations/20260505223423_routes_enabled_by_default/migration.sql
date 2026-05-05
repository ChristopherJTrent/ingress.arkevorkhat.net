-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Route" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "path" TEXT NOT NULL,
    "allowAllRequests" BOOLEAN NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "serviceid" INTEGER NOT NULL,
    CONSTRAINT "Route_serviceid_fkey" FOREIGN KEY ("serviceid") REFERENCES "Service" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Route" ("allowAllRequests", "disabled", "id", "path", "serviceid") SELECT "allowAllRequests", "disabled", "id", "path", "serviceid" FROM "Route";
DROP TABLE "Route";
ALTER TABLE "new_Route" RENAME TO "Route";
CREATE UNIQUE INDEX "Route_path_key" ON "Route"("path");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
