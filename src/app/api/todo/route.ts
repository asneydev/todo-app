import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    todos: [
      {
        id: 1,
        title: "un title",
        description: "una descripcion un poco larga",
        done: false,
        priority: "low",
      },
      {
        id: 2,
        title: "algo mas",
        description: "una descripcion un poco larga",
        done: true,
        priority: "medium",
      },
    ],
  });
}
