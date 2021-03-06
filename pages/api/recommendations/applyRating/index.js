import { applyRecommendationRating } from 'server/recommendations/recommendations';

const getCollectionResults = async (req, res) => {
  if (req.method !== 'POST') return res.status(400).json(res.status);

  const { id, rating } = req.body;
  const result = await applyRecommendationRating(id, rating);

  return result ? res.status(200).json(result) : res.status(404).json([]);
};

export default getCollectionResults;
