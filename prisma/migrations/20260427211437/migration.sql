-- RedefineIndex
DROP INDEX "Service_path_key";
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");
