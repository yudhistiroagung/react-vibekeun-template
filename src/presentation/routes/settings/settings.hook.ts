import { useRef } from 'react';
import { toast } from 'sonner';
import { useExportData } from '../../hooks/use-export-data';
import { useImportData } from '../../hooks/use-import-data';

export function useSettings() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const exportDataMutation = useExportData();
  const importDataMutation = useImportData();

  const handleExport = async () => {
    try {
      const blob = await exportDataMutation.mutateAsync();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `vibekeun-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success('Data exported successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to export data');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await importDataMutation.mutateAsync(file);
      toast.success('Data imported successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to import data');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return {
    handleExport,
    handleImportClick,
    handleFileChange,
    fileInputRef,
    isExporting: exportDataMutation.isPending,
    isImporting: importDataMutation.isPending,
  };
}
