
import {
  Home, Compass, Users, Calendar, Heart,
  Bell, User
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
    icon: Users, 
    label: 'Groups', 
    to: '/groups', 
    primary: true,
    description: 'Join interest-based congregations, local church groups, and study forums'
  },
  { 
    icon: Calendar, 
    label: 'Events', 
    to: '/events', 
    primary: true,
    description: 'Access your calendar for church services, gatherings, and spiritual events'
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
