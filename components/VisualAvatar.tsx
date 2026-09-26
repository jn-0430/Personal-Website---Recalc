import { cn } from "@/lib/utils";

type VisualAvatarProps = {
  initials: string;
  className?: string;
};

export function VisualAvatar({ initials, className }: VisualAvatarProps) {
  return (
    <div
      className={cn(
        "flex aspect-square items-center justify-center rounded-full border border-white/20 bg-paper p-0.5 shadow-outline",
        className,
      )}
    >
      <div className="brand-display flex h-full w-full items-center justify-center rounded-full bg-navy text-xl text-paper">
        {initials}
      </div>
    </div>
  );
}
