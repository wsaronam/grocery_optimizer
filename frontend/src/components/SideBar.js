import "./styles/SideBar.css";




export default function SideBar({items, onIncrement, onDecrement, onRemove}) {

    console.log(items);
    items.map((product, quantity) => {
        console.log(product.product);
    });

    return (
        <div className="sidebar">
            <h1 className="sidebar-title">Your Grocery List</h1>

            {items.length === 0 && (<p className="empty-message">Grocery list is empty.</p>)}

            <ul className="sidebar-main-list">
                {items.map((product, quantity) => (
                    <div>
                        <li key={product.barcode} className="sidebar-list-item">
                            <div className="sidebar-info">
                                <p>{product.product.name}</p>
                                <p>{product.product.brand}</p>
                                <p>🧺 {product.quantity}</p>
                            </div>
                            
                            <div>
                                <button onClick={() => onIncrement(product.product.barcode)}>+</button>
                                <button onClick={() => onDecrement(product.product.barcode)}>-</button>
                                <button onClick={() => onRemove(product.product.barcode)}>Remove</button>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}