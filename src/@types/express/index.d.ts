declare global {
    namespace Express {
        interface Request {
            serviceName: string?,
            serviceRequestPath: string?
        }
    }
}

export {}