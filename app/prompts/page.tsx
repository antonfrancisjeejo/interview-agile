"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Edit2, Search } from "lucide-react";
// import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Persona {
  id: string;
  name: string;
  company: string;
  description: string;
  prompt: string;
  image: string | null;
  created_at: string;
}

export default function PromptsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [personaToDelete, setPersonaToDelete] = useState<string | null>(null);
  const [newPersona, setNewPersona] = useState({
    name: "",
    company: "",
    description: "",
    prompt: "",
    image: null as string | null,
  });
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      setLoading(true);

      // Get the current user's session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast({
          title: "Error",
          description: "Please log in to view your personas",
          variant: "destructive",
        });
        return;
      }

      // Fetch all personas for the current user
      const { data, error } = await supabase
        .from("ai_personas")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setPersonas(data || []);
    } catch (error) {
      console.error("Error fetching personas:", error);
      toast({
        title: "Error",
        description: "Failed to load personas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePersona = async () => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to create personas",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("ai_personas").insert([
        {
          ...newPersona,
          user_id: user.id,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Persona created successfully",
      });

      setNewPersona({
        name: "",
        company: "",
        description: "",
        prompt: "",
        image: null,
      });
      setIsCreating(false);
      fetchPersonas();
    } catch (error) {
      console.error("Error creating persona:", error);
      toast({
        title: "Error",
        description: "Failed to create persona. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePersona = async (id: string) => {
    try {
      const { error } = await supabase
        .from("ai_personas")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Persona deleted successfully",
      });

      setPersonaToDelete(null);
      fetchPersonas();
    } catch (error) {
      console.error("Error deleting persona:", error);
      toast({
        title: "Error",
        description: "Failed to delete persona. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredPersonas = personas.filter(
    (persona) =>
      persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      persona.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            AI Interview Personas
          </h1>
          <Button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add New Persona
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search personas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        {(isCreating || isEditing) && (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                {isEditing ? "Edit Persona" : "Add New Persona"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={newPersona.name}
                  onChange={(e) =>
                    setNewPersona({ ...newPersona, name: e.target.value })
                  }
                  placeholder="Enter persona name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Input
                  value={newPersona.company}
                  onChange={(e) =>
                    setNewPersona({ ...newPersona, company: e.target.value })
                  }
                  placeholder="Enter company name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={newPersona.description}
                  onChange={(e) =>
                    setNewPersona({
                      ...newPersona,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter persona description"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Prompt</label>
                <Textarea
                  value={newPersona.prompt}
                  onChange={(e) =>
                    setNewPersona({
                      ...newPersona,
                      prompt: e.target.value,
                    })
                  }
                  placeholder="Enter AI prompt for this persona"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setIsEditing(null);
                    setNewPersona({
                      name: "",
                      company: "",
                      description: "",
                      prompt: "",
                      image: null,
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreatePersona}
                  disabled={
                    !newPersona.name ||
                    !newPersona.description ||
                    !newPersona.prompt
                  }
                >
                  {isEditing ? "Update Persona" : "Add Persona"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4 sm:gap-6">
          {filteredPersonas.map((persona) => (
            <Card key={persona.id} className="w-full">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg sm:text-xl">
                      {persona.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500 mt-1">
                      {persona.company}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsEditing(persona.id);
                        setNewPersona({
                          name: persona.name,
                          company: persona.company,
                          description: persona.description,
                          prompt: persona.prompt,
                          image: persona.image,
                        });
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPersonaToDelete(persona.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{persona.description}</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium mb-2">
                    AI Prompt:
                  </p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {persona.prompt}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPersonas.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {searchQuery
                ? "No personas match your search criteria"
                : "No personas added yet"}
            </p>
          </div>
        )}
      </div>

      <AlertDialog
        open={!!personaToDelete}
        onOpenChange={() => setPersonaToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              persona.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                personaToDelete && handleDeletePersona(personaToDelete)
              }
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
