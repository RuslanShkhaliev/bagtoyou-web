export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ad_images: {
        Row: {
          ad_id: number
          id: number
          order: number | null
          url: string
        }
        Insert: {
          ad_id: number
          id?: number
          order?: number | null
          url: string
        }
        Update: {
          ad_id?: number
          id?: number
          order?: number | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_media_ad_id_fkey"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_views: {
        Row: {
          ad_id: number
          id: number
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          ad_id: number
          id?: never
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          ad_id?: number
          id?: never
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_ad"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          category_id: number
          created_at: string
          currency: string | null
          description: string
          id: number
          is_closed: boolean
          is_expired: boolean
          is_favorite: boolean
          price: number
          seller_id: string
          status: Database["public"]["Enums"]["ad_status"]
          title: string
          updated_at: string
        }
        Insert: {
          category_id: number
          created_at?: string
          currency?: string | null
          description?: string
          id?: number
          is_closed?: boolean
          is_expired?: boolean
          is_favorite?: boolean
          price?: number
          seller_id?: string
          status?: Database["public"]["Enums"]["ad_status"]
          title?: string
          updated_at?: string
        }
        Update: {
          category_id?: number
          created_at?: string
          currency?: string | null
          description?: string
          id?: number
          is_closed?: boolean
          is_expired?: boolean
          is_favorite?: boolean
          price?: number
          seller_id?: string
          status?: Database["public"]["Enums"]["ad_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ads_author_id_fkey1"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ads_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          icon: string | null
          id: number
          is_active: boolean | null
          name: string
          order: number | null
          parent_id: number | null
          slug: string
        }
        Insert: {
          icon?: string | null
          id?: number
          is_active?: boolean | null
          name: string
          order?: number | null
          parent_id?: number | null
          slug: string
        }
        Update: {
          icon?: string | null
          id?: number
          is_active?: boolean | null
          name?: string
          order?: number | null
          parent_id?: number | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          about: string | null
          avatar: string
          created_at: string
          email: string
          id: string
          phone: string
          rating: number
          updated_at: string
          username: string
          verified: boolean
        }
        Insert: {
          about?: string | null
          avatar?: string
          created_at?: string
          email: string
          id?: string
          phone?: string
          rating?: number
          updated_at?: string
          username?: string
          verified?: boolean
        }
        Update: {
          about?: string | null
          avatar?: string
          created_at?: string
          email?: string
          id?: string
          phone?: string
          rating?: number
          updated_at?: string
          username?: string
          verified?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      close_ad: {
        Args: {
          ad_id: string
          reason: Database["public"]["Enums"]["close_reason"]
        }
        Returns: undefined
      }
      get_end_of_day: { Args: { p_timestamp: string }; Returns: string }
      get_profile_ads_counts: {
        Args: { p_author_id: string }
        Returns: {
          count: number
          status: string
        }[]
      }
      mark_expired_ads: { Args: never; Returns: undefined }
    }
    Enums: {
      ad_deactivated_reason:
        | "expired"
        | "deal"
        | "closed_off_app"
        | "closed_other"
        | "rejected"
      ad_status: "moderation" | "active" | "inactive" | "draft"
      close_reason: "done" | "close_off_app" | "close_other"
      moderation_status: "pending" | "approved" | "rejected"
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      geo_db_city: {
        id: number | null
        type: string | null
        city: string | null
        name: string | null
        country: string | null
        countryCode: string | null
        region: string | null
        latitude: number | null
        longitude: number | null
      }
      parcel_info: {
        width: string | null
        length: string | null
        height: string | null
        weight: string | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ad_deactivated_reason: [
        "expired",
        "deal",
        "closed_off_app",
        "closed_other",
        "rejected",
      ],
      ad_status: ["moderation", "active", "inactive", "draft"],
      close_reason: ["done", "close_off_app", "close_other"],
      moderation_status: ["pending", "approved", "rejected"],
      user_role: ["user", "admin"],
    },
  },
} as const
