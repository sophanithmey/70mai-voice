import { useCallback, useEffect, useState } from 'react';
import { ModelService } from '../domain/services/model-service';

export function useSelectedModel() {
  const [selectedModelId, setSelectedModelId] = useState<string>(() => ModelService.loadSelectedModelId());

  const selectedModel = ModelService.getModelById(selectedModelId) ?? ModelService.getDefaultModel();
  const allModels = ModelService.getAllModels();

  const changeModel = useCallback((modelId: string) => {
    const found = ModelService.getModelById(modelId);
    if (found) {
      setSelectedModelId(found.id);
      ModelService.saveSelectedModelId(found.id);
    }
  }, []);

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === '70mai_selected_model_id' && e.newValue) {
        if (ModelService.getModelById(e.newValue)) {
          setSelectedModelId(e.newValue);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return {
    selectedModel,
    selectedModelId,
    allModels,
    changeModel
  };
}
