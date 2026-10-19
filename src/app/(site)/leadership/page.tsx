import type { Metadata } from "next";
import { Leadership } from "@/components/site/leadership";

export const metadata: Metadata = {
  title: "Leadership",
  description: "The Group Committee of United Open Scout Group.",
};

export default function LeadershipPage() {
  return <Leadership />;
}
