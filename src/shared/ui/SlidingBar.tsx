"use client";

import { TabContent } from "@/types/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface IProps {
  leftContent: TabContent;
  rightContent: TabContent;
}
const SlidingBar = ({ leftContent, rightContent }: IProps) => {
  const pathname = usePathname();
  const isLeft = pathname.startsWith(leftContent.path);
  return (
    <div className="relative flex border-b">
      <Link href={leftContent.path} className="flex-1 text-center py-2">
        {leftContent.text}
      </Link>
      <Link href={rightContent.path} className="flex-1 text-center py-2">
        {rightContent.text}
      </Link>
      <div
        className="absolute bottom-0 h-0.5 w-1/2 bg-black transition-transform duration-300"
        style={{ transform: isLeft ? "translateX(0%)" : "translateX(100%)" }}
      />
    </div>
  );
};

export default SlidingBar;
