import { createFileRoute } from '@tanstack/react-router';
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-element-gap items-start w-full">
        <section className="md:col-span-12 space-y-gutter w-full">
          <div className="border-strict bg-primary text-on-primary p-container-padding">
            <h3 className="font-headline-md text-headline-md mb-2">Data Integrity</h3>
            <p className="font-body-sm text-body-sm opacity-80 mb-8">
              All data is stored locally. Use these tools to migrate or backup your ledger. Importing data will overwrite your existing data.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full bg-surface-container-lowest text-primary border-strict py-4 px-6 flex items-center justify-between hover:bg-primary hover:text-on-primary transition-none group disabled:opacity-50"
              >
                <span className="font-headline-md text-headline-md uppercase tracking-widest">
                  {isExporting ? 'EXPORTING...' : 'EXPORT JSON'}
                </span>
                <span className="material-symbols-outlined">download</span>
              </button>

              <button
                onClick={handleImportClick}
                disabled={isImporting}
                className="w-full bg-surface-container-lowest text-primary border-strict py-4 px-6 flex items-center justify-between hover:bg-primary hover:text-on-primary transition-none group disabled:opacity-50"
              >
                <span className="font-headline-md text-headline-md uppercase tracking-widest">
                  {isImporting ? 'IMPORTING...' : 'IMPORT JSON'}
                </span>
                <span className="material-symbols-outlined">upload</span>
              </button>

              <input
                type="file"
                accept=".json"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
