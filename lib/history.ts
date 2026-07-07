export interface ConversionHistoryItem {
  id: string;
  fileName: string;
  toolName: string;
  timestamp: string;
}

/**
 * Add an item to the local conversion history log in localStorage.
 */
export function addHistoryItem(fileName: string, toolName: string) {
  if (typeof window === 'undefined') return;
  try {
    const saved = localStorage.getItem('atc_history');
    const history: ConversionHistoryItem[] = saved ? JSON.parse(saved) : [];
    
    const newItem: ConversionHistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      fileName,
      toolName,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString(),
    };
    
    const updated = [newItem, ...history].slice(0, 10); // Limit to last 10 conversions
    localStorage.setItem('atc_history', JSON.stringify(updated));
    
    // Dispatch event to notify other components (like home page list) to update
    window.dispatchEvent(new Event('atc_history_update'));
  } catch (e) {
    console.error('Error saving conversion history:', e);
  }
}
