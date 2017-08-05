import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

const dateFormat = (value) => (new Date().toLocaleDateString("en-US"));
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
];

const LibrariesGrid = ({ data }) => (
  <ReactTable
    data={data}
    columns={columns}
  />
);

export default LibrariesGrid;