import { useState, useEffect } from "react";
import "./App.css";
import { ethers } from "ethers";
import Abi from "./contracts/Ecommerce.sol/Ecommerce.json";
import Navbar from "./Navbar";
import { memo } from "react";
import Footer from "./Footer";
// var modeldata={};
const Input = ({ placeholder, name, value, type, handleChange }) => (
  <input
    placeholder={placeholder}
    step="0.0001"
    value={value}
    type={type}
    onChange={(e) => handleChange(e, name)}
    style={{
      borderRadius: "5px",
      padding: "5px",
      margin: "0px 10px 10px 0px",
      width: "300px",
      color: "grey",
      fontFamily: "cursive",
      border: "none",
      textAlign: "center",
    }}
  />
);
const TransactionCard = ({ id, title, desc, price, buyer, seller,contract }) => {
  return (
    <>
    
    <div className="col-3" style={{ margin: "10px" }}>
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body" style={{backgroundImage: "linear-gradient(to bottom, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%)"}}>
          <h5 className="card-title" style={{ marginBottom: "10px" ,color:"crimson"}}>
            Id: {id}
          </h5>
          <h5 className="card-title" style={{ marginBottom: "10px" ,color:"crimson"}}>
            Title: {title}
          </h5>
          <h5 className="card-title" style={{ marginBottom: "10px" ,color:"crimson"}}>
            Description: {desc.slice(0, 9)}...
          </h5>
          <h5 className="card-title" style={{ marginBottom: "10px" ,display:"flex",alignItems:"center" ,color:"crimson"}}>
            Price: {price}&nbsp;<img src="https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG.png" alt="no image" height="17px" />
          </h5>
          <h6
            className="card-subtitle text-muted"
            style={{ marginBottom: "15px" ,color:"crimson"}}
          >
            Seller:
            {`${seller.slice(0, 6)}...${seller.slice(seller.length - 4)}`}
          </h6>
          <h6
            className="card-subtitle text-muted"
            style={{ marginBottom: "15px" ,color:"crimson"}}
          >
            Buyer: {`${buyer.slice(0, 6)}...${buyer.slice(buyer.length - 4)}`}
          </h6>
          <button
            className="card-link"
            type="button"
           
            style={{
              border: "none",
              borderRadius: "5px",
              color: "white",
              backgroundColor: "teal",
              fontWeight: "bold",
            }}
            onClick={async()=>{
              console.log(price)
              var anj=String(price) ;
              console.log(typeof anj)

              const cnt = await contract.buy(id, { value: ethers.utils.parseEther(anj)  })
              console.log(cnt)
            }}
          >
            Buy 
          </button>
          <button
            className="card-link"
            type="button"
           
            style={{
              border: "none",
              borderRadius: "5px",
              color: "white",
              backgroundColor: "teal",
              fontWeight: "bold",
            }}
            onClick={async()=>{
              
              const deliver = await contract.delivery(id)
              console.log(deliver)
            }}
          >
            Confirm 
          </button>
          
        </div>
      </div>
    </div>
    </>
    
  );
};
function App() {
  const contractAddress = "0x0B597D10D675677523EeBC037a85dDCcF5ED1D88";
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [connectbutton, setConnectbutton] = useState("Connect Button");
  const [errorMessage, setErrorMessage] = useState("");
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  let acc=0
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const connectWallet = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          updatewallet();
          acc=result[0]
          accountChangeHandler(result[0]);
          setConnectbutton("Wallet Connected");
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("please install metamask");
      setErrorMessage("please first install metamask");
    }
  };

  const accountChangeHandler = (newAddress) => {
    setDefaultAccount(newAddress);
    console.log("acc:===",acc)
    updatewallet();
  };

  const updatewallet = () => {
    const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    const tempSigner = tempProvider.getSigner();
    const tempContract = new ethers.Contract(
      contractAddress,
      Abi.abi,
      tempSigner
    );
    setProvider(tempProvider);
    setSigner(tempSigner);
    setContract(tempContract);
  };
  const registerproduct = async () => {
    try {
      const { title, description, price } = formData;
      const transactionhash = await contract.registerProduct(
        title,
        description,
        price
      );
    } catch (error) {
      throw new Error("no Ethereum object");
    }
  };
  
  const handleChange = async (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    console.log("defaultAccount====",defaultAccount)
    const { title, description, price } = formData;
    e.preventDefault();

    if (!title || !description || !price) return;

    registerproduct();
  };

  const allTransactions = async () => {
    const transactions = await contract.getAllTransactions();
    const totalTransactions = transactions.map((item) => ({
      id: parseInt(item.id._hex),
      desc: item.desc,
      title: item.title,
      price: parseInt(item.price._hex) / 10 ** 18,
      seller: item.seller,
      buyer: item.buyer,
    }));
    setTransactions(totalTransactions);
  };
  useEffect(()=>{
    allTransactions();
  },[defaultAccount])
  
  
  return (
    <>
      <Navbar />
      <div className="App">
        <button
          onClick={connectWallet}
          style={{
            border: "none",
            margin: "10px",
            borderRadius: "5px",
            padding: "5px",
            fontSize: "20px",
            fontWeight: "700",
            backgroundColor: "#d50d0d",
            color: "white",
          }}
        >
          {connectbutton}
        </button>
        <p style={{ color: "white" }}>
          <span style={{ fontSize: "18px", fontWeight: "500", color: "white" }}>
            Account Address:
          </span>
          {defaultAccount}
        </p>
        {errorMessage ? (
          <h3 style={{ color: "red", wordSpacing: "3px" }}>
            Error Message : {errorMessage}
          </h3>
        ) : (
          ""
        )}
      </div>
      <div className="input">
        <h2 style={{ color: "white" }}>- Register Product -</h2>
        <Input
          placeholder="Title"
          name="title"
          type="text"
          handleChange={handleChange}
        />
        <Input
          placeholder="Description"
          name="description"
          type="text"
          handleChange={handleChange}
        />
        <Input
          placeholder="Price"
          name="price"
          type="number"
          handleChange={handleChange}
        />
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            border: "none",
            margin: "10px",
            borderRadius: "5px",
            padding: "5px",
            fontSize: "20px",
            fontWeight: "500",
            backgroundColor: "green",
            color: "white",
          }}
        >
          Submit Now
        </button>
      </div>
      <div style={{ margin: "20px 0px" }}>
        <h1 style={{ textAlign: "center"}} className="product">Products</h1>
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignContent: "center",
          }}
          >
          {transactions.reverse().map((transaction, i) => (
            <TransactionCard key={i} {...transaction} contract={contract}/>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
