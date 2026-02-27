import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qrpaihdwjspdfzliohra.supabase.co";
const supabaseKey = "sb_publishable_NgzNvNBOgoFWKgAkkE6Etg_d1BHuaj5";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
