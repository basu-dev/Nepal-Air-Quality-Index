"use client";
import React from "react";
import { TAirQuality } from "../types/aqi";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { bgColorMap, getBgColor, getTextColor } from "../config";

interface IProps {
  item: TAirQuality;
}

export default function SummaryTile({ item }: IProps): React.JSX.Element {
  const searchParams = useSearchParams();
  const selectedUid = parseInt(searchParams.get("station")!);
  return (
    <Link
      href={`?station=${item.uid}`}
      key={item.uid}
      className={`flex px-2 rounded justify-between w-full gap-2 pb-1 last:pb-0 pt-1  last:border-none ${
        selectedUid == item.uid
          ? getBgColor(Number(item.aqi)) + " text-white"
          : "hover:bg-gray-100 border-b border-gray-200 "
      }`}
    >
      <div className="text-sm">{item.station.name}</div>
      <b
        className={`${
          selectedUid == item.uid
            ? "text-white"
            : getTextColor(Number(item.aqi))
        }`}
      >
        {item.aqi}
      </b>
    </Link>
  );
}
