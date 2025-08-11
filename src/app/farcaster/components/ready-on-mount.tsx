"use client";

import sdk from "@farcaster/frame-sdk";
import { useLayoutEffect } from "react";

export function ReadyOnMount() {
  useLayoutEffect(() => {
    void sdk.actions.ready().catch(() => {
      // no-op; calling ready early should be best-effort
    });
  }, []);
  return null;
}


