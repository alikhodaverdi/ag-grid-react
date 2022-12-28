import React, { useCallback, useRef } from 'react';

import { AgGridReact } from 'ag-grid-react';

import { useState, useEffect, useMemo } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

function App() {

  const gridRef = useRef()

  const [rowData, setRowData] = useState([
    { make: 'Ford', model: 'focus', price: 4000 },
    { make: 'Pride', model: 'saipa', price: 3000 },
    { make: 'Toyota', model: 'Celica', price: 7000 },
  ]);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'make', sortable: true, filter: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true }
  ]);

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
  })

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true
  }), [])

  const cellClickedListener = useCallback(e => {
    console.log('cellClicked', e);
  })

  const pushMeClicked = useCallback(e => {
    gridRef.current.api.deselectAll()
  })

  return (
    <div className='ag-theme-alpine' style={{ height: 500 }}>

      <button onClick={pushMeClicked}>Push me</button>
      <AgGridReact
        ref={gridRef}
        onCellClicked={cellClickedListener}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection='multiple'
        animateRows={true}
      />
    </div>
  );

}

export default App;
