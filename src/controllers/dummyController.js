const getDummyData = (req, res) => {
  const dummyData = {
    message: "This is some dummy data",
    timestamp: new Date().toISOString(),
  };
  res.json(dummyData);
};

export default {
  getDummyData,
};
