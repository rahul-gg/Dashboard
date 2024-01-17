import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import * as dotenv from 'dotenv'


dotenv.config();
const app = express();
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // Start your Express server or perform other setup tasks
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});


app.get('/', async (req, res) => {
  try {
    const dataCursor = await mongoose.connection.db.collection('insights').find({});
    const data = await dataCursor.toArray();
    console.log(data);
    const sectorAggregationPipeline = [
      {
        $match: {
          sector: { $nin:['','Energy'] }, 
        },
      },
      {
        $group: {
          _id: '$sector',
          name: { $first: '$sector' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, 
          sector: '$name', 
          count: 1, 
        },
      },
    ];

    const styearAggregationPipeline = [
      {
        $match: {
          start_year: { $ne: '' }, 
        },
      },
      {
        $group: {
          _id: '$start_year',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, 
      },
    ]

   
      const likelihoodAggregationPipeline = [
        {
          $match: {
            likelihood: { $ne: '' },
          },
        },
        {
          $group: {
            _id: { $toInt: '$likelihood' }, // Convert likelihood to integer
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]
     

    
    // const likelihoodAggregationPipeline = [
    //   {
    //     $match: {
    //       likelihood: { $ne: '' }, 
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: '$likelihood',
    //       count: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $sort: { _id: 1 }, 
    //   },
    // ]

    const intensityAggregationPipeline = [
      {
        $match: {
          $or: [
            { intensity: { $gte: 1, $lte: 6 } }, 
            { intensity: { $gte: 7, $lte: 10 } }, 
            { intensity: { $gt: 10 } }, 
          ],
        },
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $and: [{ $gte: ['$intensity', 1] }, { $lte: ['$intensity', 6] }] }, then: '1-6' },
                { case: { $and: [{ $gte: ['$intensity', 7] }, { $lte: ['$intensity', 10] }] }, then: '7-10' },
                { case: { $gt: ['$intensity', 10] }, then: 'greater than 10' },
              ],
              default: 'Unknown',
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, 
          range: '$_id',
          count: 1, 
        },
      },
      {
        $sort: { _id: 1 }, 
      },
    ];

    const relevanceAggregationPipeline = [
      {
        $match: {
          sector: { $ne:''}, 
        },
      },
      {
        $group: {
          _id: '$relevance',
          name: { $first: '$relevance' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 }, 
      },
      {
        $project: {
          _id: 0, 
          rel: '$name',
          count: 1, 
        },
      },
     
    ]

    const countryAggregationPipeline = [
      {
        $match: {
          country: { $ne: '' }, 
        },
      },
      {
        $group: {
          _id: '$country',
          name: { $first: '$country' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0, 
          country: '$name', 
          count: 1, 
        },
      },
      {
        $sort: { _id: 1 }, 
      },
    ]

    const topicAggregationPipeline = [
      {
        $match: {
          sector: 'Energy', 
        },
      },
      {
        $group: {
          _id: '$topic', 
          name: { $first: '$topic' },
          count: { $sum: 1 }, 
        },
      },
      {
        $project: {
          _id: 0, 
          topic: '$name', 
          count: 1, 
        },
      },
    ];

    const sectorCounts = await mongoose.connection.db
      .collection('insights')
      .aggregate(sectorAggregationPipeline)
      .toArray();

    const likelihoodCounts = await mongoose.connection.db
      .collection('insights')
      .aggregate(likelihoodAggregationPipeline)
      .toArray();

      console.log('Likelihood Counts:', likelihoodCounts);

    const intensityCounts = await mongoose.connection.db
      .collection('insights')
      .aggregate(intensityAggregationPipeline)
      .toArray();

    const relevanceCounts = await mongoose.connection.db
      .collection('insights')
      .aggregate(relevanceAggregationPipeline)
      .toArray();

      const countryCounts = await mongoose.connection.db
      .collection('insights')
      .aggregate(countryAggregationPipeline)
      .toArray();

      const startYearCounts = await mongoose.connection.db
      .collection('insights')
      .aggregate(styearAggregationPipeline)
      .toArray();

      const topicCounts=await mongoose.connection.db
      .collection('insights')
      .aggregate(topicAggregationPipeline)
      .toArray();

    res.json({ data, sectorCounts, likelihoodCounts, intensityCounts, relevanceCounts,countryCounts,startYearCounts,topicCounts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});