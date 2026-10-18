import type { Role } from "@/generated/prisma/enums";

/**
 * Everything a member can be allowed to do in the dashboard.
 * Check these (never role names) in pages and server actions.
 */
export type Permission =
  | "dashboard.access"
  | "letters.create"
  | "letters.viewAll"
  | "letters.review"
  | "announcements.manage"
  | "messages.read"
  | "members.manage"
  | "templates.manage";

const MEMBER: Permission[] = ["dashboard.access", "letters.create"];
const SENIOR: Permission[] = [
  ...MEMBER,
  "letters.viewAll",
  "letters.review",
  "announcements.manage",
  "messages.read",
];
const LEADER: Permission[] = [...SENIOR, "members.manage", "templates.manage"];

export const rolePermissions: Record<Role, readonly Permission[]> = {
  GUEST: [],
  ROVER: MEMBER,
  ASSISTANT_ROVER_MATE: MEMBER,
  ROVER_MATE: MEMBER,
  SENIOR_ROVER_MATE: SENIOR,
  ROVER_SCOUT_LEADER: LEADER,
  GROUP_COMMITTEE_MEMBER: LEADER,
};

export function can(role: Role, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

export const roleLabels: Record<Role, string> = {
  GUEST: "Guest",
  ROVER: "Rover",
  ASSISTANT_ROVER_MATE: "Assistant Rover Mate",
  ROVER_MATE: "Rover Mate",
  SENIOR_ROVER_MATE: "Senior Rover Mate",
  ROVER_SCOUT_LEADER: "Rover Scout Leader",
  GROUP_COMMITTEE_MEMBER: "Group Committee Member",
};

/** Roles in display order, from leadership down. */
export const rolesByRank: Role[] = [
  "GROUP_COMMITTEE_MEMBER",
  "ROVER_SCOUT_LEADER",
  "SENIOR_ROVER_MATE",
  "ROVER_MATE",
  "ASSISTANT_ROVER_MATE",
  "ROVER",
  "GUEST",
];
