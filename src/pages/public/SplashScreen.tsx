import { useEffect, useState } from "react";
import meuLogo from "../../../public/mue_logo_big.png";

const ZoomEffect = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [wordOne, setWordOne] = useState(false);
  const [wordTwo, setWordTwo] = useState(false);
  const [wordThree, setWordThree] = useState(false);
  const [wordFour, setWordFour] = useState(false);
  const [wordFive, setWordFive] = useState(false);

  useEffect(() => {
    setIsZoomed(true);
  },[])

  setTimeout(() => {
    setWordOne(true)
  }, 3000);

  setTimeout(() => {
    setWordTwo(true)
  }, 3500);

  setTimeout(() => {
    setWordThree(true)
  }, 4000);

  
  setTimeout(() => {
    setWordFour(true)
  }, 4500);

  
  setTimeout(() => {
    setWordFive(true)
  }, 5000);


  const imgStyle = {
        "transition": "transform 3s",
        "margin": "0 auto",
        "width":"20px",
        "height":"20px"
      }

  return (
    <div className="zoom">
      <style>
        {`
          .zoom{
            -ms-transform: scale(1); /* IE 9 */
            -webkit-transform: scale(1); /* Safari 3-8 */
            transform: scale(4); 
          }
          .show{
            display:block
          }
          .hide{
            visibility:hidden
          }

          .threeWords{
            font-size:10px
          }

          .smallTexts{
            font-size:4px
          }
        `}
      </style>
      <img className={isZoomed ? "zoom":"notZoom"} src={meuLogo} alt="Logo" style={imgStyle}/>
      <div className="flex justify-center align-center mt-10">
        <h6 className={wordOne ? "show threeWords":"hide threeWords"} >Meet</h6>
        <h6 className={wordTwo ? "show threeWords":"hide threeWords"} >&nbsp;. Establis</h6>
        <h6 className={wordThree ? "show threeWords":"hide threeWords"} >&nbsp;. Unit</h6>
      </div>

      <div className="flex justify-center align-center mt-2">
        <p className={wordFour ? "show smallTexts":"hide smallTexts"} >Made with <span className="text-red-800">&hearts;</span> in india</p>
        <p className={wordFive ? "show smallTexts":"hide smallTexts"} >&nbsp;ar Wasserstoff.</p>
      </div>

    </div>
  );
};

export default ZoomEffect;
