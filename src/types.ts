import type { IconName } from './components/ui/Icon.tsx';

/** Avatar colors. Each maps to a --tone-* variable in global.css. */
export type Tone = 'teal' | 'blue' | 'purple' | 'amber' | 'rose';

/** One tab in the floating nav. */
export interface NavItem {
  label: string;
  icon: IconName;
  /** Section id the tab scrolls to. */
  target: string;
  /** Section ids that light up this tab. */
  sections: string[];
}
