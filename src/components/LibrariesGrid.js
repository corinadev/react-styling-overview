import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

const dateFormat = (value) => (new Date(value).toLocaleDateString("en-US"));
const numberFormat = (value) => (parseInt(value).toLocaleString());

const columns = [
  { Header: 'Name',
    id: 'name',
    accessor: (library) => (
      <a href={library.getGithubUrl()} target='_blank'>
        {library.name}
      </a>)
  },
  { Header: 'Latest version', accessor: 'version' },
  { Header: 'Created at',
    id: 'createdAt',
    accessor: (library) => (dateFormat(library.createdAt))},
  { Header: 'Description', accessor: 'description' },
  { Header: 'Author', accessor: 'author' },
  { Header: 'NPM Downloads',
    id: 'downloads',
    accessor: (library) => (numberFormat(library.downloads))
  },
  { Header: 'Github stargazers',
    id: 'stars',
    accessor: (library) => (numberFormat(library.stars))
  },
  {
    Header: 'Topics',
    id: 'topics',
    minWidth: 300,
    accessor: (library) => (library.topics ? library.topics.join(', ') : ''),
    filterMethod: (filter, library) => {
      return library.topics.indexOf(filter.value) !== -1;
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