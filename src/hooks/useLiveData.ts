import { useContext } from 'react';
import { LiveDataContext } from '../context/LiveDataContextDefinition';

export function useLiveData() {
  const context = useContext(LiveDataContext);
  if (!context) {
    throw new Error('useLiveData must be used within a LiveDataProvider');
  }
  return context;
}
