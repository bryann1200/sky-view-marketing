import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  adminList,
  adminUpload,
  adminDelete,
  type SiteMediaItem,
} from "@/lib/site-media";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

const SLOTS: { slot: string; label: string; kind: "image" | "video" }[] = [
  { slot: "hero-video", label: "Hero background video", kind: "video" },
  { slot: "hero-poster", label: "Hero poster image (fallback)", kind: "image" },
  { slot: "showcase-1", label: "Showcase — Marina Bay Skyline", kind: "image" },
  { slot: "showcase-2", label: "Showcase — Sentosa Villa", kind: "image" },
  { slot: "showcase-3", label: "Showcase — Bukit Timah Estate", kind: "image" },
  { slot: "showcase-4", label: "Showcase — Orchard Penthouse", kind: "image" },
];

function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState<Record<string, SiteMediaItem>>({});
  const [busySlot, setBusySlot] = useState<string | null>(null);

  async function tryUnlock(pw: string) {
    setError("");
    try {
      const { items: rows } = await adminList(pw);
      const bySlot: Record<string, SiteMediaItem> = {};
      for (const row of rows) bySlot[row.slot] = row;
      setItems(bySlot);
      setUnlocked(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Wrong password");
    }
  }

  async function handleFile(slot: string, kind: "image" | "video", file: File) {
    setBusySlot(slot);
    setError("");
    try {
      const { url } = await adminUpload({ password, slot, file, kind });
      setItems((prev) => ({
        ...prev,
        [slot]: { slot, url, kind, title: null, location: null, updated_at: new Date().toISOString() },
      }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusySlot(null);
    }
  }

  async function handleReset(slot: string) {
    setBusySlot(slot);
    setError("");
    try {
      await adminDelete(password, slot);
      setItems((prev) => {
        const next = { ...prev };
        delete next[slot];
        return next;
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Reset failed");
    } finally {
      setBusySlot(null);
    }
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfbfd] px-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            tryUnlock(password);
          }}
          className="w-full max-w-xs flex flex-col gap-4"
        >
          <h1 className="text-xl font-semibold text-center">Vantage Aerial — Admin</h1>
          <input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border rounded-lg px-4 py-2 text-center"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="bg-[#FF4B26] text-white rounded-full px-4 py-2 font-medium"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbfd] px-6 py-12 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-1">Media</h1>
      <p className="text-sm text-neutral-500 mb-8">
        Swap photos and video here. Changes go live on the site immediately —
        visitors can only view, never upload.
      </p>
      <div className="flex flex-col gap-6">
        {SLOTS.map(({ slot, label, kind }) => {
          const current = items[slot];
          return (
            <div key={slot} className="border rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{label}</span>
                {busySlot === slot && <span className="text-xs text-neutral-400">Working…</span>}
              </div>
              {current ? (
                kind === "video" ? (
                  <video src={current.url} className="w-full rounded-lg" controls />
                ) : (
                  <img src={current.url} className="w-full rounded-lg" alt={label} />
                )
              ) : (
                <p className="text-xs text-neutral-400">Using default site image — no override yet.</p>
              )}
              <div className="flex gap-3 items-center">
                <input
                  type="file"
                  accept={kind === "video" ? "video/*" : "image/*"}
                  disabled={busySlot === slot}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFile(slot, kind, file);
                    e.target.value = "";
                  }}
                  className="text-sm"
                />
                {current && (
                  <button
                    onClick={() => handleReset(slot)}
                    disabled={busySlot === slot}
                    className="text-xs text-neutral-500 underline"
                  >
                    Reset to default
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
}
