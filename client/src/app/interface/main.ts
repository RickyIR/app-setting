import { User } from './user';

export interface Workshop {
  _id: string;
  name: string;
  description: string;
  permalink: string;
  date: {
    created: Date;
  };
  views: number;
  author: User;
  series: {
    _id: string;
    name: string;
    workshops: string[];
  };
  tags: string[];
  discussions: string;
  knowledge: string;
  downloads: string[];
  rating: WorkshopRating;
  files: WorkshopVideoFiles;
}

export interface WorkshopRating {
  question: string;
  limit: number;
  answers?: WorkshopRatingAnswer[];
  totalRating?: number;
  average?: number;
}

export interface WorkshopVideoFiles {
  mp4: string;
  mp3: string;
  transcript: string;
  transcript_pdf: string;
  poster: string;
  captions: string;
  resources: string;
}

export interface WorkshopRatingAnswer {
  user: User;
  stars: string;
  content: string;
}
