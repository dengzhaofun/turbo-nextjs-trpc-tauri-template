
import { singleton } from "tsyringe";

import { SupabaseClient, createClient } from "@supabase/supabase-js";


@singleton()
export default class SupabaseService {
  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    );
  }

  public getClient(): SupabaseClient {
    return this.supabaseClient;
  }
}
