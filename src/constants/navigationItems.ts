
import {
  Home, Compass, Heart, Bell, User
} from 'lucide-react';
import { NavItemProps } from '@/types/navigation';

export const navItems: NavItemProps[] = [
  { 
    icon: Home, 
    label: 'Home', 
    to: '/', 
    primary: true,
    description: 'Your main feed with latest posts, updates, and personalized content from your community'
  },
  { 
    icon: Compass, 
    label: 'Explore', 
    to: '/main', 
    primary: true,
    description: 'Discover new content, trending topics, and spiritual resources'
  },
  { 
    icon: Heart, 
    label: 'Prayer', 
    to: '/prayer', 
    primary: true,
    description: 'Share prayer requests, receive spiritual support, and connect with prayer partners'
  },
  { 
    icon: Bell, 
    label: 'Notifications', 
    to: '/notifications', 
    primary: false,
    description: 'Stay updated on messages, events, and community activities'
  },
  { 
    icon: User, 
    label: 'Profile', 
    to: '/profile', 
    primary: false,
    description: 'Manage your account, privacy settings, and spiritual journey'
  },
];
