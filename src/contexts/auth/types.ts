import { User } from '@supabase/supabase-js';

export type CurrentUser = {
  user_metadata: {
    email: string | null;
    email_verified: boolean;
    last_name: string | null;
    name: string | null;
    phone_verified: boolean;
    sub: string | null;
  };
} & User;
