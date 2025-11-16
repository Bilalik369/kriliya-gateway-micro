import proxy from "express-http-proxy";
import dotenv from "dotenv";

dotenv.config();

const services = {
  auth: process.env.AUTH_SERVICE_URL, 
  items: process.env.ITEM_SERVICE_URL,
  booking: process.env.BOOKING_SERVICE_URL,
  notification: process.env.NOTIFICATION_SERVICE_URL,
  review : process.env.REVIEW_SERVICE_URL,
};

export const createServiceProxy = (serviceName) => {
  const serviceUrl = services[serviceName];
  
  if (!serviceUrl) {
    throw new Error(`Service '${serviceName}' not found`);
  }

  return proxy(serviceUrl, {
    proxyReqPathResolver: (req) => {
     
      const newPath = req.originalUrl || req.url;
      console.log(`[Gateway] Proxying ${req.method} ${newPath} to ${serviceUrl}${newPath}`);
      return newPath;
    },
    
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      
      if (srcReq.headers.authorization) {
        proxyReqOpts.headers['Authorization'] = srcReq.headers.authorization;
      }
      return proxyReqOpts;
    },

    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      console.log(`[Gateway] Response from ${serviceName}: ${userRes.statusCode}`);
      return proxyResData;
    },

    proxyErrorHandler: (err, res, next) => {
      console.error(`[Gateway] Error proxying to ${serviceName}:`, err.message);
      
      if (!res.headersSent) {
        res.status(503).json({
          error: `${serviceName} service unavailable`,
          message: err.message,
        });
      }
    },
  });
};