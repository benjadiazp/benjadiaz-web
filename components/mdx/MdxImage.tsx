import Image from "next/image";

interface MdxImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export default function MdxImage({
  src,
  alt,
  caption,
  width = 800,
  height = 450,
}: MdxImageProps) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full rounded-lg"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
