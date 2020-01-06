const config = {
  all: {
    env: process.env.REACT_APP_ENV || "local",
    webApi: "",
    url: process.env.REACT_APP_FRONTEND_URL || "",
    algoliaHNSearchApi:
      process.env.REACT_APP_ALGOLIA_URL || "https://hn.algolia.com/api/v1"
  },
  local: {
    webApi: process.env.REACT_APP_BACKEND_URL || "//localhost:9000/api/v1",
    url: process.env.REACT_APP_FRONTEND_URL || "//localhost:3000",
    algoliaHNSearchApi:
      process.env.REACT_APP_ALGOLIA_URL || "https://hn.algolia.com/api/v1"
  },
  development: {
    webApi: process.env.REACT_APP_BACKEND_URL || "//localhost:9000/api/v1",
    url: process.env.REACT_APP_FRONTEND_URL || "//localhost:3000",
    algoliaHNSearchApi:
      process.env.REACT_APP_ALGOLIA_URL || "https://hn.algolia.com/api/v1"
  },
  preproduction: {
    webApi: process.env.REACT_APP_BACKEND_URL || "//localhost:9000/api/v1",
    url: process.env.REACT_APP_FRONTEND_URL || "//localhost:3000",
    algoliaHNSearchApi:
      process.env.REACT_APP_ALGOLIA_URL || "https://hn.algolia.com/api/v1"
  },
  production: {
    webApi: process.env.REACT_APP_BACKEND_URL || "//localhost:9000/api/v1",
    url: process.env.REACT_APP_FRONTEND_URL || "//localhost:3000",
    algoliaHNSearchApi:
      process.env.REACT_APP_ALGOLIA_URL || "https://hn.algolia.com/api/v1"
  }
};

module.exports = Object.assign(config.all, config[config.all.env]);
