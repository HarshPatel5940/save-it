import Image from "next/image";
import Link from "next/link";

interface TextCardProps {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface ImageCardProps {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export default function Card(props: Partial<TextCardProps & ImageCardProps>) {
  return (
    <div
      key={props.id}
      className="rounded-xl overflow-hidden border dark:border-gray-800"
    >
      {props.thumbnailUrl && handleImage(props as ImageCardProps)}
      {props.body && handleText(props as TextCardProps)}
    </div>
  );
}

function handleImage({
  id,
  albumId,
  title,
  url,
  thumbnailUrl,
}: ImageCardProps) {
  if (!thumbnailUrl) {
    return null;
  }
  return (
    <div className="aspect-[16/9] w-full overflow-hidden">
      <div className="p-4 flex-1 grid gap-2">
        <h2 className="text-lg font-bold leading-none">{title}</h2>
        <Image
          alt={title}
          about={id.toString() + "-" + albumId.toString()}
          className="flex flex-auto pb-2 object-cover "
          height={225}
          src={thumbnailUrl}
          priority
          width={400}
        />
      </div>
    </div>
  );
}

function handleText({ userId, id, title, body }: TextCardProps) {
  if (!body) {
    return null;
  }

  return (
    <div className="p-4 flex-1 grid gap-2">
      <h2 className="text-lg font-bold leading-none">{title}</h2>
      <p className="text-sm text-muted-foreground dark:text-muted-foreground-contrast">
        {body}
        {/* <span className="font-medium ml-1">test</span> */}
      </p>
    </div>
  );
}
