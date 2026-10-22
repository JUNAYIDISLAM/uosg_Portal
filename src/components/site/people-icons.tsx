import type { ReactNode, SVGProps } from "react";

// Hand-drawn people icons, in the same outline style as Lucide
type IconProps = SVGProps<SVGSVGElement>;

function PeopleIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

// A leader with a flag, two followers behind
export function LeaderIcon(props: IconProps) {
  return (
    <PeopleIcon {...props}>
      <circle cx="9" cy="20" r="3.5" />
      <path d="M2 39v-3a7 7 0 0 1 9-6.7" />
      <circle cx="39" cy="20" r="3.5" />
      <path d="M46 39v-3a7 7 0 0 0-9-6.7" />
      <circle cx="24" cy="16" r="5" />
      <path d="M15 43v-7a9 9 0 0 1 18 0v7" />
      <path d="M31 27V4h8l-2 3 2 3h-8" />
    </PeopleIcon>
  );
}

// A hiker with arms raised on a summit
export function HikerIcon(props: IconProps) {
  return (
    <PeopleIcon {...props}>
      <path d="M3 44l13-18h6l6 8 5-5 12 15z" />
      <circle cx="19" cy="6" r="3.5" />
      <path d="M19 12v9M12 9l7 6 7-6M16 26l3-5 3 5" />
      <circle cx="39" cy="12" r="3" />
    </PeopleIcon>
  );
}

// Two people joining hands under a heart
export function HelpingHandsIcon(props: IconProps) {
  return (
    <PeopleIcon {...props}>
      <path d="M24 16c-4-3-7-5.5-7-8.5a3.5 3.5 0 0 1 7-1 3.5 3.5 0 0 1 7 1c0 3-3 5.5-7 8.5z" />
      <circle cx="11" cy="20" r="4" />
      <path d="M3 42v-5a8 8 0 0 1 16 0v5" />
      <circle cx="37" cy="20" r="4" />
      <path d="M29 42v-5a8 8 0 0 1 16 0v5" />
      <path d="M17 31l7 4 7-4" />
    </PeopleIcon>
  );
}

// Someone walking in through an open door
export function OpenDoorIcon(props: IconProps) {
  return (
    <PeopleIcon {...props}>
      <path d="M4 44h40" />
      <path d="M10 44V5h18v39" />
      <path d="M10 5l9 4v32l-9 3z" />
      <circle cx="16.5" cy="26" r="0.8" fill="currentColor" />
      <circle cx="37" cy="13" r="3.5" />
      <path d="M37 17v13M37 21l-5 5M37 21l4 6M37 30l-4 13M37 30l4 13" />
    </PeopleIcon>
  );
}

// A scout pulling a guy line to pitch a tent
export function PitchTentIcon(props: IconProps) {
  return (
    <PeopleIcon {...props}>
      <path d="M3 43L15 17l12 26z" />
      <path d="M15 43V33" />
      <path d="M2 43h44" />
      <path d="M15 17l17 8" />
      <circle cx="38" cy="16" r="3.5" />
      <path d="M38 20l-1 12M37 32l-5 11M37 32l4 11M37.7 23.5l-5.5 1.5" />
    </PeopleIcon>
  );
}

// An adult leader with a hand on a young scout's shoulder, both in neckerchiefs
export function MentorIcon(props: IconProps) {
  return (
    <PeopleIcon {...props}>
      <circle cx="17" cy="9" r="4.5" />
      <path d="M9 44V27a8 8 0 0 1 16 0v17" />
      <path d="M13 20l4 6 4-6" />
      <circle cx="35" cy="22" r="3.5" />
      <path d="M29 44V35a6 6 0 0 1 12 0v9" />
      <path d="M32 30l3 4 3-4" />
      <path d="M24.5 25.5L31 31" />
    </PeopleIcon>
  );
}

// Two friends by a campfire
export function CampfireFriendsIcon(props: IconProps) {
  return (
    <PeopleIcon {...props}>
      <circle cx="13" cy="10" r="4" />
      <path d="M5 32v-6a8 8 0 0 1 16 0v6" />
      <circle cx="35" cy="10" r="4" />
      <path d="M27 32v-6a8 8 0 0 1 16 0v6" />
      <path d="M24 43c-3.5 0-5-2.5-4-5.5 1 1.5 2 1.5 2 0 0-2.5 2-4.5 2-4.5 0 2 4 3.5 4 7 0 2-1.8 3-4 3z" />
      <path d="M16 46l16-3M16 43l16 3" />
    </PeopleIcon>
  );
}
