"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil, UserRound } from "lucide-react";

export interface PersonaCardProps {
  id: string;
  name: string;
  company: string;
  description: string;
  prompt: string;
  image?: string;
  onEdit: (persona: {
    id: string;
    name: string;
    company: string;
    description: string;
    prompt: string;
    image?: string;
  }) => void;
}

export function PersonaCard({
  id,
  name,
  company,
  description,
  prompt,
  image,
  onEdit,
}: PersonaCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>
              <UserRound className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{company}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            onEdit({ id, name, company, description, prompt, image })
          }
        >
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit persona</span>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
