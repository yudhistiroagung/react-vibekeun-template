import { createFileRoute } from '@tanstack/react-router';
import { Download, Upload } from 'lucide-react';
import { Button } from '@/presentation/components/ui/button';
import { useSettings } from './settings.hook';

export const Route = createFileRoute('/settings/')({
  component: SettingsPage,
});

function SettingsPage() {
  const {
    handleExport,
    handleImportClick,
    handleFileChange,
    fileInputRef,
    isExporting,
    isImporting,
  } = useSettings();

  return (
    <div className="flex flex-col gap-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Settings
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your data and application preferences.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Data Synchronization
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            You can export your data (profiles, goals, and tasks) to a file to
            keep a backup or sync it to another device. Importing data will
            overwrite your existing data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>

            <Button
              variant="outline"
              onClick={handleImportClick}
              disabled={isImporting}
              className="flex items-center gap-2"
            >
              <Upload size={16} />
              {isImporting ? 'Importing...' : 'Import Data'}
            </Button>

            <input
              type="file"
              accept=".json"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
