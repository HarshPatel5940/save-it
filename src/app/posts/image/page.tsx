import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Card from "@/components/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

export default async function home() {
  return (
    <>
      <Navbar {...{ text: "Home" }} />
      <div className="flex justify-center items-center gap-2 md:gap-5">
        <Input placeholder="Search" className="max-w-40 md:max-w-80" />

        <Link
          className={buttonVariants({ variant: "ghost" })}
          href={"/posts/text"}
        >
          Text
        </Link>

        <Link
          className={buttonVariants({ variant: "ghost" })}
          href={"/posts/image"}
        >
          Image
        </Link>

        <Separator orientation="vertical" className="h-6" />
        <Button variant="ghost"> Prev </Button>
        <Button variant="ghost"> Next </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-5">
        {await getData()}
      </div>

      <Footer />
    </>
  );
}

async function getData(
  start: number = 0,
  end: number = 25
): Promise<JSX.Element[]> {
  let data: Array<JSX.Element> = [];

  data = await getImageData();

  return data.slice(start, end);
}

async function getImageData() {
  let cardList: Array<JSX.Element> = [];
  if (cardList.length > 0) return cardList;
  const res = await fetch("https://jsonplaceholder.typicode.com/photos");
  const data = await res.json();

  for (const post of data) {
    if (cardList.length > 75) {
      break;
    }
    cardList.push(
      <Card
        {...{
          title: post.title,
          albumId: post.albumId,
          id: post.id,
          url: post.url,
          thumbnailUrl: post.thumbnailUrl,
        }}
      />
    );
  }

  return cardList;
}