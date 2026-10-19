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
  { label: "Leadership", href: "/leadership" },
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

export type CommitteeMember = {
  name: string;
  role: string;
  photo: string;
};

/** Group Committee shown in "Our leadership hierarchy". The first member is shown on top. */
export const committee = {
  term: "2025–28",
  members: [
    { name: "Md Mahabub Alam", role: "President", photo: "/images/committee/mahabub-alam.jpg" },
    { name: "Sanjoy Das", role: "Vice-President", photo: "/images/committee/sanjoy-das.jpg" },
    { name: "Md Sakib Uddin", role: "Treasurer", photo: "/images/committee/sakib-uddin.jpg" },
    { name: "Alamgir Kabir Abir", role: "Secretary", photo: "/images/committee/alamgir-kabir-abir.jpg" },
    { name: "Mohammad Rubel", role: "Rover Scout Leader", photo: "/images/committee/mohammad-rubel.jpg" },
    { name: "Suraiya Islam Shrity", role: "Rover Scout Leader", photo: "/images/committee/suraiya-islam-shrity.jpg" },
    { name: "Rakibul Islam", role: "Executive Member", photo: "/images/committee/rakibul-islam.jpg" },
    { name: "Mustafizur Rahman", role: "Executive Member", photo: "/images/committee/mustafizur-rahman.jpg" },
    { name: "Sadia Akter", role: "Executive Member", photo: "/images/committee/sadia-akter.jpg" },
    { name: "Anisuzzaman Nahid", role: "Executive Member", photo: "/images/committee/anisuzzaman-nahid.jpg" },
    { name: "Razmin Akter", role: "Executive Member", photo: "/images/committee/razmin-akter.jpg" },
    { name: "Md Junayid Islam", role: "Senior Rover Mate", photo: "/images/committee/junayid-islam.jpg" },
    { name: "Tania Akter", role: "Senior Rover Mate", photo: "/images/committee/tania-akter.jpg" },
  ] satisfies CommitteeMember[],
};

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

export type Stat = {
  value: string;
  label: string;
  icon: "members" | "camps" | "service" | "achievements";
  color: "green" | "violet" | "navy" | "red";
};

export const stats: Stat[] = [
  { value: "120+", label: "Active members", icon: "members", color: "green" },
  { value: "15+", label: "Successful camps", icon: "camps", color: "violet" },
  { value: "30+", label: "Community service events", icon: "service", color: "navy" },
  { value: "5", label: "Group achievements", icon: "achievements", color: "red" },
];

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
