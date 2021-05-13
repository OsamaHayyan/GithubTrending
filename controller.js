const axios = require("axios").default;

exports.languageinfo = async (req, res, next) => {
  const date = new Date();
  const newDate = new Date(date.setMonth(date.getMonth() - 1)).toISOString();
  const { data } = await axios.get(
    `https://api.github.com/search/repositories?q=created:>${newDate}&sort=stars&order=desc&per_page=100`
  );
  const { items } = data;
  const languages = items
    .filter((item) => item.language !== null)
    .map((item) => item.language);

  const languageInfromation = {};

  try {
    languages.forEach((language) => {
      if (languageInfromation[language]) {
        languageInfromation[language] = items.filter(
          (item) => item.language === language
        );
        return;
      }
      languageInfromation[language] = items.filter(
        (item) => item.language === language
      );
    });
    res.status(200).json({ languageInfromation });
  } catch (error) {
    next(errorHandler(error));
  }
};

exports.language = async (req, res, next) => {
  const date = new Date();
  const newDate = new Date(date.setMonth(date.getMonth() - 1)).toISOString();
  const { data } = await axios.get(
    `https://api.github.com/search/repositories?q=created:>${newDate}&sort=stars&order=desc&per_page=100`
  );
  const { items } = data;
  const languages = items
    .filter((item) => item.language !== null)
    .map((item) => item.language);

  const repoCount = {};
  const languageCount = {};

  try {
    languages.forEach((language) => {
      if (repoCount[language]) {
        repoCount[language] = items
          .filter((item) => item.language === language)
          .map((item) => item.html_url);
        return;
      }
      repoCount[language] = items
        .filter((item) => item.language === language)
        .map((item) => item.html_url);
    });

    languages.forEach((language) => {
      if (languageCount[language]) {
        languageCount[language] += 1;
        return;
      }
      languageCount[language] = 1;
    });

    res.status(200).json({ repoCount, languageCount });
  } catch (error) {
    next(errorHandler(error));
  }
};
