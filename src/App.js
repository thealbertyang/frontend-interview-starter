import React from 'react';
import { text, highlights } from '@textio/frontend-interview-data';
import './App.css';

console.log("Textio string:", text);
console.log("Textio highlights:", highlights);

//sort offsets by start offset and end offset
const sortHighlights = (highlights) => {
  return highlights.sort((a, b) => a.startOffset > b.startOffset ? 1 : -1 );
}

//calc overlap, lower number priority overrides 
const calcHighlightsOverlap = (highlights) => {
  //for each look at next, if endOffset of current is higher than next startOffset
  //if current priority higher (lower number) then next startOffset is changed to next higher number
  //else then current endOffset is changed to number - 2

  highlights.forEach((highlight, index) => {
    const current = highlight;
    const next = highlights[index + 1];
    if(typeof next !== 'undefined'){
      if(current.endOffset >= next.startOffset){
        if(current.priority <= next.priority){
          highlights[index+ 1] = { ...next, startOffset: current.endOffset + 1 }
        }
        else if(next.priority <= current.priority){
          highlights[index] = { ...current, endOffset: next.startOffset - 1 }
        }
      }
    }
  });

  return highlights;
}

//highlight with corrected array
const highlightText = (text, highlights) => {
  //should go through each character, insert on startOffset with highlighted color, end on endOFfset
  const textArr = text.split("");
  console.log(textArr);
  highlights.forEach((highlight) => {

  });
}

function App() {
  const useHighlights = calcHighlightsOverlap(sortHighlights(highlights));
  highlightText(text, useHighlights);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
