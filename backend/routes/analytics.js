import express from 'express';
import Visit from '../models/Visit.js';

const router = express.Router();

// Endpoint to log visits
router.post('/track', async (req, res) => {
  try {
    const { timestamp } = req.body;
    const visit = new Visit({ timestamp });
    await visit.save();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error tracking visit' });
  }
});

// Endpoint to fetch analytics data
router.get('/visits', async (req, res) => {
  try {
    const visits = await Visit.aggregate([
      { 
        $group: { 
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } }, 
          count: { $sum: 1 } 
        } 
      },
      { $sort: { _id: 1 } }, // Sorting the results in ascending order by date
    ]);
    res.status(200).json({ success: true, data: visits });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching analytics data' });
  }
});



export default router; // Use export default for ES module export
