import React from "react";
import spinner from "./spinner.gif";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      searchTerm: "",
      sortField: "publishedAt",
      sortOrder: "desc",
    };
  }

  async fetchData() {
    this.setState({ loading: true });

    try {
      let url;

      if (this.state.searchTerm) {
        console.log(this.state.searchTerm);
        url = `https://news-aggregator-3fk9.onrender.com/news/?topic=${encodeURIComponent(
          this.state.searchTerm
        )}`;
      } else {
        url = `https://news-aggregator-3fk9.onrender.com/news/?topic=${encodeURIComponent(
          this.props.newsName
        )}`;
      }

      let res = await fetch(url);
      let articles = await res.json();

      articles.sort((a, b) => {
        const aValue = a[this.state.sortField];
        const bValue = b[this.state.sortField];

        if (this.state.sortOrder === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      articles = articles
        .filter(
          (article) =>
            article.title && article.description && article.urlToImage
        )
        .map((article) => (
          <div className="p-8" key={article.title}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                className="w-full"
                src={article.urlToImage}
                alt={article.title}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{article.title}</div>
                <p className="text-gray-700 text-base">{article.description}</p>
                <button className="font-bold text-xl mb-2">
                  <a href={article.url}>Read more</a>
                </button>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{article.author}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{article.source.name}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  #{article.publishedAt}
                </span>
              </div>
            </div>
          </div>
        ));

      this.setState({ articles, loading: false });
    } catch (error) {
      console.error("Error fetching data: ", error);
      this.setState({ loading: false });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.searchTerm !== prevState.searchTerm ||
      this.props.newsName !== prevProps.newsName
    ) {
      this.fetchData();
    }
  }

  getFieldValue = (obj, field) => {
    switch (field) {
      case "publishedAt":
        return new Date(obj.publishedAt).getTime();
      case "popularity":
        return obj.popularity || 0;
      case "author":
        return obj.author || "";
      default:
        return "";
    }
  };

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchSubmit = (event) => {
    event.preventDefault();
    this.fetchData();
  };

  handleSortChange = (event) => {
    const { value } = event.target;
    this.setState({ sortField: value }, () => {
      this.fetchData();
    });
  };

  handleOrderChange = (event) => {
    const { value } = event.target;
    this.setState({ sortOrder: value }, () => {
      this.fetchData();
    });
  };

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div className="mx-4 p-2">
        <form
          onSubmit={this.handleSearchSubmit}
          style={{ marginBottom: "8px" }}
        >
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleSearchChange}
            placeholder="Search for news..."
            className="text-base h-10"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 ml-2 rounded h-10"
          >
            Search
          </button>
        </form>
        <div className="mb-2" style={{ marginBottom: 0 }}>
          <label htmlFor="sortField" className="mr-2">
            Sort By:
          </label>
          <select
            id="sortField"
            value={this.state.sortField}
            onChange={this.handleSortChange}
            className="text-base h-10"
          >
            <option value="publishedAt">Published Date</option>
            <option value="author">Author</option>
          </select>
          <select
            id="sortOrder"
            value={this.state.sortOrder}
            onChange={this.handleOrderChange}
            className="text-base h-10 ml-2"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-1 display: flex align-items: center">
          {this.state.loading ? (
            <img
              src={spinner}
              alt="Loading"
              style={{ width: "300px", margin: "auto" }}
            />
          ) : (
            this.state.articles
          )}
        </div>

        <button
          className="font-bold text-xl mb-2"
          onClick={() => this.fetchData()}
        >
          <i className="fas fa-sync"></i>{" "}
          <h1 style={{ color: "grey", margin: "auto" }}>Fetching DATA</h1>
        </button>
      </div>
    );
  }
}

export default News;
