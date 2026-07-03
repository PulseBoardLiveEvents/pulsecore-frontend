import { Button } from '../../../components/common/Button';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  scanMode: boolean;
  onToggleScanMode: () => void;
}

export function SearchBar({ query, onQueryChange, scanMode, onToggleScanMode }: SearchBarProps) {
  return (
    <div className={styles.row}>
      <div className={styles.inputWrap}>
        <span className={styles.icon} aria-hidden="true">
          {scanMode ? '▤' : '⌕'}
        </span>
        <input
          type="text"
          className={styles.input}
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={scanMode ? 'Scan a badge or enter ticket ID…' : 'Search by name, email, or ticket ID…'}
          autoFocus={scanMode}
        />
      </div>
      <Button variant={scanMode ? 'primary' : 'secondary'} onClick={onToggleScanMode}>
        {scanMode ? 'Scanning mode on' : 'Scan badge'}
      </Button>
    </div>
  );
}
