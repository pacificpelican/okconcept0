import Desk from "./Desk";

let dataChunk = `{ 
  "src": "Images/Sun.png",
  "name": "sun1",
  "hOffset": 250,
  "vOffset": 250,
  "alignment": "center"}`;

export default () => (
  <div>
    <Desk userObjectAsk='notes' userDBrequest='spiraldb' />
  </div>
)
