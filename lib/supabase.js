import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rzzjqrvjdhsduxuvdpuk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6empxcnZqZGhzZHV4dXZkcHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NDcyOTIsImV4cCI6MjA4ODMyMzI5Mn0.uFVz1oGhKhddLBinwdZnlJz4YP4ejnWxBgmhbPXk5rc';

export const supabase = createClient(supabaseUrl, supabaseKey);