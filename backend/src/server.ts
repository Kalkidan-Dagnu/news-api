import app from "./app";
// @ts-ignore: no type definitions for 'swagger-ui-express'
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { processDailyAnalytics } from "./jobs/analytics.job";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Start analytics job immediately and then every 24 hours
setInterval(async () => {
  await processDailyAnalytics();
  console.log("Analytics processed");
}, 60000); // every 60 seconds (for demo)