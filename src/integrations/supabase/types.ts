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
      ai_personas: {
        Row: {
          company: string
          created_at: string
          description: string
          id: string
          image: string | null
          name: string
          prompt: string
          updated_at: string
          user_id: string
        }
        Insert: {
          company: string
          created_at?: string
          description: string
          id?: string
          image?: string | null
          name: string
          prompt: string
          updated_at?: string
          user_id: string
        }
        Update: {
          company?: string
          created_at?: string
          description?: string
          id?: string
          image?: string | null
          name?: string
          prompt?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      completed_interviews: {
        Row: {
          communication_score: number | null
          company: string
          conversation_transcript: Json[] | null
          created_at: string | null
          criteria_met: string | null
          criteria_missing: string | null
          date: string | null
          duration: string | null
          eligibility: boolean | null
          eligibility_reason: string | null
          id: string
          overall_score: number | null
          position: string
          questions_answered: number | null
          recording_url: string | null
          status: string | null
          technical_score: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          communication_score?: number | null
          company: string
          conversation_transcript?: Json[] | null
          created_at?: string | null
          criteria_met?: string | null
          criteria_missing?: string | null
          date?: string | null
          duration?: string | null
          eligibility?: boolean | null
          eligibility_reason?: string | null
          id?: string
          overall_score?: number | null
          position: string
          questions_answered?: number | null
          recording_url?: string | null
          status?: string | null
          technical_score?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          communication_score?: number | null
          company?: string
          conversation_transcript?: Json[] | null
          created_at?: string | null
          criteria_met?: string | null
          criteria_missing?: string | null
          date?: string | null
          duration?: string | null
          eligibility?: boolean | null
          eligibility_reason?: string | null
          id?: string
          overall_score?: number | null
          position?: string
          questions_answered?: number | null
          recording_url?: string | null
          status?: string | null
          technical_score?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_user_id"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_questions: {
        Row: {
          created_at: string | null
          id: string
          question: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          question: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          question?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      interviews: {
        Row: {
          communication_score: number | null
          company: string | null
          conversation_transcript: Json[] | null
          created_at: string | null
          date: string | null
          duration: string | null
          id: string
          job_description: string | null
          overall_score: number | null
          persona_id: string | null
          questions: string | null
          questions_answered: number | null
          recording_url: string | null
          resume_url: string | null
          status: string | null
          technical_score: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          communication_score?: number | null
          company?: string | null
          conversation_transcript?: Json[] | null
          created_at?: string | null
          date?: string | null
          duration?: string | null
          id?: string
          job_description?: string | null
          overall_score?: number | null
          persona_id?: string | null
          questions?: string | null
          questions_answered?: number | null
          recording_url?: string | null
          resume_url?: string | null
          status?: string | null
          technical_score?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          communication_score?: number | null
          company?: string | null
          conversation_transcript?: Json[] | null
          created_at?: string | null
          date?: string | null
          duration?: string | null
          id?: string
          job_description?: string | null
          overall_score?: number | null
          persona_id?: string | null
          questions?: string | null
          questions_answered?: number | null
          recording_url?: string | null
          resume_url?: string | null
          status?: string | null
          technical_score?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_persona"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "ai_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "ai_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_resumes: {
        Row: {
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id: string
          last_modified: string
          uploaded_at: string
          user_id: string
        }
        Insert: {
          file_name: string
          file_path: string
          file_size: number
          file_type: string
          id?: string
          last_modified: string
          uploaded_at?: string
          user_id: string
        }
        Update: {
          file_name?: string
          file_path?: string
          file_size?: number
          file_type?: string
          id?: string
          last_modified?: string
          uploaded_at?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
