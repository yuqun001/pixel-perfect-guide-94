import { Link } from "@tanstack/react-router";
import { Star, Users, PlayCircle } from "lucide-react";
import type { Course } from "@/lib/dj-data";
import { Bar, Tag } from "./Shell";

export function CourseCard({ course }: { course: Course }) {
  const started = course.progress > 0;
  return (
    <Link
      to="/course/$courseId"
      params={{ courseId: course.id }}
      className="card-surface block p-3.5 transition-transform active:scale-[0.99]"
    >
      <div className="flex items-start gap-2">
        <h3 className="flex-1 text-[15px] font-semibold leading-snug text-foreground">
          {course.title}
        </h3>
        <Tag tone={course.type === "必修" ? "primary" : course.type === "选修" ? "muted" : "warning"}>
          {course.type}
        </Tag>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        {course.teacher} | {course.hospital}
      </p>
      <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-0.5 text-warning-foreground">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          {course.rating}
        </span>
        <span className="flex items-center gap-1">
          <Users className="h-3.5 w-3.5" />
          {course.learners} 人在学
        </span>
        <span>{course.lessons} 课时</span>
      </div>
      {started && (
        <div className="mt-2.5">
          <Bar value={course.progress} />
          <p className="mt-1 text-[11px] text-muted-foreground">已学 {course.progress}%</p>
        </div>
      )}
      <div className="mt-3 flex justify-end">
        <span className="inline-flex items-center gap-1 rounded-full bg-brand px-3.5 py-1.5 text-xs font-medium text-primary-foreground">
          <PlayCircle className="h-4 w-4" />
          {started ? "继续学习" : "立即学习"}
        </span>
      </div>
    </Link>
  );
}
