import { Source } from '../../domain/entities/source';

const mockNewsData = [
  {
    title: "React 19 is here!",
    summary: "The new version of React comes with a lot of new features, including the compiler and server components.",
    source: "https://twitter.com/reactjs"
  },
  {
    title: "YC's new batch of startups",
    summary: "Y Combinator just announced its latest batch of startups. Here are the ones to watch.",
    source: "https://news.ycombinator.com"
  },
  {
    title: "AI is taking over the world",
    summary: "A new study shows that AI is becoming more and more integrated into our daily lives.",
    source: "https://example.com/news"
  }
];

// A function that simulates fetching news from a backend API
export const fetchNews = (sources: Source[], language: string): Promise<string> => {
  return new Promise((resolve) => {
    console.log(`Fetching news for sources:`, sources, `and language: ${language}`);

    // Simulate a network delay
    setTimeout(() => {
      // In a real app, you would parse and combine data from sources.
      // Here, we just return a formatted string of our mock data.
      const formattedResult = mockNewsData
        .map(item => `### ${item.title}\n\n**Source:** ${item.source}\n\n${item.summary}`)
        .join('\n\n---\n\n');

      resolve(formattedResult);
    }, 2000); // 2-second delay
  });
};
