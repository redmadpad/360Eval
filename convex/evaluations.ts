import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// ثبت ارزیابی برای یک رفتار
export const addEvaluation = mutation({
  args: {
    targetUserId: v.id("users"),
    behaviorId: v.id("behaviors"),
    score: v.number(),
    comment: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const evaluatorId = await getAuthUserId(ctx);
    if (!evaluatorId) throw new Error("Unauthorized");
    return await ctx.db.insert("evaluations", {
      evaluatorId,
      targetUserId: args.targetUserId,
      behaviorId: args.behaviorId,
      score: args.score,
      comment: args.comment,
      createdAt: Date.now(),
    });
  },
});

// لیست ارزیابی‌های دریافتی برای کاربر جاری
export const myReceivedEvaluations = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db
      .query("evaluations")
      .withIndex("by_target", (q) => q.eq("targetUserId", userId))
      .order("desc")
      .collect();
  },
});

// لیست ارزیابی‌های یک کارمند خاص (برای مشاهده توسط خودش یا ادمین)
export const userEvaluations = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("evaluations")
      .withIndex("by_target", (q) => q.eq("targetUserId", args.userId))
      .order("desc")
      .collect();
  },
});

// استخراج ارزیابی‌ها بر اساس بازه زمانی (ادمین)
export const evaluationsByDateRange = query({
  args: {
    from: v.number(),
    to: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("evaluations")
      .withIndex("by_createdAt", (q) => q.gte("createdAt", args.from).lt("createdAt", args.to))
      .order("desc")
      .collect();
  },
});
