import type { ApiKey, User } from "../../generated/prisma/client"
import { prisma } from "./prisma";

export class ApiKeyFactory {
    keytext: string
    expiration: Date
    owner: User
    constructor(owner: User) {
        this.owner = owner;
        this.keytext = this.generateKeytext()
        let time = new Date()
        time.setFullYear(time.getFullYear() + 1)
        this.expiration = time
    }

    private generateKeytext(): string {
        return Math.random().toString(36).substring(2, 2 + 16)
    }
    async get(): Promise<ApiKey> {
        return prisma.apiKey.create({
            data: {
                keyText: this.keytext,
                expires_at: this.expiration,
                ownerId: this.owner.id
            }
        })
    }
}