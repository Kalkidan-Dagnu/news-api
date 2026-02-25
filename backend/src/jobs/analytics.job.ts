import { prisma } from "../config/prisma";

export const processDailyAnalytics = async () => {
  // Start of today in GMT
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const logs = await prisma.readLog.groupBy({
    by: ["articleId"],
    _count: {
      articleId: true
    },
    where: {
      readAt: {
        gte: today
      }
    }
  });

  for (const log of logs) {
    await prisma.dailyAnalytics.upsert({
      where: {
        articleId_date: {
          articleId: log.articleId,
          date: today
        }
      },
      update: {
        viewCount: log._count.articleId
      },
      create: {
        articleId: log.articleId,
        date: today,
        viewCount: log._count.articleId
      }
    });
  }
};