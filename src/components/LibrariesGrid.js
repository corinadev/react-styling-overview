import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'

const dateFormat = (value) => (new Date(value).toLocaleDateString("en-US"));
const numberFormat = (value) => (parseInt(value, 10).toLocaleString());

const columns = [
  { Header: 'Name',
    accessor: 'name',
    Cell: (row) => (
      <a href={row.original.getGithubUrl()} target='_blank'>
        {row.original.name}
      </a>
    )
  },
  { Header: 'Latest version', accessor: 'version' },
  { Header: 'Created at',
    accessor: 'createdAt',
    Cell: (row) => (dateFormat(row.original.createdAt))},
  { Header: 'Description', accessor: 'description' },
  { Header: 'Author', accessor: 'author' },
  { Header: 'NPM Downloads',
    accessor: 'downloads',
    Cell: (row) => (numberFormat(row.original.downloads))
  },
  { Header: 'Github stargazers',
    accessor: 'stars',
    Cell: (row) => (numberFormat(row.original.stars))
  },
  {
    Header: 'Topics',
    accessor: 'topics',
    minWidth: 300,
    Cell: (row) => (row.original.topics ? row.original.topics.join(', ') : ''),
    filterMethod: (filter, row) => {
      return row.topics && row.topics.indexOf(filter.value) !== -1;
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