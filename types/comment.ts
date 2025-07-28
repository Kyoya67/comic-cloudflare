export interface Comment {
  id: string;
  comicId: string;
  content: string;
  createdAt: string;
}

export interface CommentFormData {
  id: string;
  comicId: string;
  comment: string;
} 