import {create} from 'zustand';
import { Source } from '../../domain/entities/source';
import { fetchNews as fetchNewsApi } from '../../shared/api/newsApi';

interface NewsState {
  sources: Source[];
  language: string;
  isLoading: boolean;
  result: string;
  addSource: (url: string) => void;
  deleteSource: (id: number) => void;
  setLanguage: (language: string) => void;
  fetchNews: () => Promise<void>;
}

export const useNewsStore = create<NewsState>((set, get) => ({
  sources: [
    { id: 1, url: 'https://twitter.com/reactjs' },
    { id: 2, url: 'https://news.ycombinator.com' },
  ],
  language: 'en',
  isLoading: false,
  result: '',
  addSource: (url) => {
    const newSource: Source = {
      id: Date.now(),
      url,
    };
    set((state) => ({ sources: [...state.sources, newSource] }));
  },
  deleteSource: (id) => {
    set((state) => ({
      sources: state.sources.filter((source) => source.id !== id),
    }));
  },
  setLanguage: (language) => set({ language }),
  fetchNews: async () => {
    const { sources, language } = get();
    set({ isLoading: true, result: '' });
    try {
      const newsResult = await fetchNewsApi(sources, language);
      set({ result: newsResult, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch news:", error);
      set({ result: "Failed to load news. Please try again.", isLoading: false });
    }
  },
}));
