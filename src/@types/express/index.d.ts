declare global {
    namespace Express {
        interface Request {
            serviceName: String?,
            serviceRequestPath: String?
        }
    }
}

export {}