const cors = require('cors');

// CORS configuration to allow frontend to communicate with backend
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    // Whitelist:
    // - localhost dev servers
    // - Any AWS ELB or CloudFront domain (for production)
    // - CLIENT_URL env variable can override for custom domains
    const allowedPatterns = [
      /^http:\/\/localhost(:\d+)?$/,
      /^https?:\/\/.*\.elb\.amazonaws\.com$/,
      /^https?:\/\/.*\.cloudfront\.net$/,
    ];

    const clientUrl = process.env.CLIENT_URL;
    if (clientUrl) {
      try {
        allowedPatterns.push(new RegExp(`^${clientUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`));
      } catch (_) {}
    }

    const isAllowed = allowedPatterns.some((pattern) => pattern.test(origin));

    if (isAllowed) {
      callback(null, true);
    } else {
      console.error(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

module.exports = cors(corsOptions);