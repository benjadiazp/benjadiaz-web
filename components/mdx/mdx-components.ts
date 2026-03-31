import type { MDXComponents } from "mdx/types";
import Video from "./Video";
import VideoPreview from "./VideoPreview";
import MdxImage from "./MdxImage";
import Callout from "./Callout";
import LinkCard from "./LinkCard";
import Spoiler from "./Spoiler";

export const mdxComponents: MDXComponents = {
  Video,
  VideoPreview,
  Image: MdxImage,
  Callout,
  LinkCard,
  Spoiler,
};
