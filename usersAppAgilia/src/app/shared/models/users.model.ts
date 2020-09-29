import { User } from './user.model';

export interface UserPage {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: Array<User>;
}
