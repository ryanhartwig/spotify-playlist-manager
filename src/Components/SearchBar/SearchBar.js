import './SearchBar.css';
import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { placeholder: 'Enter A Song, Album, or Artist', search: '' } 
    this.togglePlaceholder = this.togglePlaceholder.bind(this);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  // Toggle visibility of placeholder text when clicking on input field
  togglePlaceholder() {
    let placeholderText = this.state.placeholder ? '' : 'Enter A Song, Album, or Artist';
    this.setState({ placeholder: placeholderText })
  }

  search() {
    this.props.onSearch(this.state.search)
  }

  async handleTermChange(e) {
    e.persist();
    const searchValue = await e.target.value;
    this.setState({ search: searchValue })
    this.search();
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder={this.state.placeholder} onFocus={this.togglePlaceholder} onBlur={this.togglePlaceholder} onChange={this.handleTermChange}/>
        <button className="SearchButton">SEARCH</button>
      </div>
    )
  }
}