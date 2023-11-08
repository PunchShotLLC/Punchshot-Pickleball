import Court from '../models/court.model.js';

export const getCourts = async (req, res) => {
  try {
    const courts = await Court.find({});
    res.json(courts);
  } catch (error) {
    res.status(500).send(error);
  }
};