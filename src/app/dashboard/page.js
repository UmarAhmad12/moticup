"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/datePickerWithRange";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "../../components/navbar";

const cardData = [
  {
    title: <BookmarksIcon sx={{ fontSize: "40px" }} />,
    description: "Machines",
    content: "9",
  },
  {
    title: <LocalMallIcon sx={{ fontSize: "40px" }} />,
    description: "Machines",
    content: "9",
  },
  {
    title: <PersonAddIcon sx={{ fontSize: "40px" }} />,
    description: "Machines",
    content: "9",
  },
  {
    title: <DynamicFeedIcon sx={{ fontSize: "40px" }} />,
    description: "Machines",
    content: "9",
  },
  // Add more card data as needed
];

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-[90vh]">
        <div className="flex justify-between items-center p-4">
          <div className="text-black font-bold text-2xl p-2">Dashboard</div>
          <div className="flex gap-1">
            <DatePickerWithRange />
            <Button className="bg-blue-950">Download</Button>
          </div>
        </div>

        <div className="pt-10 mx-4 text-white">
          <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {cardData.map((card, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{card.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
