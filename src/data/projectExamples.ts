import { quartzExample, facetExample } from './examples'

export const projectExamples: Record<string, { label: string; file: string; code: string }[] | undefined> = {
  quartz: [
    { label: 'app', file: 'src/app.cr', code: quartzExample },
  ],
  facet: [
    { label: 'signup', file: 'src/schemas/signup.cr', code: facetExample },
  ],
  // vault stays undefined: no examples until released
}
