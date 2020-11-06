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
  const highlightedText = [];
  const textArr = text.split("");

  console.log(textArr);

  highlights.forEach((highlight, index) => {
    //slice method incase of html format in future
    
    //if beginning slice look at previous slices
    if(index === 0){
      const sliceEnd = highlight.startOffset - 1;
      const slicedText = textArr.slice(0, sliceEnd);
      highlightedText.push(slicedText.join(''));
    }

    //current slice
    const sliceStart = highlight.startOffset;
    const sliceEnd = highlight.endOffset;
    const slicedText = textArr.slice(sliceStart, sliceEnd);
    const wrap = (backgroundColor, text) => <span style={{ backgroundColor }}>{text}</span>
    highlightedText.push(wrap(highlight.color, slicedText.join('')));

    //look at next inbetween slice to the next highlight
    const next = highlights[index + 1];
    const current = highlight;
    if(typeof next !== 'undefined'){
      const isDifference = next.startOffset - current.endOffset > 1;

      if(isDifference){
        const sliceStart = current.endOffset + 1;
        const sliceEnd = next.startOffset - 1;
        const slicedText = textArr.slice(sliceStart, sliceEnd);
        highlightedText.push(slicedText.join(''));
      }
    }
  });

  //if end slice look at slice to text length

  //account for spaces
  //account for irregularities
  console.log(highlightedText);

  return highlightedText;
}

function App() {
  const useHighlights = calcHighlightsOverlap(sortHighlights(highlights));
  const highlightedText = highlightText(text, useHighlights);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {highlightedText.map((item) => item)}
        </div>
      </header>
    </div>
  );
}

export default App;
