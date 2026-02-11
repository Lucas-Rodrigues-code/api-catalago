enum VideoStatus {
  UPLOADED = 'uploaded',
  PROCESSING = 'processing',
  ENCODED = 'encoded',
  PUBLISHED = 'published',
  BLOCKED = 'blocked',
}

export class Video {
  id!: string;
  title!: string;
  description!: string | null;
  release_year!: number | null;
  duration_seconds!: number | null;
  status!: VideoStatus;
  created_at!: Date;
  updated_at!: Date;
}
