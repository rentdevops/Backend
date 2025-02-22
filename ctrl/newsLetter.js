const NewsLetterModel = require("../model/newsLetterModel");

exports.createNewsLetter = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadReq("cannot submit empty field");
  }
  const userEmail = await NewsLetterModel.create({ email });
  res.status(200).json({ message: "successfully posted", userEmail });
};

exports.getNewsletter = async (req, res) => {
  const userEmail = await NewsLetterModel.find();
  res.status(200).json(userEmail);
};
