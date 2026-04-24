export interface Program {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  goal: number;
  raised: number;
  category: string;
}

export const programs: Program[] = [
  {
    id: "4",
    slug: "forest-cleanup",
    title: "Forest Restoration & Cleanup",
    description: "Join our youth-led initiative to clean up and restore local forest ecosystems, protecting biodiversity for future generations.",
    image: "/videos/Boy cleaning forest.jpg",
    video: "/videos/boycleanignforest.mp4",
    goal: 100000,
    raised: 15000,
    category: "Environment",
  },
  {
    id: "1",
    slug: "clean-water-initiative",
    title: "Clean Water Initiative",
    description: "Providing sustainable clean water sources to rural communities in Sub-Saharan Africa.",
    image: "https://images.unsplash.com/photo-1504814532849-cff240bbc503?auto=format&fit=crop&q=80&w=800",
    video: "https://videos.pexels.com/video-files/855029/855029-hd_1920_1080_30fps.mp4",
    goal: 50000,
    raised: 32500,
    category: "Environment",
  },
  {
    id: "2",
    slug: "education-for-all",
    title: "Education for All",
    description: "Building schools and providing learning materials to underprivileged children.",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
    video: "https://videos.pexels.com/video-files/8088453/8088453-uhd_2560_1440_25fps.mp4",
    goal: 75000,
    raised: 45000,
    category: "Education",
  },
  {
    id: "3",
    slug: "hunger-relief-program",
    title: "Hunger Relief Program",
    description: "Distributing nutritious meals to families facing food insecurity globally.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
    video: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
    goal: 30000,
    raised: 28000,
    category: "Health",
  },
];
