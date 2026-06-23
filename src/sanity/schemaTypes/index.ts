import { type SchemaTypeDefinition } from 'sanity'
import { caseType } from './case'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [caseType],
}