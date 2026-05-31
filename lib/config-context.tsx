"use client"

import { createContext, useContext } from "react"
import { weddingConfig } from "@/lib/config"
import type { WeddingConfig } from "@/lib/get-config"

const ConfigContext = createContext<WeddingConfig>(weddingConfig as unknown as WeddingConfig)

export function ConfigProvider({
  children,
  config,
}: {
  children: React.ReactNode
  config: WeddingConfig
}) {
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}

export function useConfig(): WeddingConfig {
  return useContext(ConfigContext)
}
