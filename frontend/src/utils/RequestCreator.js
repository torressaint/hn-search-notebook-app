import _ from "lodash";

export const createGetRequest = (
  url,
  filter,
  fieldsToSearch,
  page,
  rowsPerPage
) => {
  const filterOptions = createFilter(filter);
  const fieldsToSearchOptions = createRestrictAttributes(fieldsToSearch);
  const pageOptions = createPage(page);
  const rowsPerPageOptions = createRowsPerPage(rowsPerPage);
  const optionsCollection = [
    filterOptions,
    fieldsToSearchOptions,
    pageOptions,
    rowsPerPageOptions
  ];

  const hasOptions = !_.every(optionsCollection, _.isEmpty);

  if (!hasOptions) return url;

  const options = optionsCollection.filter(_.identity).join("&");

  return `${url}?${options}`;
};

const createFilter = filterConfig => {
  if (_.isEmpty(filterConfig)) return null;

  const conditions = _.values(
    _.mapValues(filterConfig, (value, key) => {
      return `${key}=${value}`;
    })
  );

  return `${conditions.join("&")}`;
};

const createRestrictAttributes = fieldsToSearch => {
  if (_.isEmpty(fieldsToSearch)) return null;

  return `restrictSearchableAttributes=${fieldsToSearch.join(",")}`;
};

const createPage = page => {
  if (!_.isNumber(page)) return null;

  return `page=${page}`;
};

const createRowsPerPage = rowsPerPage => {
  if (!_.isNumber(rowsPerPage)) return null;

  return `hitsPerPage=${rowsPerPage}`;
};
