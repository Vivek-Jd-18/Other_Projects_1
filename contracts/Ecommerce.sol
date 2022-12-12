// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.9.0;

contract Ecommerce{
    struct Product{
        string title;
        string desc;
        address payable seller;
        uint id;
        uint price;
        address buyer;
        bool delivered;
    }

    uint counter = 1;

    Product[] public products;

    event register(string title,address  seller,uint id);
    event bought(uint id, address buyer);
    event deliver(uint id);

    function registerProduct(string memory _title,string memory _desc,uint _price) public {
        require(_price > 0,"Price Should be grether than zero");
        Product memory tempProduct;
        tempProduct.title = _title;
        tempProduct.desc = _desc;
        tempProduct.price = _price*10**18;
        tempProduct.seller = payable(msg.sender);
        tempProduct.id = counter;
        products.push(tempProduct);
        counter++;

        emit register( _title,tempProduct.seller,tempProduct.id);
    }

    function getAllTransactions() public view returns (Product[] memory){
        return products;
    }

    function buy(uint _id) payable public {
        require(products[_id-1].price==msg.value,"Please Pay exect price");
        require(products[_id-1].seller!=msg.sender,"Seller cannot purchase product");
        products[_id-1].buyer = msg.sender;
        emit bought(_id,msg.sender);
    }

    function delivery(uint _id) public{
        require(products[_id-1].buyer==msg.sender,"Only buyer confirm it");
        products[_id-1].delivered = true;
        products[_id-1].seller.transfer(products[_id-1].price);
        emit deliver(_id);
    }
}

