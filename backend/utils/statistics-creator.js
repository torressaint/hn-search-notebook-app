const _ = require("lodash");

module.exports = {
  create(searchQueries) {
    const uniqQueryStrings = _.map(
      _.uniqBy(searchQueries, "queryString"),
      _.property("queryString"),
    );
    const currentDate = new Date();
    const weekAgoDate = new Date(new Date().setDate(currentDate.getDate() - 7));

    return _.map(uniqQueryStrings, (queryString) => {
      const machedQueriesFromLastWeek = _.filter(searchQueries, (query) => {
        return query.queryString == queryString && currentDate >= weekAgoDate;
      });
      const queriesFromLastWeekLength = machedQueriesFromLastWeek.length;
      const sumOfHitsWeekly = _.sumBy(machedQueriesFromLastWeek, "totalNumberOfHits");
      const avgNumberOfHitsWeekly = Math.floor(sumOfHitsWeekly / queriesFromLastWeekLength) || 0;

      const machedQueriesFromToday = _.filter(
        machedQueriesFromLastWeek,
        (query) =>
          parseInt((new Date(query.createdAt) - new Date()) / (1000 * 60 * 60 * 24), 10) == 0,
      );
      const queriesFromTodayLength = machedQueriesFromToday.length;
      const sumOfHitsToday = _.sumBy(machedQueriesFromToday, "totalNumberOfHits");
      const avgNumberOfHitsToday = Math.floor(sumOfHitsToday / queriesFromTodayLength) || 0;

      return { queryString, avgNumberOfHitsToday, avgNumberOfHitsWeekly };
    });
  },
};
