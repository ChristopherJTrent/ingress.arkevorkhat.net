-- CreateTable
CREATE TABLE "_ApiKeyToRole" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ApiKeyToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "ApiKey" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ApiKeyToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ApiKeyToRole_AB_unique" ON "_ApiKeyToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_ApiKeyToRole_B_index" ON "_ApiKeyToRole"("B");
