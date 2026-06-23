'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

// Импортируем твои схемы
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

// Явно прописываем переменные, чтобы избежать ошибки "Missing environment variable"
const projectId = 'slpw8esr'
const dataset = 'production'
const apiVersion = '2026-06-23'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})