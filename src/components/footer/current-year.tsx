"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * The year from the visitor's clock, so a static page never shows a stale
 * year. The server render uses the build year as a fallback.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );
  return <span suppressHydrationWarning>{year}</span>;
}

const BUILD_YEAR = new Date().getFullYear();
