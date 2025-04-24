/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function PersonaGrid(props: any) {
  const { personas, onStartCall } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2 border-b pb-4">
          <Calendar className="h-5 w-5 text-primary" />
          Available Personas
        </CardTitle>
      </CardHeader>
      <ScrollArea className="max-h-[70vh] overflow-y-auto ">
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {personas.map((persona: any) => (
              <Card
                key={persona.id}
                className=" border border-gray-200 dark:border-gray-800 "
              >
                <CardContent className="p-0">
                  <div className="p-4 flex flex-col items-center text-center pr-2">
                    <Avatar className="h-16 w-16 mb-3">
                      <AvatarImage
                        src={persona.image}
                        alt={persona.name}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {persona.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    {/* <h3 className="font-medium text-lg">{persona.name}</h3> */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <h3 className="font-medium text-lg ">
                            {persona?.name?.length > 50
                              ? persona?.name?.slice(0, 50) + "..."
                              : persona?.name}
                          </h3>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{persona.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    {(persona.designation || persona.companyName) && (
                      <div className="mt-2 text-sm text-muted-foreground max-h-[45px] overflow-y-auto">
                        {persona.designation && persona.companyName ? (
                          <span>
                            {persona.designation} @ {persona.companyName}
                          </span>
                        ) : (
                          <span>
                            {persona.designation || persona.companyName}
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      {/* <span
                        className={`text-xs px-2 py-0.5 ${getDifficultyColor(
                          persona.difficulty
                        )} rounded-full inline-block`}
                      >
                        {persona.difficulty}
                      </span> */}
                      {/* <span
                        className={`text-xs  px-2 py-0.5 rounded-full  ${getColorForText(
                          persona.mood
                        )}`}
                      >
                        {/* {getMoodIcon(persona.mood)}    */}
                      {/* {getFormatedMood(persona.mood)} */}
                      {/* </span> */}
                    </div>
                    {
                      <p className="text-sm text-muted-foreground mt-3 min-h-[100px] max-h-[100px] overflow-y-auto thin-scrollbar pr-2">
                        {persona?.description}
                      </p>
                    }
                  </div>
                  <div className="border-t px-4 py-3 flex justify-center">
                    <Button
                      size="sm"
                      className="w-full cursor-pointer bg-green-600 hover:bg-green-700"
                      onClick={() =>
                        onStartCall(
                          persona.id,
                          persona.name,
                          persona.difficulty,
                          persona.mood,
                          persona.image
                        )
                      }
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Call
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
