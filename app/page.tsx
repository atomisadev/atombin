"use client";

import React, { useState } from "react";
import { CodeBox } from "@/components/codebox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const [code, setCode] = useState(
    'let message = "atombin";\nconsole.log(message);'
  );
  const router = useRouter();

  const createNewDocument = async () => {
    const res = await fetch("/api/files", {
      method: "POST",
      body: JSON.stringify({ content: code }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { slug } = await res.json();
    router.push(`/files/${slug}`);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <div>
      <div className="absolute right-0 z-10">
        <Card>
          <CardHeader>
            <CardTitle>atombin</CardTitle>
            <CardDescription>
              Create cool code snippets to share with your developer friends
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center space-y-3">
            <Button
              className="w-full"
              variant="secondary"
              onClick={createNewDocument}
            >
              New
            </Button>

            <Button className="w-full" variant="secondary">
              GitHub
            </Button>
          </CardContent>
        </Card>
      </div>

      <CodeBox
        givenCode={'let message = "atombin";\nconsole.log(message);'}
        onCodeChange={handleCodeChange}
      />
    </div>
  );
}
