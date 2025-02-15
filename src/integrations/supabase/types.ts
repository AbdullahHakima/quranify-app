export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      daily_prayers: {
        Row: {
          arabic_text: string | null
          category: string
          created_at: string
          icon: string | null
          id: string
          title: string
          translation: string | null
        }
        Insert: {
          arabic_text?: string | null
          category: string
          created_at?: string
          icon?: string | null
          id?: string
          title: string
          translation?: string | null
        }
        Update: {
          arabic_text?: string | null
          category?: string
          created_at?: string
          icon?: string | null
          id?: string
          title?: string
          translation?: string | null
        }
        Relationships: []
      }
      doa: {
        Row: {
          arabic_text: string
          category: string | null
          created_at: string
          id: string
          tags: string[] | null
          title: string
          translation: string
        }
        Insert: {
          arabic_text: string
          category?: string | null
          created_at?: string
          id?: string
          tags?: string[] | null
          title: string
          translation: string
        }
        Update: {
          arabic_text?: string
          category?: string | null
          created_at?: string
          id?: string
          tags?: string[] | null
          title?: string
          translation?: string
        }
        Relationships: []
      }
      kajian: {
        Row: {
          category: string | null
          created_at: string
          date: string
          description: string | null
          id: string
          image_url: string | null
          location: string
          speaker: string
          title: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          date: string
          description?: string | null
          id?: string
          image_url?: string | null
          location: string
          speaker: string
          title: string
        }
        Update: {
          category?: string | null
          created_at?: string
          date?: string
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string
          speaker?: string
          title?: string
        }
        Relationships: []
      }
      prayer_times: {
        Row: {
          created_at: string
          date: string
          id: string
          location: string
          prayer_name: string
          prayer_time: string
        }
        Insert: {
          created_at?: string
          date: string
          id?: string
          location: string
          prayer_name: string
          prayer_time: string
        }
        Update: {
          created_at?: string
          date?: string
          id?: string
          location?: string
          prayer_name?: string
          prayer_time?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string
          id: string
          location: string
          notification_enabled: boolean | null
          theme: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          location: string
          notification_enabled?: boolean | null
          theme?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          location?: string
          notification_enabled?: boolean | null
          theme?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
