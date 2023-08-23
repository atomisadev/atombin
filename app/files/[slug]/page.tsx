"use client";

import { CodeBox } from "@/components/codebox";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type RouteParams = {
  slug: string;
};

export async function generateStaticParams() {
  const data = await fetch("/api/files").then((res) => res.json());

  const paths = data.allSlugs.map((file: { slug: string }) => ({
    params: { slug: file.slug },
  }));

  return { paths, fallback: false };
}

export default function File({ params }: { params: RouteParams }) {
  const router = useRouter();
  const slug = params.slug;
  const [code, setCode] = useState("");

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

  useEffect(() => {
    fetch(`/api/files/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        setCode(data.content);
      });
  }, [slug]);

  console.log(code);

  return (
    <>
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

        <CodeBox key={code} givenCode={code} />
      </div>
    </>
  );
}
