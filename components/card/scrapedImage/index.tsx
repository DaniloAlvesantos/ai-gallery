"use client";

import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";

interface ScrapedImage {
  source: string;
}

export const ScrapedImage = (props: ScrapedImage) => {
  const { source } = props;

  const downloadImage = async () => {
    const img = await fetch(source); // Fetch image for stream data
    const blob = await img.blob(); // convert to a blob
    const url = URL.createObjectURL(blob); // Create a downloadable url
    const a = document.createElement("a");
    a.href = url;
    a.download = "image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card
      isFooterBlurred
      className="border-none break-inside-avoid my-2"
      radius="lg"
    >
      <Image alt="" className="object-cover hover:scale-110" src={source} />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <Button
          className="text-tiny text-white bg-black/20"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          Prompt
        </Button>
        <Button
          className="text-tiny text-white bg-black/20"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
          onPress={downloadImage}
        >
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export const ScrapedImageSleton = () => {
  return (
    <Card
      isFooterBlurred
      className="border-none break-inside-avoid my-2"
      radius="lg"
    >
      <Skeleton className="w-full h-60 rounded-lg" />

      <CardFooter
        className="justify-between before:bg-white/10 border-white/20 border-1 
        overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 
        w-[calc(100%_-_8px)] shadow-small ml-1 z-10"
      >
        <Skeleton className="h-7 w-16 rounded-lg" />
        <Skeleton className="h-7 w-20 rounded-lg" />
      </CardFooter>
    </Card>
  );
};
