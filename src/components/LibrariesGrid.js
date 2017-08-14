import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

const dateFormat = (value) => (new Date(value).toLocaleDateString("en-US"));
const numberFormat = (value) => (parseInt(value, 10).toLocaleString());

const columns = [
  { Header: 'Name',
    accessor: 'name',
    Cell: (library) => (
      <a href={library.getGithubUrl()} target='_blank'>
        {library.name}
      </a>)
  },
  { Header: 'Latest version', accessor: 'version' },
  { Header: 'Created at',
    accessor: 'createdAt',
    Cell: (library) => (dateFormat(library.createdAt))},
  { Header: 'Description', accessor: 'description' },
  { Header: 'Author', accessor: 'author' },
  { Header: 'NPM Downloads',
    accessor: 'downloads',
    Cell: (library) => (numberFormat(library.downloads))
  },
  { Header: 'Github stargazers',
    accessor: 'stars',
    Cell: (library) => (numberFormat(library.stars))
  },
  {
    Header: 'Topics',
    accessor: 'topics',
    minWidth: 300,
    Cell: (library) => (library.topics ? library.topics.join(', ') : ''),
    filterMethod: (filter, library) => {
      return library.topics && library.topics.indexOf(filter.value) !== -1;
    }
  }
];

const LibrariesGrid = ({ data }) => (
  <ReactTable
    data={data}
    columns={columns}
    filterable
    resizable
  />
);

export default LibrariesGrid;