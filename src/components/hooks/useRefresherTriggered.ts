import { useState, useCallback } from 'react';

export function useRefresherTriggered(
  onRefresherRefresh: () => Promise<boolean>,
) {
  const [refresherTriggered, setRefresherTriggered] = useState<boolean>(false);
  const handleRefresherTriggered = useCallback(async () => {
    await onRefresherRefresh();
    setRefresherTriggered(false);
  }, [onRefresherRefresh, setRefresherTriggered]);
  return {
    refresherTriggered,
    handleRefresherTriggered,
  };
}
