import React from 'react';
import {
  Users2,
  MessageSquare,
  SearchCheck,
  Puzzle,
  BookOpen,
  Crosshair,
  Flame,
  RefreshCw,
  Cpu,
  Palette,
  Network,
  LineChart,
  Bot,
  BarChart3,
  Layout,
  FileEdit,
  Globe,
  Kanban,
  Code2,
  ServerCog,
  TrendingUp,
  Target,
  Compass,
  LucideProps,
} from 'lucide-react';

interface IconProps extends Omit<LucideProps, 'ref'> {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

// ── Soft Skill Icon Component ──
export interface SkillIconProps extends IconProps {
  skill?: string;
  skillId?: string;
  name?: string;
}

export function SkillIcon({
  skill,
  skillId,
  name,
  className = 'w-4 h-4',
  size,
  strokeWidth = 1.75,
  ...props
}: SkillIconProps) {
  const key = (skill || skillId || name || '').toLowerCase().trim();

  let Component = Target;
  if (
    key.includes('kolaborasi') ||
    key.includes('teamwork') ||
    key === 'users2' ||
    key === 'users' ||
    key === '🤝'
  ) {
    Component = Users2;
  } else if (
    key.includes('komunikasi') ||
    key === 'messagesquare' ||
    key === 'message' ||
    key === '💬'
  ) {
    Component = MessageSquare;
  } else if (
    key.includes('kritis') ||
    key.includes('analitis') ||
    key.includes('analisis') ||
    key === 'searchcheck' ||
    key === 'search' ||
    key === '🔍'
  ) {
    Component = SearchCheck;
  } else if (
    key.includes('problem') ||
    key.includes('masalah') ||
    key === 'puzzle' ||
    key === '🧩'
  ) {
    Component = Puzzle;
  } else if (
    key.includes('belajar') ||
    key.includes('tahu') ||
    key === 'bookopen' ||
    key === 'book' ||
    key === '📚'
  ) {
    Component = BookOpen;
  } else if (
    key.includes('teliti') ||
    key.includes('detail') ||
    key === 'crosshair' ||
    key === '🎯'
  ) {
    Component = Crosshair;
  } else if (
    key.includes('inisiatif') ||
    key.includes('proaktif') ||
    key === 'flame' ||
    key === 'zap' ||
    key === '⚡'
  ) {
    Component = Flame;
  } else if (
    key.includes('adaptab') ||
    key.includes('kelincahan') ||
    key.includes('fleksibilitas') ||
    key === 'refreshcw' ||
    key === 'refresh' ||
    key === '🌱'
  ) {
    Component = RefreshCw;
  }

  return <Component className={className} size={size} strokeWidth={strokeWidth} {...props} />;
}

// ── Trait Archetype Icon Component ──
export interface TraitIconProps extends IconProps {
  trait?: string;
}

export function TraitIcon({
  trait,
  className = 'w-4 h-4',
  size,
  strokeWidth = 1.75,
  ...props
}: TraitIconProps) {
  const key = (trait || '').toLowerCase().trim();

  let Component = Target;
  if (key.includes('thinker') || key === 'linechart' || key === '🧠') {
    Component = LineChart;
  } else if (key.includes('creator') || key === 'palette' || key === '🎨') {
    Component = Palette;
  } else if (key.includes('connector') || key === 'network' || key === '🤝') {
    Component = Network;
  } else if (key.includes('builder') || key === 'cpu' || key === '🚀') {
    Component = Cpu;
  }

  return <Component className={className} size={size} strokeWidth={strokeWidth} {...props} />;
}

// ── Career Role Icon Component ──
export interface CareerIconProps extends IconProps {
  careerId?: string;
  name?: string;
}

export function CareerIcon({
  careerId,
  name,
  className = 'w-5 h-5',
  size,
  strokeWidth = 1.75,
  ...props
}: CareerIconProps) {
  const key = (careerId || name || '').toLowerCase().trim();

  let Component = Compass;
  if (
    key.includes('ai-ml') ||
    key.includes('machine') ||
    key === 'bot' ||
    key === '🤖'
  ) {
    Component = Bot;
  } else if (
    key.includes('data-scientist') ||
    key.includes('business intelligence') ||
    key.includes('analyst') ||
    key === 'barchart3' ||
    key === '📊'
  ) {
    Component = BarChart3;
  } else if (
    key.includes('research') ||
    key === 'linechart' ||
    key === '🔬'
  ) {
    Component = LineChart;
  } else if (
    key.includes('ui-ux') ||
    key.includes('designer') ||
    key === 'layout' ||
    key === '🎨'
  ) {
    Component = Layout;
  } else if (
    key.includes('tech-writer') ||
    key.includes('writer') ||
    key.includes('content') ||
    key === 'fileedit' ||
    key === '✍️'
  ) {
    Component = FileEdit;
  } else if (
    key.includes('web-dev') ||
    key.includes('frontend') ||
    key === 'globe' ||
    key === '🌐'
  ) {
    Component = Globe;
  } else if (
    key.includes('product-manager') ||
    key.includes('product') ||
    key === 'kanban' ||
    key === '🤝'
  ) {
    Component = Kanban;
  } else if (
    key.includes('software-engineer') ||
    key.includes('backend') ||
    key === 'code2' ||
    key === '💻'
  ) {
    Component = Code2;
  } else if (
    key.includes('devops') ||
    key.includes('cloud') ||
    key === 'servercog' ||
    key === '⚙️'
  ) {
    Component = ServerCog;
  } else if (
    key.includes('digital-marketing') ||
    key.includes('ecommerce') ||
    key.includes('marketing') ||
    key.includes('growth') ||
    key === 'trendingup' ||
    key === '🛒'
  ) {
    Component = TrendingUp;
  }

  return <Component className={className} size={size} strokeWidth={strokeWidth} {...props} />;
}
