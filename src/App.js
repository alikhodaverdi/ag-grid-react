import React, { useCallback, useRef } from 'react';

import { AgGridReact } from 'ag-grid-react';

import { useState, useEffect, useMemo } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

import YearFilter from './Components/YearFilter';

// const SimpleComp = p => {

//   const onDollar = useCallback(() => window.alert('Dollar ' + p.value));
//   const onAt = useCallback(() => window.alert('At' + p.value));

//   return (
//     <div className=''>
//       <button onClick={onDollar}>$</button>
//       <button onClick={onAt}>@</button>
//     </div>
//   )
// }

const MyComp = params => {
  const renderCountRef = useRef(1);
  return (
    <div><b>({renderCountRef.current++})</b>{params.value}</div>
  )
}




function App() {

  const gridRef = useRef()



  const [rowData, setRowData] = useState()

  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'athlete',
      floatingFilter: true,
      filter: 'agTextColumnFilter',
    },
    { field: 'age', filter: 'agNumberColumnFilter' },
    { field: 'country' },
    {
      field: 'year',
      filter: YearFilter,
      filterParams: {
        title: 'Year Filter',
        values: [2000, 2004, 2006]
      },
      floatingFilter: true
    },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' }
  ]);


  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
  }, []);

  const defaultColDef = useMemo(() => ({
    flex: 1,
    // filterParams: {
    //   buttons: ['apply', 'clear']
    // }
  }), [])

  // const cellClickedListener = useCallback(e => {
  //   console.log('cellClicked', e);
  // })

  // const pushMeClicked = useCallback(e => {
  //   gridRef.current.api.deselectAll()
  // })

  const savedFilterState = useRef()

  const onBtSave = useCallback(() => {
    const filterModel = gridRef.current.api.getFilterModel();
    console.log('saving Filter Model', filterModel);
    savedFilterState.current = filterModel;
  }, [])

  const onBtApply = useCallback(() => {
    const filterModel = savedFilterState.current;
    console.log('Applying Filter Model', filterModel);
    gridRef.current.api.setFilterModel(filterModel)
  }, [])



  return (
    <div className='ag-theme-alpine' style={{ height: 1000 }}>

      {/* <button onClick={pushMeClicked}>Push me</button> */}
      <div>
        <button onClick={onBtSave}>Save</button>
        <button onClick={onBtApply}>Apply</button>
      </div>
      <AgGridReact
        ref={gridRef}
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
