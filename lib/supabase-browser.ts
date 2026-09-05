import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xayqbbuycoxwdlvhzmdk.supabase.co'
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_ib4LHJLt-VHi5LuYn6rNJw_vRYz-qv8'

export const supabase = createClient(url, key)
