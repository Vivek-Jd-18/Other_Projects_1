import React from "react";

const Footer = () => {
  return (
    <div>
      <footer class="text-center text-white" style={{backgroundColor: "#0a1216",
backgroundImage: "linear-gradient(160deg, #0a1216 0%, #15635a 100%)"
}}>
        <div
          class="text-center p-3"
          style={{backgroundColor: "rgba(0, 0, 0, 0.2)", color:"white",fontSize:"18px",fontWeight:"700"}}
        >
          © 2020 Copyright :&nbsp;
          <span  style={{color:"crimson"}}>
            Ankit Patel💻
          </span>
       
        </div>
      </footer>
    </div>
  );
};

export default Footer;
