import "./styles/SideBar.css";




export default function SideBar({items, onIncrement, onDecrement, onRemove}) {

    console.log(items);

    return (
        <div className="sidebar">
            <h1 className="sidebar-title">Your Grocery List</h1>

            {items.length === 0 && (<p className="empty-message">Grocery list is empty.</p>)}

            <ul className="sidebar-main-list">
                {items.map((product, quantity) => (
                    <div>
                        <li key={product.barcode} className="sidebar-list-item">
                            <h1 className="test">{product.name}</h1>
                            {/* {quantity} */}
                            <div>
                                <button onClick={() => onIncrement(product.barcode)}>+</button>
                                <button onClick={() => onDecrement(product.barcode)}>-</button>
                                <button onClick={() => onRemove(product.barcode)}>Remove</button>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
}