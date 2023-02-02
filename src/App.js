import './App.css';
import AllEvents from './components/AllEvents';
import SelectedEvents from './components/SelectedEvents';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
    if (a_start < b_start && b_start < a_end) return true;
    if (a_start < b_end && b_end < a_end) return true;
    if (b_start < a_start && a_end < b_end) return true;
    if (a_start === b_start && a_end === b_end) return true;
    return false;
  }


  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const [allData, setAllData] = useState([])
  const [selectedData, setSelectedData] = useState([])
  const [overlapes, setOverlapes] = useState(false)
  const [showOverlapnote, setShowOverlapnote] =useState(false)


  useEffect(() => {


  },[overlapes])

  const addEle = (para) => {
    setSelectedData([...selectedData, para])
    setAllData(allData => allData.filter(post => { return post.id !== para.id }))
  }

  const onAdd = (para) => {
    if (para.action === 'SELECT') {

      selectedData.forEach((event) => {
        const res = dateRangeOverlaps(new Date(event.start_time).toLocaleTimeString(), new Date(event.end_time).toLocaleTimeString(),
          new Date(para.start_time).toLocaleTimeString(), new Date(para.end_time).toLocaleTimeString())
        if (res) {
           setOverlapes(true)
           setMessage('Time Overlap !!.')
           setShowOverlapnote(true);
             return 
        }
        setShowOverlapnote(false);
      })
       

      if (selectedData.length >= 3) {
        setMessage('Cannot select more than 3 events.')
        setShow(true);
        setInterval(() => {
          setShow(false);
        }, 3000);
        return
      }
      addEle(para)

     
    }
    if (para.action === 'REMOVE') {
      setAllData([...allData, para])
      setSelectedData(selectedData => selectedData.filter(post => { return post.id !== para.id }))
    }
  }
  useEffect(() => {
    axios.get('https://run.mocky.io/v3/2744c231-8991-4ae8-bc45-1f645437585a')
      // eslint-disable-line react-hooks/exhaustive-deps
      .then(res => setAllData(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
    <div className="App">
      <div className='boxWrap'>
      {showOverlapnote && <div className='error'><p>{message}</p></div>}
        {show && <div className='message'><p>{message}</p></div>}
        <AllEvents data={allData} onAdd={onAdd} button='SELECT' />
        <SelectedEvents data={selectedData} onAdd={onAdd} button='REMOVE' />
      </div>
    </div>
  );
}

export default App;
