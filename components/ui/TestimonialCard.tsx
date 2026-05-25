"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  avatar?: string;
  initial: string;
  gradient: string;
  text: string;
  rating?: number;
  metric?: {
    label: string;
    value: string;
  };
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const { author, role, location, initial, gradient, text, rating = 5, metric } = testimonial;

  return (
    <article
      className={cn(
        "group relative flex w-[340px] shrink-0 flex-col gap-4 rounded-3xl bg-white/[0.04] p-6 ring-1 ring-inset ring-white/10 backdrop-blur-sm transition-all hover:bg-white/[0.07] hover:ring-white/20 md:w-[380px]",
        className
      )}
    >
      {/* Quote mark decoration */}
      <div
        aria-hidden
        className="absolute right-6 top-4 font-display text-6xl font-bold leading-none text-white/[0.03]"
      >
        "
      </div>

      {/* Header: avatar + info */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-display text-lg font-bold text-white shadow-lg",
            gradient
          )}
        >
          {initial}
        </div>

        {/* Author info */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-white truncate">{author}</div>
          <div className="text-sm text-white/50 truncate">
            {role}, {location}
          </div>
        </div>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < rating ? "fill-amber-400 text-amber-400" : "text-white/20"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quote text */}
      <p className="text-[15px] leading-relaxed text-white/75 line-clamp-4">
        {text}
      </p>

      {/* Metric highlight */}
      {metric && (
        <div className="mt-auto flex items-center gap-3 rounded-2xl bg-gradient-to-r from-accent-60/20 to-magenta-60/20 px-4 py-3 ring-1 ring-inset ring-white/10">
          <span className="font-display text-2xl font-bold bg-gradient-to-br from-accent-40 to-magenta-50 bg-clip-text text-transparent">
            {metric.value}
          </span>
          <span className="text-sm text-white/60">{metric.label}</span>
        </div>
      )}
    </article>
  );
}
