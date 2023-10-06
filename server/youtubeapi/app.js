// Importing ES6 modules
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 8800;
const apiKey = 'AIzaSyAbe49lFzpldWIGvzc9KNLs_wGlbK7foX0';
const regionCode = 'IN'; // Change to your desired region code

app.get('/trending', async (req, res) => {
  try {
    // Make an API request to get trending videos for the specified region
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=${regionCode}&key=${apiKey}`);
    const data = await response.json();

    const trendingVideos = data.items.map(video => {
      const videoTitle = video.snippet.title;
      const videoCategory = video.snippet.categoryId; // Genre/category ID
      const videoKeywords = video.snippet.tags; // Trending keywords/tags
      const thumbnailUrls = video.snippet.thumbnails;

      return {
        title: videoTitle,
        genre: videoCategory,
        keywords: videoKeywords,
        thumnail: thumbnailUrls,
      };
    });

    res.json(trendingVideos);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data from YouTube.' });
  }
});

app.listen(PORT, () => {
  console.log( `Server is running on port ${PORT}`);
});