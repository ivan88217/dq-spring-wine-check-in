import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  imageUrl: string;
  hidden?: boolean;
  onOutsideClick: () => void;
}

export function ImageCard({
  title,
  description,
  imageUrl,
  hidden = false,
  onOutsideClick,
}: ImageCardProps) {
  useEffect(() => {
    if (!hidden) {
      // Disable scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "unset";
    }

    // Cleanup function to enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [hidden]);

  const [url, setUrl] = useState(imageUrl);

  useEffect(() => {
    setUrl(imageUrl);
  }, [imageUrl]);

  return (
    <Card
      className="w-full h-full fixed inset-0 pt-10 backdrop-blur-md bg-opacity-50 bg-gray-900"
      hidden={hidden}
      onClick={onOutsideClick}
    >
      <CardHeader>
        <CardTitle className="text-center text-3xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="items-center flex w-full justify-center">
        <Image src={url} alt="test1" width={300} height={300} />
      </CardContent>
      <CardFooter className="w-full justify-center flex">
        <CardDescription className="text-center text-sm">點擊任意地方關閉</CardDescription>
      </CardFooter>
    </Card>
  );
}
