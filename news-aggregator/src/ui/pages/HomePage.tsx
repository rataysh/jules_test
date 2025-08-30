import React from 'react';
import { useNewsStore } from '../../app/stores/useNewsStore';
import { SourceForm } from '../components/molecules/SourceForm';
import { SourceList } from '../components/organisms/SourceList';
import { LanguageSelector } from '../components/molecules/LanguageSelector';
import { ResultDisplay } from '../components/organisms/ResultDisplay';
import { LoadingAnimation } from '../components/atoms/LoadingAnimation';
import { Button } from '../components/atoms/Button';

export function HomePage() {
  const {
    sources,
    language,
    isLoading,
    result,
    addSource,
    deleteSource,
    setLanguage,
    fetchNews,
  } = useNewsStore();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <main className="max-w-4xl mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center mb-6">News Aggregator</h1>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Add a new source</h2>
              <SourceForm onAdd={addSource} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Sources</h2>
              <SourceList sources={sources} onDelete={deleteSource} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Language</h2>
              <LanguageSelector language={language} onLanguageChange={setLanguage} />
            </div>
            <div className="mt-2">
              <Button onClick={fetchNews} disabled={isLoading} className="w-full text-lg py-3">
                Generate News
              </Button>
            </div>
            <div>
              {isLoading ? <LoadingAnimation /> : <ResultDisplay result={result} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
