import type { AvatarTint } from '../components/common/Avatar';

const TINT_ROTATION: AvatarTint[] = ['primary', 'success', 'warning', 'vip'];

/** Deterministically picks a tint from a stable key (e.g. attendee id) so avatars don't reshuffle on re-render. */
export function tintFromKey(key: string): AvatarTint {
  const sum = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return TINT_ROTATION[sum % TINT_ROTATION.length];
}
