import { NextResponse } from "next/server";

const weekDays = [
  "Domingo",
  "Lunes",
  "Martes",
  "Mi\u00e9rcoles",
  "Jueves",
  "Viernes",
  "S\u00e1bado"
];

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const weekday = new Intl.DateTimeFormat("es-MX", {
    timeZone: "America/Mexico_City",
    weekday: "long"
  }).format(new Date());
  const dayIndex = getWeekdayIndex(weekday);
  const dayLabel = weekDays[dayIndex] ?? weekDays[0];

  return NextResponse.json(
    {
      dayIndex,
      dayLabel,
      label: dayLabel
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
        Pragma: "no-cache",
        Expires: "0"
      }
    }
  );
}

function getWeekdayIndex(weekday: string) {
  const normalized = weekday
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const weekdayIndexes: Record<string, number> = {
    domingo: 0,
    lunes: 1,
    martes: 2,
    miercoles: 3,
    jueves: 4,
    viernes: 5,
    sabado: 6
  };

  return weekdayIndexes[normalized] ?? 0;
}
