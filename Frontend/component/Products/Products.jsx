import { useParams } from "react-router-dom";
import './Products.css';

function Product() {
    const { category, subCategory } = useParams(); // Extracting parameters

    return (
        <>
            <div className="product-heading"><span>Products</span></div>
            <div className="products-home">
                <div className="product-cart">
                    <img src="https://i5.walmartimages.com/asr/e82d6b6d-b65d-4d3c-9cc2-8664a1f7042e_1.4489bf730cb2591f99d531aba0404700.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"/>
                    <p>Name:organic seeds</p>
                    <p>Herbisides</p>
                    <p>price:200</p>
                </div>
                <div className="product-cart">
                    <img src="https://i5.walmartimages.com/asr/e82d6b6d-b65d-4d3c-9cc2-8664a1f7042e_1.4489bf730cb2591f99d531aba0404700.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"/>
                    <p>Name:ankit</p>
                    <p>price:200</p>
                    <p>herbisides</p>
                </div>
                <div className="product-cart">
                    <img src="https://i5.walmartimages.com/asr/e82d6b6d-b65d-4d3c-9cc2-8664a1f7042e_1.4489bf730cb2591f99d531aba0404700.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"/>
                    <p>Name:ankit</p>
                    <p>price:200</p>
                    <p>herbisides</p>
                </div>
                <div className="product-cart">
                    <img src="https://i5.walmartimages.com/asr/e82d6b6d-b65d-4d3c-9cc2-8664a1f7042e_1.4489bf730cb2591f99d531aba0404700.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"/>
                    <p>Name:ankit</p>
                    <p>price:200</p>
                    <p>herbisides</p>
                </div>
                <div className="product-cart">
                    <img src="https://i5.walmartimages.com/asr/e82d6b6d-b65d-4d3c-9cc2-8664a1f7042e_1.4489bf730cb2591f99d531aba0404700.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"/>
                    <p>Name:ankit</p>
                    <p>price:200</p>
                    <p>herbisides</p>
                </div>
                <div className="product-cart">
                    <img src="https://i5.walmartimages.com/asr/e82d6b6d-b65d-4d3c-9cc2-8664a1f7042e_1.4489bf730cb2591f99d531aba0404700.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"/>
                    <p>Name:ankit</p>
                    <p>price:200</p>
                    <p>herbisides</p>
                </div>
                <div className="product-cart">
                    <img src="https://i5.walmartimages.com/asr/e82d6b6d-b65d-4d3c-9cc2-8664a1f7042e_1.4489bf730cb2591f99d531aba0404700.jpeg?odnWidth=1000&odnHeight=1000&odnBg=ffffff"/>
                    <p>Name:ankit</p>
                    <p>price:200</p>
                    <p>herbisides</p>
                </div>
            </div>
        </>
    );
}

export default Product;
