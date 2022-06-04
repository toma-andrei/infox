const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "192.168.1.8",
      changeOrigin: true,
    })
  );
};
// iustin: 192.168.100.9
