import React from 'react';
import { ClassForm, HooksForm } from './form';

function App() {
  const submitForm = () => {
    alert('Congrats, you have been approved');
  };

  const rejectForm = () => {
    alert('You have not been approved');
  };

  const welcome = () => {
    alert('Welcome');
  };

  return (
    <div className="App">
      {/* <ClassForm submitForm={submitForm} rejectForm={rejectForm} welcome={welcome} /> */}
      <HooksForm submitForm={submitForm} rejectForm={rejectForm} welcome={welcome} />
    </div>
  );
}

export default App;
