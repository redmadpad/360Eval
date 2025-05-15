import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

// افزودن رفتار جدید توسط کاربر
export const addBehavior = mutation({
  args: {
    categoryId: v.id("behaviorCategories"),
    variableId: v.id("cultureVariables"),
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    return await ctx.db.insert("behaviors", {
      userId,
      categoryId: args.categoryId,
      variableId: args.variableId,
      title: args.title,
      description: args.description,
      createdAt: Date.now(),
    });
  },
});

// لیست رفتارهای ثبت‌شده توسط کاربر جاری
export const myBehaviors = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];
    return await ctx.db
      .query("behaviors")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

// لیست رفتارهای یک کارمند خاص (برای مشاهده توسط خودش یا ادمین)
export const userBehaviors = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("behaviors")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

// لیست دسته‌بندی‌های رفتاری (برای فرم ثبت رفتار)
export const behaviorsCategoriesList = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("behaviorCategories").collect();
  },
});

// لیست متغیرهای فرهنگ سازمانی (برای فرم ثبت رفتار)
export const cultureVariablesList = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cultureVariables").collect();
  },
});

// افزودن دسته‌بندی رفتاری (ادمین)
export const addCategory = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // فقط ادمین (مثلاً ایمیل admin@company.com) مجاز است
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const user = await ctx.db.get(userId);
    if (!user || user.email !== "admin@company.com") throw new Error("Forbidden");
    return await ctx.db.insert("behaviorCategories", {
      name: args.name,
      description: args.description,
    });
  },
});

// افزودن متغیر فرهنگ سازمانی (ادمین)
export const addVariable = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const user = await ctx.db.get(userId);
    if (!user || user.email !== "admin@company.com") throw new Error("Forbidden");
    return await ctx.db.insert("cultureVariables", {
      name: args.name,
      description: args.description,
    });
  },
});

// حذف دسته‌بندی رفتاری (ادمین)
export const removeCategory = mutation({
  args: { id: v.id("behaviorCategories") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const user = await ctx.db.get(userId);
    if (!user || user.email !== "admin@company.com") throw new Error("Forbidden");
    await ctx.db.delete(args.id);
    return null;
  },
});

// حذف متغیر فرهنگ سازمانی (ادمین)
export const removeVariable = mutation({
  args: { id: v.id("cultureVariables") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Unauthorized");
    const user = await ctx.db.get(userId);
    if (!user || user.email !== "admin@company.com") throw new Error("Forbidden");
    await ctx.db.delete(args.id);
    return null;
  },
});
