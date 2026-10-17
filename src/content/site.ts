// Static content for the public website.
// These will move into the CMS (database) in a later phase; keep the shapes stable.

export const siteInfo = {
  name: "United Open Scout Group",
  shortName: "UOSG",
  tagline: "Together for a better tomorrow",
  address: "Scout Bhaban, Kakrail, Dhaka 1000, Bangladesh",
  phone: "+880 1711-000000",
  email: "info@unitedopenscout.org",
  meeting: "Weekly meeting: Friday, 3:00 PM – 5:30 PM",
  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },
};

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Leadership", href: "/#leadership" },
  { label: "Activities", href: "/#activities" },
  { label: "News", href: "/#news" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Contact", href: "/#contact" },
];

export const coreValues = [
  {
    icon: "users",
    title: "Leadership Development",
    text: "Build confidence, decision-making skills and a sense of responsibility.",
  },
  {
    icon: "tent",
    title: "Outdoor Adventure",
    text: "Explore nature, learn new skills and create lifelong memories.",
  },
  {
    icon: "heart",
    title: "Community Service",
    text: "Give back to society and make a real difference where we live.",
  },
] as const;

export const aboutPoints = [
  "Outdoor activities & adventure",
  "Leadership and life skills",
  "Community service projects",
  "A supportive and inclusive community",
];

export type AvatarTone = "navy" | "green" | "violet" | "ember";

export type Leader = {
  name: string;
  role: string;
  since: number;
};

export type LeadershipTier = {
  title: string;
  description: string;
  tone: AvatarTone;
  leaders: Leader[];
};

export const leadershipSession = "2026 – 2027";

export const leadershipTiers: LeadershipTier[] = [
  {
    title: "Group Committee",
    description: "Oversees the group, its policy and its partnerships.",
    tone: "navy",
    leaders: [
      { name: "Md. Abdur Rahman", role: "President, Group Committee", since: 2024 },
      { name: "Farhana Akter", role: "Secretary, Group Committee", since: 2025 },
    ],
  },
  {
    title: "Rover Scout Leader",
    description: "Guides the crew’s programme, training and progress.",
    tone: "green",
    leaders: [{ name: "Tanvir Ahmed", role: "Rover Scout Leader (RSL)", since: 2023 }],
  },
  {
    title: "Senior Rover Mate",
    description: "Leads the crew day to day and coordinates the mates.",
    tone: "violet",
    leaders: [{ name: "Sadia Islam", role: "Senior Rover Mate", since: 2026 }],
  },
  {
    title: "Rover Mates",
    description: "Each leads a patrol, supported by an assistant.",
    tone: "ember",
    leaders: [
      { name: "Rakibul Hasan", role: "Rover Mate · Sundarban Patrol", since: 2026 },
      { name: "Nusrat Jahan", role: "Rover Mate · Padma Patrol", since: 2026 },
      { name: "Arif Hossain", role: "Asst. Rover Mate · Sundarban Patrol", since: 2026 },
      { name: "Mim Chowdhury", role: "Asst. Rover Mate · Padma Patrol", since: 2026 },
    ],
  },
];

export const roverCount = { active: 112, units: 2 };

export type Activity = {
  title: string;
  text: string;
  tag: string;
  image: string;
};

export const featuredActivity: Activity & { label: string } = {
  label: "Flagship programme",
  title: "Scout Camp",
  text: "Build friendship, learn survival skills and enjoy nature together.",
  tag: "Camping",
  image: "/images/camp-feature.jpg",
};

export const activities: Activity[] = [
  {
    title: "Community Service",
    text: "Serve the community and help create a cleaner, better tomorrow.",
    tag: "Service",
    image: "/images/cleanup.jpg",
  },
  {
    title: "Leadership Training",
    text: "Develop leadership, communication and teamwork skills.",
    tag: "Training",
    image: "/images/training.jpg",
  },
  {
    title: "Hiking & Trekking",
    text: "Explore new places, challenge yourself and grow stronger.",
    tag: "Outdoor",
    image: "/images/mountain.jpg",
  },
  {
    title: "Adventure Camp",
    text: "Experience the thrill of the outdoors around the night fire.",
    tag: "Camping",
    image: "/images/campfire.jpg",
  },
];

export const stats = {
  headline: { value: "120+", label: "Active members" },
  items: [
    { label: "Successful camps", value: "15+" },
    { label: "Community service events", value: "30+" },
    { label: "Group achievements", value: "5" },
  ],
};

export type NewsItem = {
  date: string; // ISO date
  title: string;
  summary: string;
  tag: string;
  image: string;
};

export const news: NewsItem[] = [
  {
    date: "2026-09-25",
    title: "Annual Scout Camp 2026",
    summary: "Our members enjoyed three days of learning, adventure and friendship in Sreemangal.",
    tag: "Camp",
    image: "/images/campfire.jpg",
  },
  {
    date: "2026-09-12",
    title: "Community Clean-Up Drive",
    summary: "Together we cleared over 400 kg of waste from the Hatirjheel lakeside walkway.",
    tag: "Service",
    image: "/images/cleanup.jpg",
  },
  {
    date: "2026-08-30",
    title: "New Members Welcome",
    summary: "We are excited to welcome 18 new rovers to our growing family this session.",
    tag: "Crew",
    image: "/images/training.jpg",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  video?: { title: string; url: string };
};

export const gallery: GalleryItem[] = [
  { src: "/images/mountain.jpg", alt: "Rovers looking out over misty mountains at sunrise" },
  { src: "/images/campfire-tall.jpg", alt: "Rovers gathered around a campfire at night" },
  { src: "/images/cleanup-wide.jpg", alt: "Rovers collecting litter during a clean-up drive" },
  { src: "/images/camp-tents.jpg", alt: "Scouts sitting together at a forest campsite" },
  {
    src: "/images/training.jpg",
    alt: "Camp 2026 recap video",
    video: { title: "Watch: Camp 2026 recap", url: "#" },
  },
];
