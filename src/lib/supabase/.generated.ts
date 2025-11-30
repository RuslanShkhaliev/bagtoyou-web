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
          {
            foreignKeyName: "fk_ad"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "ads_active_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_ad"
            columns: ["ad_id"]
            isOneToOne: false
            referencedRelation: "profile_ads_view"
            referencedColumns: ["id"]
          },
        ]
      }
      ads: {
        Row: {
          author_id: string
          closed_reason: Database["public"]["Enums"]["close_reason"] | null
          created_at: string
          currency: string | null
          date_end: string | null
          date_start: string | null
          description: string
          expire_at: string
          id: number
          is_booked: boolean
          is_closed: boolean
          is_expired: boolean
          location_from:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          location_to:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          media: string[]
          moderation_status: Database["public"]["Enums"]["moderation_status"]
          parcel: Database["public"]["CompositeTypes"]["parcel_info"] | null
          rewards: string
          status: Database["public"]["Enums"]["ad_status"]
          title: string
          transport: number | null
          type: number
          updated_at: string
          views: number
        }
        Insert: {
          author_id?: string
          closed_reason?: Database["public"]["Enums"]["close_reason"] | null
          created_at?: string
          currency?: string | null
          date_end?: string | null
          date_start?: string | null
          description?: string
          expire_at: string
          id?: number
          is_booked?: boolean
          is_closed?: boolean
          is_expired?: boolean
          location_from?:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          location_to?:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          media: string[]
          moderation_status?: Database["public"]["Enums"]["moderation_status"]
          parcel?: Database["public"]["CompositeTypes"]["parcel_info"] | null
          rewards?: string
          status?: Database["public"]["Enums"]["ad_status"]
          title?: string
          transport?: number | null
          type: number
          updated_at?: string
          views?: number
        }
        Update: {
          author_id?: string
          closed_reason?: Database["public"]["Enums"]["close_reason"] | null
          created_at?: string
          currency?: string | null
          date_end?: string | null
          date_start?: string | null
          description?: string
          expire_at?: string
          id?: number
          is_booked?: boolean
          is_closed?: boolean
          is_expired?: boolean
          location_from?:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          location_to?:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          media?: string[]
          moderation_status?: Database["public"]["Enums"]["moderation_status"]
          parcel?: Database["public"]["CompositeTypes"]["parcel_info"] | null
          rewards?: string
          status?: Database["public"]["Enums"]["ad_status"]
          title?: string
          transport?: number | null
          type?: number
          updated_at?: string
          views?: number
        }
        Relationships: [
          {
            foreignKeyName: "ads_author_id_fkey1"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      draft_ads: {
        Row: {
          author_id: string
          created_at: string
          data: Json
          id: number
          step: number
          updated_at: string
        }
        Insert: {
          author_id?: string
          created_at?: string
          data: Json
          id?: number
          step?: number
          updated_at?: string
        }
        Update: {
          author_id?: string
          created_at?: string
          data?: Json
          id?: number
          step?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          ads: number
          avatar: string
          bio: string | null
          created_at: string
          email: string
          id: string
          name: string
          phone: string
          rating: number
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          verified: boolean
        }
        Insert: {
          ads?: number
          avatar?: string
          bio?: string | null
          created_at?: string
          email: string
          id?: string
          name?: string
          phone?: string
          rating?: number
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          verified?: boolean
        }
        Update: {
          ads?: number
          avatar?: string
          bio?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string
          rating?: number
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          verified?: boolean
        }
        Relationships: []
      }
    }
    Views: {
      ads_active_view: {
        Row: {
          author_id: string | null
          closed_reason: Database["public"]["Enums"]["close_reason"] | null
          created_at: string | null
          currency: string | null
          date_end: string | null
          date_start: string | null
          description: string | null
          expire_at: string | null
          id: number | null
          is_booked: boolean | null
          is_closed: boolean | null
          is_expired: boolean | null
          location_from:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          location_to:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          media: string[] | null
          moderation_status:
            | Database["public"]["Enums"]["moderation_status"]
            | null
          parcel: Database["public"]["CompositeTypes"]["parcel_info"] | null
          rewards: string | null
          status: Database["public"]["Enums"]["ad_status"] | null
          title: string | null
          transport: number | null
          type: number | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_id?: string | null
          closed_reason?: Database["public"]["Enums"]["close_reason"] | null
          created_at?: string | null
          currency?: string | null
          date_end?: string | null
          date_start?: string | null
          description?: string | null
          expire_at?: string | null
          id?: number | null
          is_booked?: boolean | null
          is_closed?: boolean | null
          is_expired?: boolean | null
          location_from?:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          location_to?:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          media?: string[] | null
          moderation_status?:
            | Database["public"]["Enums"]["moderation_status"]
            | null
          parcel?: Database["public"]["CompositeTypes"]["parcel_info"] | null
          rewards?: string | null
          status?: Database["public"]["Enums"]["ad_status"] | null
          title?: string | null
          transport?: number | null
          type?: number | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_id?: string | null
          closed_reason?: Database["public"]["Enums"]["close_reason"] | null
          created_at?: string | null
          currency?: string | null
          date_end?: string | null
          date_start?: string | null
          description?: string | null
          expire_at?: string | null
          id?: number | null
          is_booked?: boolean | null
          is_closed?: boolean | null
          is_expired?: boolean | null
          location_from?:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          location_to?:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          media?: string[] | null
          moderation_status?:
            | Database["public"]["Enums"]["moderation_status"]
            | null
          parcel?: Database["public"]["CompositeTypes"]["parcel_info"] | null
          rewards?: string | null
          status?: Database["public"]["Enums"]["ad_status"] | null
          title?: string | null
          transport?: number | null
          type?: number | null
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ads_author_id_fkey1"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_ads_view: {
        Row: {
          author_id: string | null
          closed_reason: Database["public"]["Enums"]["close_reason"] | null
          created_at: string | null
          currency: string | null
          date_end: string | null
          date_start: string | null
          description: string | null
          expire_at: string | null
          id: number | null
          is_booked: boolean | null
          is_closed: boolean | null
          is_expired: boolean | null
          location_from:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          location_to:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          media: string[] | null
          moderation_status:
            | Database["public"]["Enums"]["moderation_status"]
            | null
          parcel: Database["public"]["CompositeTypes"]["parcel_info"] | null
          rewards: string | null
          status: Database["public"]["Enums"]["ad_status"] | null
          title: string | null
          transport: number | null
          type: number | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_id?: string | null
          closed_reason?: Database["public"]["Enums"]["close_reason"] | null
          created_at?: string | null
          currency?: string | null
          date_end?: string | null
          date_start?: string | null
          description?: string | null
          expire_at?: string | null
          id?: number | null
          is_booked?: boolean | null
          is_closed?: boolean | null
          is_expired?: boolean | null
          location_from?:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          location_to?:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          media?: string[] | null
          moderation_status?:
            | Database["public"]["Enums"]["moderation_status"]
            | null
          parcel?: Database["public"]["CompositeTypes"]["parcel_info"] | null
          rewards?: string | null
          status?: Database["public"]["Enums"]["ad_status"] | null
          title?: string | null
          transport?: number | null
          type?: number | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_id?: string | null
          closed_reason?: Database["public"]["Enums"]["close_reason"] | null
          created_at?: string | null
          currency?: string | null
          date_end?: string | null
          date_start?: string | null
          description?: string | null
          expire_at?: string | null
          id?: number | null
          is_booked?: boolean | null
          is_closed?: boolean | null
          is_expired?: boolean | null
          location_from?:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          location_to?:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          media?: string[] | null
          moderation_status?:
            | Database["public"]["Enums"]["moderation_status"]
            | null
          parcel?: Database["public"]["CompositeTypes"]["parcel_info"] | null
          rewards?: string | null
          status?: Database["public"]["Enums"]["ad_status"] | null
          title?: string | null
          transport?: number | null
          type?: number | null
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ads_author_id_fkey1"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      calc_ad_expiration_date: {
        Args: { p_created_at: string; p_date_end: string }
        Returns: string
      }
      close_ad: {
        Args: {
          ad_id: string
          reason: Database["public"]["Enums"]["close_reason"]
        }
        Returns: undefined
      }
      copy_files: { Args: { media_paths: string[] }; Returns: undefined }
      create_ad_from_draft: {
        Args: { draft: Database["public"]["Tables"]["draft_ads"]["Row"] }
        Returns: {
          author_id: string
          closed_reason: Database["public"]["Enums"]["close_reason"] | null
          created_at: string
          currency: string | null
          date_end: string | null
          date_start: string | null
          description: string
          expire_at: string
          id: number
          is_booked: boolean
          is_closed: boolean
          is_expired: boolean
          location_from:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          location_to:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          media: string[]
          moderation_status: Database["public"]["Enums"]["moderation_status"]
          parcel: Database["public"]["CompositeTypes"]["parcel_info"] | null
          rewards: string
          status: Database["public"]["Enums"]["ad_status"]
          title: string
          transport: number | null
          type: number
          updated_at: string
          views: number
        }
        SetofOptions: {
          from: "draft_ads"
          to: "ads"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      delete_draft: { Args: { draft_id: number }; Returns: undefined }
      get_ads_count_by_status: {
        Args: { status_filter: number[]; user_id: string }
        Returns: {
          count: number
          status: number
        }[]
      }
      get_end_of_day: { Args: { p_timestamp: string }; Returns: string }
      get_profile_ads_counts: {
        Args: { p_author_id: string }
        Returns: {
          count: number
          status: string
        }[]
      }
      get_user_draft_ads_count: { Args: { user_id: string }; Returns: number }
      increment_ad_views: { Args: { ad_id: string }; Returns: undefined }
      insert_ad_from_draft: {
        Args: { draft: Database["public"]["Tables"]["draft_ads"]["Row"] }
        Returns: {
          author_id: string
          closed_reason: Database["public"]["Enums"]["close_reason"] | null
          created_at: string
          currency: string | null
          date_end: string | null
          date_start: string | null
          description: string
          expire_at: string
          id: number
          is_booked: boolean
          is_closed: boolean
          is_expired: boolean
          location_from:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          location_to:
            | Database["public"]["CompositeTypes"]["geo_db_city"]
            | null
          media: string[]
          moderation_status: Database["public"]["Enums"]["moderation_status"]
          parcel: Database["public"]["CompositeTypes"]["parcel_info"] | null
          rewards: string
          status: Database["public"]["Enums"]["ad_status"]
          title: string
          transport: number | null
          type: number
          updated_at: string
          views: number
        }
        SetofOptions: {
          from: "draft_ads"
          to: "ads"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      mark_expired_ads: { Args: never; Returns: undefined }
      republish_ad: { Args: { ad_id: string }; Returns: undefined }
      to_geo_db_city: {
        Args: { location: Json }
        Returns: Database["public"]["CompositeTypes"]["geo_db_city"]
        SetofOptions: {
          from: "*"
          to: "geo_db_city"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      to_parcel_info: {
        Args: { parcel: Json }
        Returns: Database["public"]["CompositeTypes"]["parcel_info"]
        SetofOptions: {
          from: "*"
          to: "parcel_info"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      toggle_booking_ad: { Args: { ad_id: string }; Returns: boolean }
    }
    Enums: {
      ad_deactivated_reason:
        | "expired"
        | "deal"
        | "closed_off_app"
        | "closed_other"
        | "rejected"
      ad_status: "moderation" | "active" | "inactive"
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
      ad_status: ["moderation", "active", "inactive"],
      close_reason: ["done", "close_off_app", "close_other"],
      moderation_status: ["pending", "approved", "rejected"],
      user_role: ["user", "admin"],
    },
  },
} as const
