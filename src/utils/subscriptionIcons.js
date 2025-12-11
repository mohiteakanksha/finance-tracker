import { Tv, Music, ShoppingBag, Film, Globe } from "lucide-react";

const icons = {
  Netflix: Tv,
  Spotify: Music,
  "Amazon Prime": ShoppingBag,
  YouTube: Film,
  Hotstar: Tv,
  Default: Globe,
};

export default function getSubscriptionIcon(name) {
  return icons[name] || icons["Default"];
}
