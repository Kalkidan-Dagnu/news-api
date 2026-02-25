import app from "./app";
import { processDailyAnalytics } from "./jobs/analytics.job";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Start analytics job immediately and then every 24 hours
setInterval(async () => {
  await processDailyAnalytics();
  console.log("Analytics processed");
}, 60000); // every 60 seconds (for demo)