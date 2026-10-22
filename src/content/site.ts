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
    linkedin: "#",
    twitter: "#",
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

export const whyJoin = [
  {
    title: "Open to everyone",
    text: "Any young person can join, whatever their school, background or experience.",
    details:
      "As an open scout group, we are not tied to any one school or institution. Boys and girls from every background are welcome, and you do not need any scouting experience to start. Seniors in your patrol help you settle in and learn the basics.",
    icon: "open",
  },
  {
    title: "Learning by doing",
    text: "Camps, projects and real responsibilities instead of lectures.",
    details:
      "Scouting is learned outdoors, not from a textbook. Members pitch tents, cook at camp, read maps, practise first aid and plan their own projects. Each activity ends with a short look back at what went well, so the lessons stay with you.",
    icon: "tent",
  },
  {
    title: "Experienced leaders",
    text: "Trained volunteers guide every activity and keep everyone safe.",
    details:
      "Our activities are run by trained adult leaders who plan every camp and outing with safety in mind. Senior rovers support them and guide younger members, so there is always someone to ask for help.",
    icon: "leaders",
  },
  {
    title: "Friends for life",
    text: "Share tents, trails and campfires with people who become close friends.",
    details:
      "Few things bring people together like a night at camp or a long day on the trail. You will meet young people from different schools and backgrounds who share your sense of adventure, and many of those friendships last well beyond your scouting years.",
    icon: "friends",
  },
] as const;

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
  {
    title: "Outdoor activities & adventure",
    text: "Camps, hikes and nights under the open sky, where we learn to plan, pack and look after each other.",
  },
  {
    title: "Leadership and life skills",
    text: "Every member gets the chance to lead a patrol, run a project and speak up in front of a group.",
  },
  {
    title: "Community service projects",
    text: "Clean-up drives, relief work and awareness campaigns that make a real difference where we live.",
  },
  {
    title: "A supportive and inclusive community",
    text: "Open to every young person, whatever their background. Here you find friends who have your back.",
  },
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
  image: "/images/cards/campfire-gathering.jpg",
};

export const activities: Activity[] = [
  {
    title: "Community Service",
    text: "Serve the community and help create a cleaner, better tomorrow.",
    tag: "Service",
    image: "/images/cards/team-circle.jpg",
  },
  {
    title: "Leadership Training",
    text: "Develop leadership, communication and teamwork skills.",
    tag: "Training",
    image: "/images/cards/pioneering.jpg",
  },
  {
    title: "Hiking & Trekking",
    text: "Explore new places, challenge yourself and grow stronger.",
    tag: "Outdoor",
    image: "/images/cards/trail-hike.jpg",
  },
  {
    title: "Adventure Camp",
    text: "Experience the thrill of the outdoors around the night fire.",
    tag: "Camping",
    image: "/images/cards/signpost.jpg",
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
    image: "/images/cards/woggle-circle.jpg",
  },
  {
    date: "2026-09-12",
    title: "Community Clean-Up Drive",
    summary: "Together we cleared over 400 kg of waste from the Hatirjheel lakeside walkway.",
    tag: "Service",
    image: "/images/cards/hands-together.jpg",
  },
  {
    date: "2026-08-30",
    title: "New Members Welcome",
    summary: "We are excited to welcome 18 new rovers to our growing family this session.",
    tag: "Crew",
    image: "/images/cards/scarves-knot.jpg",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  position?: string; // Tailwind object-position class, for photos whose subject is off-centre
  video?: { title: string; url: string };
};

export const gallery: GalleryItem[] = [
  {
    src: "/images/gallery/sunset-campfire.jpg",
    alt: "Scouts sitting around a campfire by bell tents at sunset",
    position: "object-[center_65%]",
  },
  { src: "/images/gallery/river-crossing.jpg", alt: "Scouts helping each other across a mountain stream" },
  { src: "/images/gallery/torches.jpg", alt: "Two scouts holding lit torches at night" },
  { src: "/images/gallery/hike-break.jpg", alt: "A hiking group with backpacks resting on a forest trail" },
  {
    src: "/images/gallery/trail-trio.jpg",
    alt: "Three scouts with backpacks walking between cornfields",
    position: "object-[center_75%]",
  },
  {
    src: "/images/gallery/jamboree.jpg",
    alt: "A large crowd of scouts in front of the jamboree stage",
    position: "object-[center_70%]",
  },
  {
    src: "/images/gallery/tent-field.jpg",
    alt: "Rows of tents pitched across a campground",
    position: "object-[center_70%]",
  },
  {
    src: "/images/training.jpg",
    alt: "Camp 2026 recap video",
    video: { title: "Watch: Camp 2026 recap", url: "#" },
  },
];
