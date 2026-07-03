import type { AttendeeFilter } from '../../../types';
import styles from './FilterChips.module.css';

const FILTER_OPTIONS: Array<{ value: AttendeeFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'registered', label: 'Registered' },
  { value: 'checked_in', label: 'Checked in' },
  { value: 'vip', label: 'VIP' },
];

interface FilterChipsProps {
  active: AttendeeFilter;
  onChange: (filter: AttendeeFilter) => void;
}

export function FilterChips({ active, onChange }: FilterChipsProps) {
  return (
    <div className={styles.row}>
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`${styles.chip} ${active === option.value ? styles.active : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
