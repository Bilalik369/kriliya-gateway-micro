import { createProxyMiddleware } from "http-proxy-middleware";


const services = {
    auth: {
        target: process.env.AUTH_SERVICE_URL,
        path: "/api/auth"
    },
    items: {
        target: process.env.ITEM_SERVICE_URL,
        path: "/api/items"
    }
}


export const createServiceProxy = (serviceName) => {
    const service = services[serviceName];
    if (!service) throw new Error(`Service '${serviceName}' not found`);

    return createProxyMiddleware({
        target: service.target,
        changeOrigin: true,
        pathRewrite: { [`^${service.path}`]: "" },
        onError: (err, req, res) => {
            console.error(`[Gateway] Error proxying to ${serviceName}:`, err.message);
            res.status(503).json({
                error: `${serviceName} service unavailable`,
                message: "Please try again later",
            });
        }
    });
}
