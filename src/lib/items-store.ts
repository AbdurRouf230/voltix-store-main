"use client";

import { useSyncExternalStore } from "react";
import { SEED_ITEMS, type Item } from "@/data/items";

/**
 * A tiny localStorage-backed store for products.
 * The demo catalogue is seeded on first visit; added/deleted items persist in the browser.
 */
const STORAGE_KEY = "voltix:items:v1";

let cache: Item[] | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function read(): Item[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as Item[]) : SEED_ITEMS;
    if (!raw) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ITEMS));
  } catch {
    cache = SEED_ITEMS;
  }
  return cache;
}

function write(items: Item[]) {
  cache = items;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage may be full or blocked; the in-memory cache still works for this session.
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Keep multiple tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getServerSnapshot = () => SEED_ITEMS;

/** All products (seed + user-added), reactive across the whole app. */
export function useItems(): Item[] {
  return useSyncExternalStore(subscribe, read, getServerSnapshot);
}

const noopSubscribe = () => () => {};

/** False during SSR / first hydration render, true once running in the browser. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function addItem(item: Item) {
  write([item, ...read()]);
}

export function deleteItem(id: string) {
  write(read().filter((item) => item.id !== id));
}

export function resetItems() {
  write(SEED_ITEMS);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
