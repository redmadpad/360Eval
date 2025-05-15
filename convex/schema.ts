import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  behaviorCategories: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
  }),
  cultureVariables: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
  }),
  behaviors: defineTable({
    userId: v.id("users"),
    categoryId: v.id("behaviorCategories"),
    variableId: v.id("cultureVariables"),
    title: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_user", ["userId"])
    .index("by_category", ["categoryId"])
    .index("by_variable", ["variableId"]),
  evaluations: defineTable({
    evaluatorId: v.id("users"),
    targetUserId: v.id("users"),
    behaviorId: v.id("behaviors"),
    score: v.number(),
    comment: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_target", ["targetUserId"])
    .index("by_evaluator", ["evaluatorId"])
    .index("by_behavior", ["behaviorId"])
    .index("by_createdAt", ["createdAt"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
