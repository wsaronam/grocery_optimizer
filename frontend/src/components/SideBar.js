import "./styles/SideBar.css";




export default function SideBar({items}) {

    function incrementItem(barcode) {

    }

    function decrementItem(barcode) {

    }

    function removeItem(barcode) {

    }


    return (
        <div className="sidebar">
            <h1 className="sidebar-title">Your Grocery List</h1>

            {items.length === 0 && (<p className="empty-message">Grocery list is empty.</p>)}

            <ul className="sidebar-main-list">
                {items.map((product, quantity) => (
                    <div>
                        <li key={product.barcode} className="sidebar-list-item">
                            {product.name}
                            {quantity}
                            <div>
                                <button onClick={() => incrementItem(product.barcode)}>+</button>
                                <button onClick={() => decrementItem(product.barcode)}>-</button>
                                <button onClick={() => removeItem(product.barcode)}>Remove</button>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}