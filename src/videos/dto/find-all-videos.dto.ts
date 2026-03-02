export class FindAllVideosDto {
  page: number = 1;
  per_page: number = 20;
  category_id?: string;
  genre_id?: string;
  year?: number;
  sort: string = 'created_at';
  order?: 'asc' | 'desc';
}
