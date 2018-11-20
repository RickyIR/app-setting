/**
 * Video files group
 */

export interface VideoFilesGroup {
  id: number;
  video: string;
  audio: string;
  transcript: string;
  captions: string;
  poster: string;
}

/**
 * Knowledge group
 */

export interface KnowledgeQuestionsGroup {
  id: number;
  knowledge_group_id: number;
  question: string;
  timeStamp?: string;
  answers: KnowledgeAnswer[];
}

export interface KnowledgeAnswer {
  id: number;
  answer: string;
  isCorrect: boolean;
  answerExplanation: string;
}

/**
 * Rating group
 */
export interface RatingGroup {
  id: number;
  question: string;
  answerLimit: number;
}

/**
 * Discussion group
 */

export interface DiscussionGroup {
  id: number;
  discussion_group_id: number;
  title: string;
  url: string;
  date: string;
  user: DiscussionUser;
  comments: DiscussionComment[];
}

export interface DiscussionUser {
  id: number;
  name: string;
  url: string;
  profile_icon: {
    url: string;
    alt: string;
  };
}

export interface DiscussionComment {
  id: number;
  text: string;
  /**
   * Coming soon
   */
}

/**
 * Resources Group
 */
export interface ResourcesGroup {
  id: number;
  resources_group_id: number;
  name: string;
  icon: string;
  title: string;
  link: {
    url: string;
    text: string;
  };
}
